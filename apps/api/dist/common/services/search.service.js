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
exports.SearchService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const prisma_service_1 = require("../../prisma/prisma.service");
let SearchService = class SearchService {
    constructor(prisma, configService) {
        this.prisma = prisma;
        this.configService = configService;
    }
    async searchPersonalProfiles(query, limit) {
        const defaultLimit = parseInt(this.configService.get('DEFAULT_SEARCH_LIMIT') || '20', 10);
        const finalLimit = limit || defaultLimit;
        const profiles = await this.prisma.personalProfile.findMany({
            where: {
                OR: [
                    { firstName: { contains: query, mode: 'insensitive' } },
                    { lastName: { contains: query, mode: 'insensitive' } },
                    { bio: { contains: query, mode: 'insensitive' } },
                    { location: { contains: query, mode: 'insensitive' } },
                    { skills: { has: query } },
                    { interests: { has: query } },
                ],
            },
            take: finalLimit,
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        email: true,
                        profileImageUrl: true,
                    },
                },
            },
        });
        return profiles;
    }
    async searchBusinessProfiles(query, limit) {
        const defaultLimit = parseInt(this.configService.get('DEFAULT_SEARCH_LIMIT') || '20', 10);
        const finalLimit = limit || defaultLimit;
        const profiles = await this.prisma.businessProfile.findMany({
            where: {
                OR: [
                    { businessName: { contains: query, mode: 'insensitive' } },
                    { industry: { contains: query, mode: 'insensitive' } },
                    { location: { contains: query, mode: 'insensitive' } },
                    { services: { has: query } },
                    { lookingFor: { has: query } },
                ],
            },
            take: finalLimit,
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        email: true,
                        logoUrl: true,
                    },
                },
            },
        });
        return profiles;
    }
    async searchUsers(query, limit) {
        const defaultLimit = parseInt(this.configService.get('DEFAULT_SEARCH_LIMIT') || '20', 10);
        const finalLimit = limit || defaultLimit;
        const users = await this.prisma.user.findMany({
            where: {
                OR: [
                    { username: { contains: query, mode: 'insensitive' } },
                    { email: { contains: query, mode: 'insensitive' } },
                    { name: { contains: query, mode: 'insensitive' } },
                ],
                isActive: true,
                isBanned: false,
            },
            take: finalLimit,
            select: {
                id: true,
                username: true,
                email: true,
                name: true,
                profileImageUrl: true,
                logoUrl: true,
                currentMode: true,
            },
        });
        return users;
    }
    async fullTextSearch(query, limit) {
        const defaultLimit = parseInt(this.configService.get('DEFAULT_SEARCH_LIMIT') || '20', 10);
        const finalLimit = limit || defaultLimit;
        const personalProfiles = await this.prisma.$queryRaw `
      SELECT * FROM "PersonalProfile"
      WHERE to_tsvector('english', COALESCE("firstName", '') || ' ' || COALESCE("lastName", '') || ' ' || COALESCE("bio", '') || ' ' || COALESCE("location", '')) @@ plainto_tsquery('english', ${query})
      LIMIT ${finalLimit}
    `;
        const businessProfiles = await this.prisma.$queryRaw `
      SELECT * FROM "BusinessProfile"
      WHERE to_tsvector('english', COALESCE("businessName", '') || ' ' || COALESCE("industry", '') || ' ' || COALESCE("location", '')) @@ plainto_tsquery('english', ${query})
      LIMIT ${finalLimit}
    `;
        return {
            personalProfiles,
            businessProfiles,
        };
    }
};
exports.SearchService = SearchService;
exports.SearchService = SearchService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService])
], SearchService);
//# sourceMappingURL=search.service.js.map