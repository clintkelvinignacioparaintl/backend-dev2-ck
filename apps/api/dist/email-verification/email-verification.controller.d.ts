import { EmailVerificationService } from './email-verification.service';
export declare class EmailVerificationController {
    private readonly emailVerificationService;
    constructor(emailVerificationService: EmailVerificationService);
    sendVerificationEmail(email: string): Promise<{
        message: string;
    }>;
    verifyEmail(token: string): Promise<{
        message: string;
    }>;
}
