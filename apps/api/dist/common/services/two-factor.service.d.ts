export declare class TwoFactorService {
    generateSecret(): string;
    generateQRCode(secret: string, email: string): string;
    verifyToken(secret: string, token: string): boolean;
}
