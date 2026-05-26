import { PasswordResetService } from './password-reset.service';
export declare class PasswordResetController {
    private readonly passwordResetService;
    constructor(passwordResetService: PasswordResetService);
    requestPasswordReset(email: string): Promise<{
        message: string;
    }>;
    resetPassword(token: string, newPassword: string): Promise<{
        message: string;
    }>;
}
