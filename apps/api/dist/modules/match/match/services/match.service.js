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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
const realtime_gateway_1 = require("../../realtime/realtime.gateway");
let MatchService = class MatchService {
    constructor(prisma, realtime) {
        this.prisma = prisma;
        this.realtime = realtime;
    }
    async checkAndCreateMatch(userAId, userBId) {
        const [userOneId, userTwoId] = [userAId, userBId].sort();
        const existingMatch = await this.prisma.match.findUnique({
            where: {
                userOneId_userTwoId: {
                    userOneId,
                    userTwoId,
                },
            },
        });
        if (existingMatch) {
            return existingMatch;
        }
        const [aSwiped, bSwiped] = await Promise.all([
            this.prisma.swipe.findFirst({
                where: {
                    senderId: userAId,
                    receiverId: userBId,
                    type: 'RIGHT',
                },
            }),
            this.prisma.swipe.findFirst({
                where: {
                    senderId: userBId,
                    receiverId: userAId,
                    type: 'RIGHT',
                },
            }),
        ]);
        if (!aSwiped || !bSwiped) {
            return null;
        }
        const match = await this.prisma.match.create({
            data: {
                userOneId,
                userTwoId,
            },
        });
        const conversation = await this.prisma.conversation.create({
            data: {
                matchId: match.id,
            },
        });
        this.realtime.emitMatch(userAId, {
            matchId: match.id,
            conversationId: conversation.id,
            matchedUserId: userBId,
        });
        this.realtime.emitMatch(userBId, {
            matchId: match.id,
            conversationId: conversation.id,
            matchedUserId: userAId,
        });
        console.log('🔥 MATCH CREATED:', match.id);
        return match;
    }
};
exports.MatchService = MatchService;
exports.MatchService = MatchService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object, typeof (_b = typeof realtime_gateway_1.RealtimeGateway !== "undefined" && realtime_gateway_1.RealtimeGateway) === "function" ? _b : Object])
], MatchService);
//# sourceMappingURL=match.service.js.map