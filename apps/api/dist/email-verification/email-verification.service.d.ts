import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from '../common/services/email.service';
export declare class EmailVerificationService {
    private prisma;
    private emailService;
    private configService;
    constructor(prisma: PrismaService, emailService: EmailService, configService: ConfigService);
    sendVerificationEmail(email: string): Promise<{
        message: string;
    }>;
    verifyEmail(token: string): Promise<{
        message: string;
    }>;
    private generateToken;
}
