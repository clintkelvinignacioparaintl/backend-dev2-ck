import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { SeenStatusService } from '../seen-status/seen-status.service';
import { CacheService } from '../cache/cache.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { MessageSeenEvent, ConversationSeenEvent } from './seen-status.events';

@Injectable()
export class SeenStatusListener {
  constructor(
    private readonly seenStatusService: SeenStatusService,
    private readonly cache: CacheService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @OnEvent('message.seen')
  async handleMessageSeen(event: MessageSeenEvent) {
    const { messageId, userId, conversationId, timestamp } = event;

    // Update cache for message seen status
    const cacheKey = `message-seen:${messageId}`;
    await this.cache.set(
      cacheKey,
      JSON.stringify({
        seen: true,
        seenBy: [userId],
        seenAt: timestamp,
      }),
      3600, // 1 hour TTL
    );

    // Publish to Redis for real-time updates
    await this.seenStatusService.publishSeenStatusUpdate({
      type: 'message',
      id: messageId,
      userId,
      timestamp,
    });

    // Emit event for gateway to broadcast
    this.eventEmitter.emit('gateway.broadcast.message.seen', {
      messageId,
      userId,
      seenAt: timestamp,
    });

    // Update conversation seen status cache
    const conversationCacheKey = `conversation-seen:${conversationId}:${userId}`;
    const existingCache = await this.cache.get(conversationCacheKey);
    let unreadCount = 0;

    if (existingCache) {
      const parsed = JSON.parse(existingCache);
      unreadCount = Math.max(0, parsed.unreadCount - 1);
    }

    await this.cache.set(
      conversationCacheKey,
      JSON.stringify({
        lastSeenAt: timestamp,
        unreadCount,
      }),
      3600,
    );
  }

  @OnEvent('conversation.seen')
  async handleConversationSeen(event: ConversationSeenEvent) {
    const { conversationId, userId, messageIds, timestamp } = event;

    // Update cache for all messages in conversation
    for (const messageId of messageIds) {
      const cacheKey = `message-seen:${messageId}`;
      await this.cache.set(
        cacheKey,
        JSON.stringify({
          seen: true,
          seenBy: [userId],
          seenAt: timestamp,
        }),
        3600,
      );
    }

    // Publish to Redis for real-time updates
    await this.seenStatusService.publishSeenStatusUpdate({
      type: 'conversation',
      id: conversationId,
      userId,
      timestamp,
    });

    // Emit event for gateway to broadcast
    this.eventEmitter.emit('gateway.broadcast.conversation.seen', {
      conversationId,
      userId,
      seenAt: timestamp,
    });

    // Update conversation seen status cache
    const conversationCacheKey = `conversation-seen:${conversationId}:${userId}`;
    await this.cache.set(
      conversationCacheKey,
      JSON.stringify({
        lastSeenAt: timestamp,
        unreadCount: 0,
      }),
      3600,
    );
  }
}
