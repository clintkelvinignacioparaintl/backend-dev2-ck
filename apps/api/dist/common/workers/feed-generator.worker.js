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
exports.FeedGeneratorWorker = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const ranking_service_1 = require("../services/ranking.service");
const cache_service_1 = require("../../cache/cache.service");
let FeedGeneratorWorker = class FeedGeneratorWorker {
    constructor(prisma, ranking, cache) {
        this.prisma = prisma;
        this.ranking = ranking;
        this.cache = cache;
    }
    async generateUserFeed(userId) {
        const cacheKey = `feed:generated:${userId}`;
        const cached = await this.cache.get(cacheKey);
        if (cached) {
            return;
        }
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: { personalProfile: true },
        });
        if (!user)
            return;
        const candidates = await this.prisma.user.findMany({
            where: {
                id: { not: userId },
                isActive: true,
                isBanned: false,
            },
            take: 100,
            select: { id: true },
        });
        const candidateIds = candidates.map((c) => c.id);
        const ranked = await this.ranking.rankUsers(userId, candidateIds);
        const topCandidates = ranked.slice(0, 20);
        await this.cache.set(cacheKey, JSON.stringify(topCandidates), 600);
    }
    async updateRankings() {
        const users = await this.prisma.user.findMany({
            where: { isActive: true },
            select: { id: true },
            take: 100,
        });
        for (const user of users) {
            await this.generateUserFeed(user.id);
        }
    }
};
exports.FeedGeneratorWorker = FeedGeneratorWorker;
exports.FeedGeneratorWorker = FeedGeneratorWorker = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        ranking_service_1.RankingService,
        cache_service_1.CacheService])
], FeedGeneratorWorker);
//# sourceMappingURL=feed-generator.worker.js.map