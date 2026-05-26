import { PrismaService } from '../../prisma/prisma.service';
export declare class AnalyticsService {
    private prisma;
    constructor(prisma: PrismaService);
    getUserStats(userId: string): Promise<{
        user: {
            id: string;
            username: string;
            email: string;
            currentMode: string;
            isVerified: boolean;
            createdAt: Date;
        };
        stats: {
            messagesSent: number;
            matchesReceived: number;
            swipesGiven: number;
            notifications: number;
        };
    }>;
    getGlobalStats(): Promise<{
        totalUsers: number;
        activeUsers: number;
        verifiedUsers: number;
        totalMessages: number;
        totalMatches: number;
        totalSwipes: number;
    }>;
    getActivityStats(days?: number): Promise<{
        period: string;
        newUsers: number;
        newMessages: number;
        newMatches: number;
    }>;
}
