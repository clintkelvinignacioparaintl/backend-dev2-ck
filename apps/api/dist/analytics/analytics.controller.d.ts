import { AnalyticsService } from '../common/services/analytics.service';
export declare class AnalyticsController {
    private readonly analyticsService;
    constructor(analyticsService: AnalyticsService);
    getUserStats(req: any): Promise<{
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
    getActivityStats(days?: string): Promise<{
        period: string;
        newUsers: number;
        newMessages: number;
        newMatches: number;
    }>;
}
