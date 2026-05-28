"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeenStatusListener = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const seen_status_service_1 = require("../seen-status/seen-status.service");
const cache_service_1 = require("../cache/cache.service");
const event_emitter_2 = require("@nestjs/event-emitter");
const seen_status_events_1 = require("./seen-status.events");
let SeenStatusListener = class SeenStatusListener {
    constructor(seenStatusService, cache, eventEmitter) {
        this.seenStatusService = seenStatusService;
        this.cache = cache;
        this.eventEmitter = eventEmitter;
    }
    async handleMessageSeen(event) {
        const { messageId, userId, conversationId, timestamp } = event;
        const cacheKey = `message-seen:${messageId}`;
        await this.cache.set(cacheKey, JSON.stringify({
            seen: true,
            seenBy: [userId],
            seenAt: timestamp,
        }), 3600);
        await this.seenStatusService.publishSeenStatusUpdate({
            type: 'message',
            id: messageId,
            userId,
            timestamp,
        });
        this.eventEmitter.emit('gateway.broadcast.message.seen', {
            messageId,
            userId,
            seenAt: timestamp,
        });
        const conversationCacheKey = `conversation-seen:${conversationId}:${userId}`;
        const existingCache = await this.cache.get(conversationCacheKey);
        let unreadCount = 0;
        if (existingCache) {
            const parsed = JSON.parse(existingCache);
            unreadCount = Math.max(0, parsed.unreadCount - 1);
        }
        await this.cache.set(conversationCacheKey, JSON.stringify({
            lastSeenAt: timestamp,
            unreadCount,
        }), 3600);
    }
    async handleConversationSeen(event) {
        const { conversationId, userId, messageIds, timestamp } = event;
        for (const messageId of messageIds) {
            const cacheKey = `message-seen:${messageId}`;
            await this.cache.set(cacheKey, JSON.stringify({
                seen: true,
                seenBy: [userId],
                seenAt: timestamp,
            }), 3600);
        }
        await this.seenStatusService.publishSeenStatusUpdate({
            type: 'conversation',
            id: conversationId,
            userId,
            timestamp,
        });
        this.eventEmitter.emit('gateway.broadcast.conversation.seen', {
            conversationId,
            userId,
            seenAt: timestamp,
        });
        const conversationCacheKey = `conversation-seen:${conversationId}:${userId}`;
        await this.cache.set(conversationCacheKey, JSON.stringify({
            lastSeenAt: timestamp,
            unreadCount: 0,
        }), 3600);
    }
};
exports.SeenStatusListener = SeenStatusListener;
__decorate([
    (0, event_emitter_1.OnEvent)('message.seen'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [seen_status_events_1.MessageSeenEvent]),
    __metadata("design:returntype", Promise)
], SeenStatusListener.prototype, "handleMessageSeen", null);
__decorate([
    (0, event_emitter_1.OnEvent)('conversation.seen'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [seen_status_events_1.ConversationSeenEvent]),
    __metadata("design:returntype", Promise)
], SeenStatusListener.prototype, "handleConversationSeen", null);
exports.SeenStatusListener = SeenStatusListener = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [seen_status_service_1.SeenStatusService,
        cache_service_1.CacheService,
        event_emitter_2.EventEmitter2])
], SeenStatusListener);
//# sourceMappingURL=seen-status.listener.js.map