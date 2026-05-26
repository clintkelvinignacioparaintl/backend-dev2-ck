import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { CacheService } from '../cache/cache.service';
export declare class SeenStatusService implements OnModuleInit, OnModuleDestroy {
    private cache;
    private redisSubscriber;
    private readonly SEEN_STATUS_CHANNEL;
    constructor(cache: CacheService);
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
    publishSeenStatusUpdate(data: {
        type: 'message' | 'conversation';
        id: string;
        userId: string;
        timestamp: Date;
    }): Promise<void>;
    private handleSeenStatusUpdate;
    getMessageSeenStatus(messageId: string): Promise<{
        seen: boolean;
        seenBy: string[];
        seenAt: Date | null;
    }>;
    getConversationSeenStatus(conversationId: string, userId: string): Promise<{
        lastSeenAt: Date | null;
        unreadCount: number;
    }>;
}
