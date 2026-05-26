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
exports.SeenStatusService = void 0;
const common_1 = require("@nestjs/common");
const cache_service_1 = require("../cache/cache.service");
let SeenStatusService = class SeenStatusService {
    constructor(cache) {
        this.cache = cache;
        this.redisSubscriber = null;
        this.SEEN_STATUS_CHANNEL = process.env.SEEN_STATUS_CHANNEL || 'seen-status-updates';
    }
    async onModuleInit() {
        if (!this.cache.isAvailable()) {
            console.log('Redis not available, seen status real-time updates disabled');
            return;
        }
        const redisClient = this.cache.getClient();
        this.redisSubscriber = redisClient.duplicate();
        await this.redisSubscriber.subscribe(this.SEEN_STATUS_CHANNEL);
        this.redisSubscriber.on('message', (channel, message) => {
            if (channel === this.SEEN_STATUS_CHANNEL) {
                try {
                    const data = JSON.parse(message);
                    this.handleSeenStatusUpdate(data);
                }
                catch (error) {
                    console.error('Error parsing seen status update:', error);
                }
            }
        });
        console.log(`Seen status service subscribed to channel: ${this.SEEN_STATUS_CHANNEL}`);
    }
    async onModuleDestroy() {
        if (this.redisSubscriber) {
            await this.redisSubscriber.unsubscribe(this.SEEN_STATUS_CHANNEL);
            await this.redisSubscriber.quit();
        }
    }
    async publishSeenStatusUpdate(data) {
        if (!this.cache.isAvailable()) {
            return;
        }
        const redisClient = this.cache.getClient();
        await redisClient.publish(this.SEEN_STATUS_CHANNEL, JSON.stringify(data));
    }
    handleSeenStatusUpdate(data) {
        console.log('Seen status update received:', data);
    }
    async getMessageSeenStatus(messageId) {
        const cacheKey = `message-seen:${messageId}`;
        const cached = await this.cache.get(cacheKey);
        if (cached) {
            return JSON.parse(cached);
        }
        return {
            seen: false,
            seenBy: [],
            seenAt: null,
        };
    }
    async getConversationSeenStatus(conversationId, userId) {
        const cacheKey = `conversation-seen:${conversationId}:${userId}`;
        const cached = await this.cache.get(cacheKey);
        if (cached) {
            return JSON.parse(cached);
        }
        return {
            lastSeenAt: null,
            unreadCount: 0,
        };
    }
};
exports.SeenStatusService = SeenStatusService;
exports.SeenStatusService = SeenStatusService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [cache_service_1.CacheService])
], SeenStatusService);
//# sourceMappingURL=seen-status.service.js.map