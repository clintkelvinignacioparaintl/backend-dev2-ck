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
exports.DiscoveryController = void 0;
const common_1 = require("@nestjs/common");
const discovery_service_1 = require("./discovery.service");
let DiscoveryController = class DiscoveryController {
    constructor(discoveryService) {
        this.discoveryService = discoveryService;
    }
    async discoverUsers(req, location, skills, interests, accountType, page, limit) {
        return this.discoveryService.discoverUsers(req.user?.userId || 'anonymous', {
            location,
            skills: skills ? skills.split(',') : undefined,
            interests: interests ? interests.split(',') : undefined,
            accountType,
            page: page ? parseInt(page) : 1,
            limit: limit ? parseInt(limit) : 20,
        });
    }
    async getRandomUsers(req, count) {
        return this.discoveryService.getRandomUsers(req.user?.userId || 'anonymous', count ? parseInt(count) : 10);
    }
    async getRecommendedUsers(req, limit) {
        return this.discoveryService.getRecommendedUsers(req.user?.userId || 'anonymous', limit ? parseInt(limit) : 20);
    }
};
exports.DiscoveryController = DiscoveryController;
__decorate([
    (0, common_1.Get)('users'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('location')),
    __param(2, (0, common_1.Query)('skills')),
    __param(3, (0, common_1.Query)('interests')),
    __param(4, (0, common_1.Query)('accountType')),
    __param(5, (0, common_1.Query)('page')),
    __param(6, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], DiscoveryController.prototype, "discoverUsers", null);
__decorate([
    (0, common_1.Get)('random'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('count')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], DiscoveryController.prototype, "getRandomUsers", null);
__decorate([
    (0, common_1.Get)('recommended'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], DiscoveryController.prototype, "getRecommendedUsers", null);
exports.DiscoveryController = DiscoveryController = __decorate([
    (0, common_1.Controller)('discovery'),
    __metadata("design:paramtypes", [discovery_service_1.DiscoveryService])
], DiscoveryController);
//# sourceMappingURL=discovery.controller.js.map