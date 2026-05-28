import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../../../../../prisma/prisma.service';
import { MailService } from '../../../../../../common/mail/mail.service';
import { LoginDto } from '../../dto/login.dto';
import { RegisterDto } from '../../dto/register.dto';
import { VerifyOtpDto } from '../../dto/verify-otp.dto';
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    private readonly mailService;
    [x: string]: any;
    constructor(prisma: PrismaService, jwtService: JwtService, mailService: MailService);
    sendOtp(email: string): Promise<{
        success: boolean;
        email: string;
        message: string;
    }>;
    register(dto: RegisterDto): Promise<{
        success: boolean;
        access_token: string;
        user: {
            id: string;
            fullname: string | null;
            username: string;
            email: string;
        };
    }>;
    checkUsername(username: string): Promise<{
        available: boolean;
    }>;
    verifyOtp(dto: VerifyOtpDto): {
        success: boolean;
        dto: VerifyOtpDto;
    };
    login(dto: LoginDto): Promise<{
        access_token: string;
        user: {
            id: string;
            fullname: string | null;
            username: string;
            email: string;
        };
    }>;
}
