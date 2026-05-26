import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { CacheService } from '../cache/cache.service';
import Redis from 'ioredis';

@Injectable()
export class SeenStatusService implements OnModuleInit, OnModuleDestroy {
  private redisSubscriber: Redis | null = null;
  private readonly SEEN_STATUS_CHANNEL =
    process.env.SEEN_STATUS_CHANNEL || 'seen-status-updates';

  constructor(private cache: CacheService) {}

  async onModuleInit() {
    if (!this.cache.isAvailable()) {
      console.log(
        'Redis not available, seen status real-time updates disabled',
      );
      return;
    }

    const redisClient = this.cache.getClient();
    this.redisSubscriber = redisClient.duplicate();

    await this.redisSubscriber.subscribe(this.SEEN_STATUS_CHANNEL);

    this.redisSubscriber.on('message', (channel: string, message: string) => {
      if (channel === this.SEEN_STATUS_CHANNEL) {
        try {
          const data = JSON.parse(message);
          this.handleSeenStatusUpdate(data);
        } catch (error) {
          console.error('Error parsing seen status update:', error);
        }
      }
    });

    console.log(
      `Seen status service subscribed to channel: ${this.SEEN_STATUS_CHANNEL}`,
    );
  }

  async onModuleDestroy() {
    if (this.redisSubscriber) {
      await this.redisSubscriber.unsubscribe(this.SEEN_STATUS_CHANNEL);
      await this.redisSubscriber.quit();
    }
  }

  async publishSeenStatusUpdate(data: {
    type: 'message' | 'conversation';
    id: string;
    userId: string;
    timestamp: Date;
  }) {
    if (!this.cache.isAvailable()) {
      return;
    }

    const redisClient = this.cache.getClient();
    await redisClient.publish(
      this.SEEN_STATUS_CHANNEL,
      JSON.stringify(data),
    );
  }

  private handleSeenStatusUpdate(data: {
    type: 'message' | 'conversation';
    id: string;
    userId: string;
    timestamp: Date;
  }) {
    // This method can be extended to handle additional logic
    // The actual broadcasting is handled by the gateway
    console.log('Seen status update received:', data);
  }

  async getMessageSeenStatus(messageId: string): Promise<{
    seen: boolean;
    seenBy: string[];
    seenAt: Date | null;
  }> {
    const cacheKey = `message-seen:${messageId}`;
    const cached = await this.cache.get(cacheKey);

    if (cached) {
      return JSON.parse(cached) as {
        seen: boolean;
        seenBy: string[];
        seenAt: Date | null;
      };
    }

    return {
      seen: false,
      seenBy: [],
      seenAt: null,
    };
  }

  async getConversationSeenStatus(
    conversationId: string,
    userId: string,
  ): Promise<{
    lastSeenAt: Date | null;
    unreadCount: number;
  }> {
    const cacheKey = `conversation-seen:${conversationId}:${userId}`;
    const cached = await this.cache.get(cacheKey);

    if (cached) {
      return JSON.parse(cached) as {
        lastSeenAt: Date | null;
        unreadCount: number;
      };
    }

    return {
      lastSeenAt: null,
      unreadCount: 0,
    };
  }
}
