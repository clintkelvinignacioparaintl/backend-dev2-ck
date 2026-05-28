import { SeenStatusService } from '../seen-status/seen-status.service';
import { CacheService } from '../cache/cache.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { MessageSeenEvent, ConversationSeenEvent } from './seen-status.events';
export declare class SeenStatusListener {
    private readonly seenStatusService;
    private readonly cache;
    private readonly eventEmitter;
    constructor(seenStatusService: SeenStatusService, cache: CacheService, eventEmitter: EventEmitter2);
    handleMessageSeen(event: MessageSeenEvent): Promise<void>;
    handleConversationSeen(event: ConversationSeenEvent): Promise<void>;
}
