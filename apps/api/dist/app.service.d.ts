import { PrismaService } from './prisma/prisma.service';
export declare class AppService {
    private prisma;
    constructor(prisma: PrismaService);
    getHello(): Promise<{
        name: string | null;
        id: string;
        email: string;
        username: string;
        password: string;
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
        createdAt: Date;
    }[]>;
}
