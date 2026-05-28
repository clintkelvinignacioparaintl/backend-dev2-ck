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
exports.SwipeService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let SwipeService = class SwipeService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getFeed(userId) {
        const swipedUsers = await this.prisma.swipe.findMany({
            where: {
                senderId: userId,
            },
            select: {
                receiverId: true,
            },
        });
        const excludedIds = swipedUsers.map((s) => s.receiverId);
        const users = await this.prisma.user.findMany({
            where: {
                id: {
                    notIn: [...excludedIds, userId],
                },
                deletedAt: null,
                isActive: true,
                isBanned: false,
                personalProfile: {
                    isNot: null,
                },
            },
            include: {
                personalProfile: true,
                media: {
                    where: {
                        type: 'IMAGE',
                    },
                    take: 1,
                },
            },
            take: 30,
            orderBy: {
                createdAt: 'desc',
            },
        });
        return users;
    }
    async swipe(senderId, receiverId, type) {
        await this.prisma.swipe.upsert({
            where: {
                senderId_receiverId: {
                    senderId,
                    receiverId,
                },
            },
            update: {
                type,
            },
            create: {
                senderId,
                receiverId,
                type,
            },
        });
        if (type === 'LEFT') {
            return {
                matched: false,
            };
        }
        const reverseSwipe = await this.prisma.swipe.findFirst({
            where: {
                senderId: receiverId,
                receiverId: senderId,
                type: 'RIGHT',
            },
        });
        if (!reverseSwipe) {
            return {
                matched: false,
            };
        }
        const sortedUsers = [senderId, receiverId].sort();
        const match = await this.prisma.match.upsert({
            where: {
                userOneId_userTwoId: {
                    userOneId: sortedUsers[0],
                    userTwoId: sortedUsers[1],
                },
            },
            update: {},
            create: {
                userOneId: sortedUsers[0],
                userTwoId: sortedUsers[1],
            },
        });
        await this.prisma.conversation.upsert({
            where: {
                matchId: match.id,
            },
            update: {},
            create: {
                matchId: match.id,
            },
        });
        return {
            matched: true,
            match,
        };
    }
};
exports.SwipeService = SwipeService;
exports.SwipeService = SwipeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SwipeService);
//# sourceMappingURL=swipe.service.js.map