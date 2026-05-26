import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from '../common/services/email.service';
export declare class PasswordResetService {
    private prisma;
    private emailService;
    constructor(prisma: PrismaService, emailService: EmailService);
    requestPasswordReset(email: string): Promise<{
        message: string;
    }>;
    resetPassword(token: string, newPassword: string): Promise<{
        message: string;
    }>;
    private generateToken;
}
