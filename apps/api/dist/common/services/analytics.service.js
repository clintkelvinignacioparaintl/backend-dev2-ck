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
exports.AnalyticsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let AnalyticsService = class AnalyticsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getUserStats(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: {
                personalProfile: true,
                businessProfile: true,
            },
        });
        if (!user) {
            throw new Error('User not found');
        }
        const messagesSent = await this.prisma.message.count({
            where: { userId },
        });
        const matchesReceived = await this.prisma.match.count({
            where: {
                OR: [{ userOneId: userId }, { userTwoId: userId }],
            },
        });
        const swipesGiven = await this.prisma.swipe.count({
            where: { userId },
        });
        const notifications = await this.prisma.notification.count({
            where: { userId },
        });
        return {
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                currentMode: user.currentMode,
                isVerified: user.isVerified,
                createdAt: user.createdAt,
            },
            stats: {
                messagesSent,
                matchesReceived,
                swipesGiven,
                notifications,
            },
        };
    }
    async getGlobalStats() {
        const totalUsers = await this.prisma.user.count();
        const activeUsers = await this.prisma.user.count({
            where: { isActive: true },
        });
        const verifiedUsers = await this.prisma.user.count({
            where: { isVerified: true },
        });
        const totalMessages = await this.prisma.message.count();
        const totalMatches = await this.prisma.match.count();
        const totalSwipes = await this.prisma.swipe.count();
        return {
            totalUsers,
            activeUsers,
            verifiedUsers,
            totalMessages,
            totalMatches,
            totalSwipes,
        };
    }
    async getActivityStats(days = 7) {
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);
        const newUsers = await this.prisma.user.count({
            where: {
                createdAt: {
                    gte: startDate,
                },
            },
        });
        const newMessages = await this.prisma.message.count({
            where: {
                createdAt: {
                    gte: startDate,
                },
            },
        });
        const newMatches = await this.prisma.match.count({
            where: {
                createdAt: {
                    gte: startDate,
                },
            },
        });
        return {
            period: `${days} days`,
            newUsers,
            newMessages,
            newMatches,
        };
    }
};
exports.AnalyticsService = AnalyticsService;
exports.AnalyticsService = AnalyticsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AnalyticsService);
//# sourceMappingURL=analytics.service.js.map