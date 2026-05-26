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
exports.FeedService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const cache_service_1 = require("../cache/cache.service");
let FeedService = class FeedService {
    constructor(prisma, cache) {
        this.prisma = prisma;
        this.cache = cache;
    }
    async getUserFeed(userId, options) {
        const { page = 1, limit = 20, feedType = 'all' } = options;
        const cacheKey = `user-feed:${userId}:${page}:${limit}:${feedType}`;
        const cached = await this.cache.get(cacheKey);
        if (cached) {
            return JSON.parse(cached);
        }
        const skip = (page - 1) * limit;
        let feedItems = [];
        if (feedType === 'all' || feedType === 'matches') {
            const matches = await this.prisma.match.findMany({
                where: {
                    OR: [{ userOneId: userId }, { userTwoId: userId }],
                    status: 'ACTIVE',
                },
                include: {
                    userOne: {
                        include: {
                            personalProfile: true,
                            businessProfile: true,
                        },
                    },
                    userTwo: {
                        include: {
                            personalProfile: true,
                            businessProfile: true,
                        },
                    },
                    conversations: true,
                },
                orderBy: { createdAt: 'desc' },
                take: limit,
                skip,
            });
            feedItems = feedItems.concat(matches.map((match) => ({
                type: 'match',
                data: match,
                timestamp: match.createdAt,
            })));
        }
        if (feedType === 'all' || feedType === 'profiles') {
            const profiles = await this.prisma.personalProfile.findMany({
                where: {
                    user: {
                        isActive: true,
                        isBanned: false,
                        id: { not: userId },
                    },
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            username: true,
                            profileImageUrl: true,
                            currentMode: true,
                        },
                    },
                },
                orderBy: { createdAt: 'desc' },
                take: limit,
                skip,
            });
            feedItems = feedItems.concat(profiles.map((profile) => ({
                type: 'profile',
                data: profile,
                timestamp: profile.createdAt,
            })));
        }
        feedItems.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
        const total = await this.prisma.match.count({
            where: {
                OR: [{ userOneId: userId }, { userTwoId: userId }],
                status: 'ACTIVE',
            },
        });
        const result = {
            items: feedItems.slice(0, limit),
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
    async getGlobalFeed(options) {
        const { page = 1, limit = 20 } = options;
        const cacheKey = `global-feed:${page}:${limit}`;
        const cached = await this.cache.get(cacheKey);
        if (cached) {
            return JSON.parse(cached);
        }
        const skip = (page - 1) * limit;
        const users = await this.prisma.user.findMany({
            where: {
                isActive: true,
                isBanned: false,
            },
            include: {
                personalProfile: true,
                businessProfile: true,
            },
            orderBy: { createdAt: 'desc' },
            take: limit,
            skip,
        });
        const total = await this.prisma.user.count({
            where: {
                isActive: true,
                isBanned: false,
            },
        });
        const result = {
            users,
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
    async getActivityFeed(userId, options) {
        const { page = 1, limit = 20 } = options;
        const skip = (page - 1) * limit;
        const messages = await this.prisma.message.findMany({
            where: {
                conversation: {
                    match: {
                        OR: [{ userOneId: userId }, { userTwoId: userId }],
                    },
                },
            },
            include: {
                sender: {
                    select: {
                        id: true,
                        username: true,
                        profileImageUrl: true,
                    },
                },
                conversation: true,
            },
            orderBy: { createdAt: 'desc' },
            take: limit,
            skip,
        });
        const total = await this.prisma.message.count({
            where: {
                conversation: {
                    match: {
                        OR: [{ userOneId: userId }, { userTwoId: userId }],
                    },
                },
            },
        });
        return {
            messages,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
};
exports.FeedService = FeedService;
exports.FeedService = FeedService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        cache_service_1.CacheService])
], FeedService);
//# sourceMappingURL=feed.service.js.map