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
exports.BusinessProfileService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let BusinessProfileService = class BusinessProfileService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getBusinessProfile(userId) {
        return this.prisma.businessProfile.findUnique({
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
    }
    async createBusinessProfile(userId, data) {
        return this.prisma.businessProfile.create({
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
    async updateBusinessProfile(userId, data) {
        return this.prisma.businessProfile.update({
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
    }
    async deleteBusinessProfile(userId) {
        return this.prisma.businessProfile.delete({
            where: { userId },
        });
    }
    async searchBusinessProfiles(query, page = 1, limit = 20) {
        const skip = (page - 1) * limit;
        const profiles = await this.prisma.businessProfile.findMany({
            where: {
                OR: [
                    { businessName: { contains: query, mode: 'insensitive' } },
                    { industry: { contains: query, mode: 'insensitive' } },
                    { services: { has: query } },
                    { lookingFor: { has: query } },
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
                        logoUrl: true,
                        currentMode: true,
                    },
                },
            },
        });
        const total = await this.prisma.businessProfile.count({
            where: {
                OR: [
                    { businessName: { contains: query, mode: 'insensitive' } },
                    { industry: { contains: query, mode: 'insensitive' } },
                    { services: { has: query } },
                    { lookingFor: { has: query } },
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
    async getBusinessProfilesByIndustry(industry, page = 1, limit = 20) {
        const skip = (page - 1) * limit;
        const profiles = await this.prisma.businessProfile.findMany({
            where: {
                industry: { contains: industry, mode: 'insensitive' },
            },
            skip,
            take: limit,
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        logoUrl: true,
                        currentMode: true,
                    },
                },
            },
        });
        const total = await this.prisma.businessProfile.count({
            where: {
                industry: { contains: industry, mode: 'insensitive' },
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
    async getBusinessProfilesByLocation(location, page = 1, limit = 20) {
        const skip = (page - 1) * limit;
        const profiles = await this.prisma.businessProfile.findMany({
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
                        logoUrl: true,
                        currentMode: true,
                    },
                },
            },
        });
        const total = await this.prisma.businessProfile.count({
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
    async getBusinessProfilesByTeamSize(minSize, maxSize, page = 1, limit = 20) {
        const skip = (page - 1) * limit;
        const profiles = await this.prisma.businessProfile.findMany({
            where: {
                teamSize: {
                    gte: minSize,
                    lte: maxSize,
                },
            },
            skip,
            take: limit,
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        logoUrl: true,
                        currentMode: true,
                    },
                },
            },
        });
        const total = await this.prisma.businessProfile.count({
            where: {
                teamSize: {
                    gte: minSize,
                    lte: maxSize,
                },
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
exports.BusinessProfileService = BusinessProfileService;
exports.BusinessProfileService = BusinessProfileService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BusinessProfileService);
//# sourceMappingURL=business-profile.service.js.map