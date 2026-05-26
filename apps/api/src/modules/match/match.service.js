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
exports.MatchService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let MatchService = class MatchService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async checkAndCreateMatch(userAId, userBId) {
        const [userOneId, userTwoId] = [userAId, userBId].sort();
        const existing = await this.prisma.match.findUnique({
            where: {
                userOneId_userTwoId: {
                    userOneId,
                    userTwoId,
                },
            },
        });
        if (existing)
            return existing;
        const [aSwiped, bSwiped] = await Promise.all([
            this.prisma.swipe.findFirst({
                where: {
                    userId: userAId,
                    targetId: userBId,
                    isLike: true,
                },
            }),
            this.prisma.swipe.findFirst({
                where: {
                    userId: userBId,
                    targetId: userAId,
                    isLike: true,
                },
            }),
        ]);
        if (!aSwiped || !bSwiped)
            return null;
        return this.prisma.match.create({
            data: {
                userOneId,
                userTwoId,
            },
        });
    }
    async getUserMatches(userId) {
        return this.prisma.match.findMany({
            where: {
                OR: [{ userOneId: userId }, { userTwoId: userId }],
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
        });
    }
};
exports.MatchService = MatchService;
exports.MatchService = MatchService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MatchService);
//# sourceMappingURL=match.service.js.map