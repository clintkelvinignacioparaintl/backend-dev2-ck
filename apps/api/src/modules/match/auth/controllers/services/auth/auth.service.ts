import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../../../../../prisma/prisma.service';
import { MailService } from '../../../../../../common/mail/mail.service';
import { LoginDto } from '../../dto/login.dto';
import { RegisterDto } from '../../dto/register.dto';
import { VerifyOtpDto } from '../../dto/verify-otp.dto';

@Injectable()
export class AuthService {
  [x: string]: any;
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async sendOtp(email: string) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpHash = await bcrypt.hash(otp, 10);
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await this.prisma.otpVerification.deleteMany({ where: { email } });
    await this.prisma.otpVerification.create({
      data: { email, otpHash, expiresAt },
    });

    await this.mailService.sendOtpEmail(email, otp);
    return { success: true, email, message: 'OTP sent' };
  }

  async register(dto: RegisterDto) {
    const existingEmail = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (existingEmail) throw new ConflictException('Email already in use');

    const existingUsername = await this.prisma.user.findUnique({
      where: { username: dto.username },
    });
    if (existingUsername) throw new ConflictException('Username already taken');

    const otpRecord = await this.prisma.otpVerification.findFirst({
      where: { email: dto.email, verified: false },
      orderBy: { createdAt: 'desc' },
    });

    if (!otpRecord)
      throw new BadRequestException('OTP not found. Please request a new one');
    if (otpRecord.expiresAt < new Date())
      throw new BadRequestException('OTP has expired');

    const otpValid = await bcrypt.compare(dto.otpCode, otpRecord.otpHash);
    if (!otpValid) throw new BadRequestException('Invalid OTP');

    await this.prisma.otpVerification.update({
      where: { id: otpRecord.id },
      data: { verified: true },
    });

    const passwordHash = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        username: dto.username,
        name: dto.fullname,
        password: passwordHash,
        isVerified: true,
      },
    });

    const payload = { sub: user.id, username: user.username };
    return {
      success: true,
      access_token: await this.jwtService.signAsync(payload),
      user: {
        id: user.id,
        fullname: user.name,
        username: user.username,
        email: user.email,
      },
    };
  }
  async checkUsername(username: string) {
    const user = await this.prisma.user.findUnique({ where: { username } });
    return { available: !user };
  }

  verifyOtp(dto: VerifyOtpDto) {
    return { success: true, dto };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { username: dto.username },
    });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const passwordMatch = await bcrypt.compare(dto.password, user.password);
    if (!passwordMatch) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        id: user.id,
        fullname: user.name,
        username: user.username,
        email: user.email,
      },
    };
  }
}