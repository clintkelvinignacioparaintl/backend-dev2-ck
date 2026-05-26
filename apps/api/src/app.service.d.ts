import { PrismaService } from './prisma/prisma.service';
export declare class AppService {
    private prisma;
    constructor(prisma: PrismaService);
    getHello(): Promise<{
        id: string;
        email: string;
        username: string;
        password: string;
        name: string | null;
        isActive: boolean;
        isBanned: boolean;
        isVerified: boolean;
        currentMode: string;
        profileImageUrl: string | null;
        logoUrl: string | null;
        createdAt: Date;
    }[]>;
}
