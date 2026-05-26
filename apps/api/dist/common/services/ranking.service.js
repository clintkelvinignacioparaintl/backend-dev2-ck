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
exports.RankingService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const cache_service_1 = require("../../cache/cache.service");
let RankingService = class RankingService {
    constructor(prisma, cache) {
        this.prisma = prisma;
        this.cache = cache;
    }
    async calculateScore(userId, targetId) {
        const cacheKey = `ranking:${userId}:${targetId}`;
        const cached = await this.cache.get(cacheKey);
        if (cached) {
            return JSON.parse(cached);
        }
        const engagement = await this.calculateEngagementScore(userId, targetId);
        const recency = await this.calculateRecencyScore(targetId);
        const relevance = await this.calculateRelevanceScore(userId, targetId);
        const score = engagement * 0.4 + recency * 0.3 + relevance * 0.3;
        const result = {
            userId: targetId,
            score,
            breakdown: {
                engagement,
                recency,
                relevance,
            },
        };
        await this.cache.set(cacheKey, JSON.stringify(result), 3600);
        return result;
    }
    async calculateEngagementScore(userId, targetId) {
        const messages = await this.prisma.message.count({
            where: {
                OR: [
                    { userId, conversation: { match: { userOneId: targetId } } },
                    { userId, conversation: { match: { userTwoId: targetId } } },
                ],
            },
        });
        const swipe = await this.prisma.swipe.findFirst({
            where: { userId, targetId },
        });
        let score = 0;
        score += Math.min(messages * 10, 50);
        score += swipe?.isLike ? 20 : 0;
        return Math.min(score, 100);
    }
    async calculateRecencyScore(targetId) {
        const user = await this.prisma.user.findUnique({
            where: { id: targetId },
            select: { createdAt: true },
        });
        if (!user)
            return 0;
        const daysSinceCreation = (Date.now() - user.createdAt.getTime()) / (1000 * 60 * 60 * 24);
        const score = Math.max(0, 100 - daysSinceCreation * 2);
        return score;
    }
    async calculateRelevanceScore(userId, targetId) {
        const userProfiles = await this.prisma.personalProfile.findMany({
            where: { userId: { in: [userId, targetId] } },
            select: { skills: true, interests: true, location: true },
        });
        if (userProfiles.length < 2)
            return 50;
        const [user1, user2] = userProfiles;
        let score = 50;
        const commonSkills = user1.skills.filter((skill) => user2.skills.includes(skill));
        score += commonSkills.length * 5;
        const commonInterests = user1.interests.filter((interest) => user2.interests.includes(interest));
        score += commonInterests.length * 5;
        if (user1.location === user2.location) {
            score += 20;
        }
        return Math.min(score, 100);
    }
    async rankUsers(userId, candidateIds) {
        const scores = await Promise.all(candidateIds.map((id) => this.calculateScore(userId, id)));
        return scores.sort((a, b) => b.score - a.score);
    }
};
exports.RankingService = RankingService;
exports.RankingService = RankingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        cache_service_1.CacheService])
], RankingService);
//# sourceMappingURL=ranking.service.js.map