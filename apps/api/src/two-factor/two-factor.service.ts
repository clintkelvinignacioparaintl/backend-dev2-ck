import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TwoFactorService as TwoFactorAuthService } from '../common/services/two-factor.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class TwoFactorService {
  constructor(
    private prisma: PrismaService,
    private twoFactorAuthService: TwoFactorAuthService,
  ) {}

  async enableTwoFactor(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (user.twoFactorEnabled) {
      throw new BadRequestException('Two-factor authentication already enabled');
    }

    const secret = this.twoFactorAuthService.generateSecret();
    const qrCode = this.twoFactorAuthService.generateQRCode(secret, user.email);

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        twoFactorSecret: secret,
      },
    });

    return { secret, qrCode };
  }

  async confirmTwoFactor(userId: string, token: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || !user.twoFactorSecret) {
      throw new BadRequestException('Two-factor authentication not set up');
    }

    const isValid = this.twoFactorAuthService.verifyToken(user.twoFactorSecret, token);

    if (!isValid) {
      throw new BadRequestException('Invalid two-factor token');
    }

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        twoFactorEnabled: true,
      },
    });

    return { message: 'Two-factor authentication enabled' };
  }

  async disableTwoFactor(userId: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        twoFactorEnabled: false,
        twoFactorSecret: null,
      },
    });

    return { message: 'Two-factor authentication disabled' };
  }

  async verifyTwoFactorToken(userId: string, token: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || !user.twoFactorSecret || !user.twoFactorEnabled) {
      throw new BadRequestException('Two-factor authentication not enabled');
    }

    const isValid = this.twoFactorAuthService.verifyToken(user.twoFactorSecret, token);

    if (!isValid) {
      throw new BadRequestException('Invalid two-factor token');
    }

    return { valid: true };
  }
}
