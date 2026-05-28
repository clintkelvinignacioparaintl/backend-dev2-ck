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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscoveryService = exports.DiscoveryModule = exports.DiscoveryController = void 0;
const common_1 = require("@nestjs/common");
const discovery_service_1 = require("./discovery.service");
let DiscoveryController = class DiscoveryController {
    constructor(service) {
        this.service = service;
    }
    async feed(userId) {
        return this.service.getFeed(userId);
    }
};
exports.DiscoveryController = DiscoveryController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], discovery_controller_1.DiscoveryController.prototype, "feed", null);
exports.DiscoveryController = discovery_controller_1.DiscoveryController = __decorate([
    (0, common_1.Controller)('discovery'),
    __metadata("design:paramtypes", [discovery_service_1.DiscoveryService])
], discovery_controller_1.DiscoveryController);
const common_2 = require("@nestjs/common");
const discovery_controller_1 = require("./discovery.controller");
Object.defineProperty(exports, "DiscoveryController", { enumerable: true, get: function () { return discovery_controller_1.DiscoveryController; } });
let DiscoveryModule = class DiscoveryModule {
};
exports.DiscoveryModule = DiscoveryModule;
exports.DiscoveryModule = DiscoveryModule = __decorate([
    (0, common_2.Module)({
        controllers: [discovery_controller_1.DiscoveryController],
        providers: [discovery_service_1.DiscoveryService],
    })
], DiscoveryModule);
const client_1 = require("../../../../../packages/db/generated/client");
const client_2 = require("../../../../../packages/db/generated/client");
const prisma = new client_1.PrismaClient();
class DiscoveryService {
    async getFeed(userId, limit = 20) {
        const currentUser = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                personalProfile: true,
                businessProfile: true,
            },
        });
        if (!currentUser)
            throw new Error('User not found');
        const swipes = await prisma.swipe.findMany({
            where: { senderId: userId },
            select: { receiverId: true },
        });
        const swipedIds = new Set(swipes.map((s) => s.receiverId));
        const candidates = await prisma.user.findMany({
            where: {
                id: {
                    notIn: [userId, ...swipedIds],
                },
                isActive: true,
                isBanned: false,
            },
            include: {
                personalProfile: true,
                businessProfile: {
                    include: {
                        services: true,
                    },
                },
            },
            take: 100,
        });
        const scored = candidates.map((user) => {
            let score = 0;
            if (currentUser.currentMode === client_2.AccountType.PERSONAL) {
                if (user.businessProfile)
                    score += 30;
                if (user.personalProfile)
                    score += 10;
            }
            if (currentUser.currentMode === client_2.AccountType.BUSINESS) {
                if (user.personalProfile)
                    score += 30;
                if (user.businessProfile)
                    score += 10;
            }
            if (user.personalProfile) {
                score += user.personalProfile.skills?.length || 0;
            }
            if (user.businessProfile) {
                score += user.businessProfile.services?.length || 0;
            }
            if (user.lastLoginAt) {
                const hoursAgo = (Date.now() - new Date(user.lastLoginAt).getTime()) /
                    (1000 * 60 * 60);
                if (hoursAgo < 24)
                    score += 20;
                else if (hoursAgo < 72)
                    score += 10;
            }
            return { user, score };
        });
        const sorted = scored
            .sort((a, b) => b.score - a.score)
            .slice(0, limit)
            .map((item) => item.user);
        return sorted;
    }
}
exports.DiscoveryService = DiscoveryService;
//# sourceMappingURL=discovery.service.js.map