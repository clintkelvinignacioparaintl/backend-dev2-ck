import { TwoFactorService } from './two-factor.service';
export declare class TwoFactorController {
    private readonly twoFactorService;
    constructor(twoFactorService: TwoFactorService);
    enableTwoFactor(req: any): Promise<{
        secret: string;
        qrCode: string;
    }>;
    confirmTwoFactor(req: any, token: string): Promise<{
        message: string;
    }>;
    disableTwoFactor(req: any, password: string): Promise<{
        message: string;
    }>;
    verifyTwoFactorToken(req: any, token: string): Promise<{
        valid: boolean;
    }>;
}
