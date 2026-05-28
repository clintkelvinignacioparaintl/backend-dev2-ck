import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): Promise<{
        id: string;
        email: string;
        username: string;
        password: string;
        name: string | null;
        fullname: string | null;
        isActive: boolean;
        isBanned: boolean;
        isVerified: boolean;
        verificationToken: string | null;
        verificationTokenExpiresAt: Date | null;
        resetPasswordToken: string | null;
        resetPasswordTokenExpiresAt: Date | null;
        twoFactorEnabled: boolean;
        twoFactorSecret: string | null;
        currentMode: string;
        profileImageUrl: string | null;
        logoUrl: string | null;
        birthDate: Date | null;
        passwordHash: string | null;
        createdAt: Date;
    }[]>;
}
