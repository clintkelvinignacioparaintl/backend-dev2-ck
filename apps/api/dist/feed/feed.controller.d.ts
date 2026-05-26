import { FeedService } from './feed.service';
export declare class FeedController {
    private readonly feedService;
    constructor(feedService: FeedService);
    getUserFeed(req: any, page?: string, limit?: string, feedType?: 'all' | 'matches' | 'profiles'): Promise<any>;
    getGlobalFeed(page?: string, limit?: string): Promise<any>;
    getActivityFeed(req: any, page?: string, limit?: string): Promise<{
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
