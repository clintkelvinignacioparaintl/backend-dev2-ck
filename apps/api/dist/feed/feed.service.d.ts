import { PrismaService } from '../prisma/prisma.service';
import { CacheService } from '../cache/cache.service';
export declare class FeedService {
    private prisma;
    private cache;
    constructor(prisma: PrismaService, cache: CacheService);
    getUserFeed(userId: string, options: {
        page?: number;
        limit?: number;
        feedType?: 'all' | 'matches' | 'profiles';
    }): Promise<any>;
    getGlobalFeed(options: {
        page?: number;
        limit?: number;
    }): Promise<any>;
    getActivityFeed(userId: string, options: {
        page?: number;
        limit?: number;
    }): Promise<{
        messages: ({
            conversation: {
                id: string;
                createdAt: Date;
                matchId: string;
            };
            sender: {
                id: string;
                username: string;
                profileImageUrl: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            userId: string;
            content: string;
            type: string;
            isSeen: boolean;
            conversationId: string;
            senderId: string;
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
}
