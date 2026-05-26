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
exports.DiscoveryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let DiscoveryService = class DiscoveryService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async discoverUsers(userId, filters) {
        const { location, skills, interests, accountType, page = 1, limit = 20, } = filters;
        const skip = (page - 1) * limit;
        const where = {
            id: { not: userId },
            isActive: true,
            isBanned: false,
        };
        if (accountType) {
            where.currentMode = accountType;
        }
        const users = await this.prisma.user.findMany({
            where,
            skip,
            take: limit,
            include: {
                personalProfile: true,
                businessProfile: true,
            },
        });
        let filteredUsers = users;
        if (location) {
            filteredUsers = filteredUsers.filter((user) => user.personalProfile?.location
                ?.toLowerCase()
                .includes(location.toLowerCase()) ||
                user.businessProfile?.location
                    ?.toLowerCase()
                    .includes(location.toLowerCase()));
        }
        if (skills && skills.length > 0) {
            filteredUsers = filteredUsers.filter((user) => skills.some((skill) => user.personalProfile?.skills?.includes(skill)));
        }
        if (interests && interests.length > 0) {
            filteredUsers = filteredUsers.filter((user) => interests.some((interest) => user.personalProfile?.interests?.includes(interest)));
        }
        const total = await this.prisma.user.count({ where });
        return {
            users: filteredUsers,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async getRandomUsers(userId, count = 10) {
        const users = await this.prisma.user.findMany({
            where: {
                id: { not: userId },
                isActive: true,
                isBanned: false,
            },
            take: count * 2,
            include: {
                personalProfile: true,
                businessProfile: true,
            },
        });
        const shuffled = users.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }
    async getRecommendedUsers(userId, limit = 20) {
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
        const userSkills = user.personalProfile?.skills || [];
        const userInterests = user.personalProfile?.interests || [];
        const userLocation = user.personalProfile?.location || user.businessProfile?.location;
        const recommendedUsers = await this.prisma.user.findMany({
            where: {
                id: { not: userId },
                isActive: true,
                isBanned: false,
                OR: [
                    {
                        personalProfile: {
                            OR: [
                                { skills: { hasSome: userSkills } },
                                { interests: { hasSome: userInterests } },
                                ...(userLocation
                                    ? [
                                        {
                                            location: {
                                                contains: userLocation,
                                                mode: 'insensitive',
                                            },
                                        },
                                    ]
                                    : []),
                            ],
                        },
                    },
                    {
                        businessProfile: {
                            ...(userLocation
                                ? { location: { contains: userLocation, mode: 'insensitive' } }
                                : {}),
                        },
                    },
                ],
            },
            take: limit,
            include: {
                personalProfile: true,
                businessProfile: true,
            },
        });
        return recommendedUsers;
    }
};
exports.DiscoveryService = DiscoveryService;
exports.DiscoveryService = DiscoveryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DiscoveryService);
//# sourceMappingURL=discovery.service.js.map