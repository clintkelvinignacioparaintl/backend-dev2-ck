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
exports.UserProfileService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const cache_service_1 = require("../cache/cache.service");
let UserProfileService = class UserProfileService {
    constructor(prisma, cache) {
        this.prisma = prisma;
        this.cache = cache;
    }
    async getUserProfile(userId) {
        const cacheKey = `user-profile:${userId}`;
        const cached = await this.cache.get(cacheKey);
        if (cached) {
            return JSON.parse(cached);
        }
        const profile = await this.prisma.personalProfile.findUnique({
            where: { userId },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        username: true,
                        currentMode: true,
                        isVerified: true,
                        isActive: true,
                        createdAt: true,
                    },
                },
            },
        });
        if (profile) {
            await this.cache.set(cacheKey, JSON.stringify(profile), 600);
        }
        return profile;
    }
    async createUserProfile(userId, data) {
        return this.prisma.personalProfile.create({
            data: {
                userId,
                ...data,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        username: true,
                    },
                },
            },
        });
    }
    async updateUserProfile(userId, data) {
        const profile = await this.prisma.personalProfile.update({
            where: { userId },
            data,
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        username: true,
                    },
                },
            },
        });
        await this.cache.del(`user-profile:${userId}`);
        return profile;
    }
    async deleteUserProfile(userId) {
        await this.prisma.personalProfile.delete({
            where: { userId },
        });
        await this.cache.del(`user-profile:${userId}`);
    }
    async searchProfiles(query, page = 1, limit = 20) {
        const skip = (page - 1) * limit;
        const profiles = await this.prisma.personalProfile.findMany({
            where: {
                OR: [
                    { firstName: { contains: query, mode: 'insensitive' } },
                    { lastName: { contains: query, mode: 'insensitive' } },
                    { skills: { has: query } },
                    { interests: { has: query } },
                    { location: { contains: query, mode: 'insensitive' } },
                ],
            },
            skip,
            take: limit,
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        currentMode: true,
                    },
                },
            },
        });
        const total = await this.prisma.personalProfile.count({
            where: {
                OR: [
                    { firstName: { contains: query, mode: 'insensitive' } },
                    { lastName: { contains: query, mode: 'insensitive' } },
                    { skills: { has: query } },
                    { interests: { has: query } },
                    { location: { contains: query, mode: 'insensitive' } },
                ],
            },
        });
        return {
            profiles,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async getProfilesByLocation(location, page = 1, limit = 20) {
        const skip = (page - 1) * limit;
        const profiles = await this.prisma.personalProfile.findMany({
            where: {
                location: { contains: location, mode: 'insensitive' },
            },
            skip,
            take: limit,
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        currentMode: true,
                    },
                },
            },
        });
        const total = await this.prisma.personalProfile.count({
            where: {
                location: { contains: location, mode: 'insensitive' },
            },
        });
        return {
            profiles,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async getProfilesBySkill(skill, page = 1, limit = 20) {
        const skip = (page - 1) * limit;
        const profiles = await this.prisma.personalProfile.findMany({
            where: {
                skills: { has: skill },
            },
            skip,
            take: limit,
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        currentMode: true,
                    },
                },
            },
        });
        const total = await this.prisma.personalProfile.count({
            where: {
                skills: { has: skill },
            },
        });
        return {
            profiles,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
};
exports.UserProfileService = UserProfileService;
exports.UserProfileService = UserProfileService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        cache_service_1.CacheService])
], UserProfileService);
//# sourceMappingURL=user-profile.service.js.map