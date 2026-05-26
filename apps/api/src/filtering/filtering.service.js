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
exports.FilteringService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let FilteringService = class FilteringService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async filterUsers(filters) {
        const { accountType, location, skills, interests, industry, teamSizeMin, teamSizeMax, isActive, isVerified, page = 1, limit = 20, } = filters;
        const skip = (page - 1) * limit;
        const where = {
            isActive: isActive !== undefined ? isActive : true,
            isBanned: false,
        };
        if (accountType) {
            where.currentMode = accountType;
        }
        if (isVerified !== undefined) {
            where.isVerified = isVerified;
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
        if (industry) {
            filteredUsers = filteredUsers.filter((user) => user.businessProfile?.industry
                ?.toLowerCase()
                .includes(industry.toLowerCase()));
        }
        if (teamSizeMin !== undefined || teamSizeMax !== undefined) {
            filteredUsers = filteredUsers.filter((user) => {
                const teamSize = user.businessProfile?.teamSize;
                if (teamSize === null || teamSize === undefined)
                    return false;
                if (teamSizeMin !== undefined && teamSize < teamSizeMin)
                    return false;
                if (teamSizeMax !== undefined && teamSize > teamSizeMax)
                    return false;
                return true;
            });
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
    async filterMatches(userId, filters) {
        const { status, page = 1, limit = 20 } = filters;
        const skip = (page - 1) * limit;
        const where = {
            OR: [{ userOneId: userId }, { userTwoId: userId }],
        };
        if (status) {
            where.status = status;
        }
        const matches = await this.prisma.match.findMany({
            where,
            skip,
            take: limit,
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
        });
        const total = await this.prisma.match.count({ where });
        return {
            matches,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async filterMessages(conversationId, filters) {
        const { type, isSeen, page = 1, limit = 20 } = filters;
        const skip = (page - 1) * limit;
        const where = { conversationId };
        if (type) {
            where.type = type;
        }
        if (isSeen !== undefined) {
            where.isSeen = isSeen;
        }
        const messages = await this.prisma.message.findMany({
            where,
            skip,
            take: limit,
            include: {
                sender: {
                    select: {
                        id: true,
                        username: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
        const total = await this.prisma.message.count({ where });
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
exports.FilteringService = FilteringService;
exports.FilteringService = FilteringService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FilteringService);
//# sourceMappingURL=filtering.service.js.map