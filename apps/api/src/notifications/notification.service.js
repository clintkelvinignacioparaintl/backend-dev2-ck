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
exports.NotificationService = exports.NotificationType = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const cache_service_1 = require("../cache/cache.service");
var NotificationType;
(function (NotificationType) {
    NotificationType["MATCH"] = "MATCH";
    NotificationType["MESSAGE"] = "MESSAGE";
    NotificationType["SWIPE"] = "SWIPE";
    NotificationType["PROFILE_VIEW"] = "PROFILE_VIEW";
    NotificationType["SYSTEM"] = "SYSTEM";
})(NotificationType || (exports.NotificationType = NotificationType = {}));
let NotificationService = class NotificationService {
    constructor(prisma, cache) {
        this.prisma = prisma;
        this.cache = cache;
    }
    async create(dto) {
        const notification = await this.prisma.notification.create({
            data: {
                userId: dto.userId,
                type: dto.type,
                title: dto.payload?.title || 'Notification',
                message: dto.payload?.message || '',
                payload: dto.payload,
                isRead: dto.isRead || false,
            },
        });
        await this.cache.delPattern(`notifications:${dto.userId}:*`);
        return notification;
    }
    async getUserNotifications(userId, page = 1, limit = 20) {
        const cacheKey = `notifications:${userId}:${page}:${limit}`;
        const cached = await this.cache.get(cacheKey);
        if (cached) {
            return JSON.parse(cached);
        }
        const skip = (page - 1) * limit;
        const [notifications, total] = await Promise.all([
            this.prisma.notification.findMany({
                where: { userId },
                orderBy: { createdAt: 'desc' },
                skip,
                take: limit,
            }),
            this.prisma.notification.count({ where: { userId } }),
        ]);
        const result = {
            notifications,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
        await this.cache.set(cacheKey, JSON.stringify(result), 300);
        return result;
    }
    async markAsRead(notificationId, userId) {
        const notification = await this.prisma.notification.updateMany({
            where: {
                id: notificationId,
                userId,
            },
            data: { isRead: true },
        });
        await this.cache.delPattern(`notifications:${userId}:*`);
        return notification;
    }
    async markAllAsRead(userId) {
        await this.prisma.notification.updateMany({
            where: { userId, isRead: false },
            data: { isRead: true },
        });
        await this.cache.delPattern(`notifications:${userId}:*`);
    }
    async deleteNotification(notificationId, userId) {
        await this.prisma.notification.deleteMany({
            where: { id: notificationId, userId },
        });
        await this.cache.delPattern(`notifications:${userId}:*`);
    }
    async getUnreadCount(userId) {
        const cacheKey = `notifications:${userId}:unread`;
        const cached = await this.cache.get(cacheKey);
        if (cached) {
            return parseInt(cached);
        }
        const count = await this.prisma.notification.count({
            where: { userId, isRead: false },
        });
        await this.cache.set(cacheKey, count.toString(), 60);
        return count;
    }
    async sendMatchNotification(userId, matchedUserId) {
        const matchedUser = await this.prisma.user.findUnique({
            where: { id: matchedUserId },
            include: { personalProfile: true },
        });
        if (!matchedUser)
            return;
        return this.create({
            userId,
            type: NotificationType.MATCH,
            payload: {
                title: 'New Match!',
                message: `You matched with ${matchedUser.personalProfile?.firstName || matchedUser.username}`,
                matchedUserId,
            },
        });
    }
    async sendMessageNotification(userId, conversationId, senderName) {
        return this.create({
            userId,
            type: NotificationType.MESSAGE,
            payload: {
                title: 'New Message',
                message: `${senderName} sent you a message`,
                conversationId,
            },
        });
    }
    async sendSwipeNotification(userId, swiperName) {
        return this.create({
            userId,
            type: NotificationType.SWIPE,
            payload: {
                title: 'New Swipe',
                message: `${swiperName} swiped right on you`,
            },
        });
    }
    async sendProfileViewNotification(userId, viewerName) {
        return this.create({
            userId,
            type: NotificationType.PROFILE_VIEW,
            payload: {
                title: 'Profile View',
                message: `${viewerName} viewed your profile`,
            },
        });
    }
};
exports.NotificationService = NotificationService;
exports.NotificationService = NotificationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        cache_service_1.CacheService])
], NotificationService);
//# sourceMappingURL=notification.service.js.map