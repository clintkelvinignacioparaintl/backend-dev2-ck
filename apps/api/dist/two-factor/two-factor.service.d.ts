import { PrismaService } from '../prisma/prisma.service';
import { TwoFactorService as TwoFactorAuthService } from '../common/services/two-factor.service';
export declare class TwoFactorService {
    private prisma;
    private twoFactorAuthService;
    constructor(prisma: PrismaService, twoFactorAuthService: TwoFactorAuthService);
    enableTwoFactor(userId: string): Promise<{
        secret: string;
        qrCode: string;
    }>;
    confirmTwoFactor(userId: string, token: string): Promise<{
        message: string;
    }>;
    disableTwoFactor(userId: string, password: string): Promise<{
        message: string;
    }>;
    verifyTwoFactorToken(userId: string, token: string): Promise<{
        valid: boolean;
    }>;
}
