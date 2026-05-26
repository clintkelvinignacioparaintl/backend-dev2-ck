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
exports.FeedController = void 0;
const common_1 = require("@nestjs/common");
const feed_service_1 = require("./feed.service");
let FeedController = class FeedController {
    constructor(feedService) {
        this.feedService = feedService;
    }
    async getUserFeed(req, page, limit, feedType) {
        return this.feedService.getUserFeed(req.user?.userId || 'anonymous', {
            page: page ? parseInt(page) : 1,
            limit: limit ? parseInt(limit) : 20,
            feedType,
        });
    }
    async getGlobalFeed(page, limit) {
        return this.feedService.getGlobalFeed({
            page: page ? parseInt(page) : 1,
            limit: limit ? parseInt(limit) : 20,
        });
    }
    async getActivityFeed(req, page, limit) {
        return this.feedService.getActivityFeed(req.user?.userId || 'anonymous', {
            page: page ? parseInt(page) : 1,
            limit: limit ? parseInt(limit) : 20,
        });
    }
};
exports.FeedController = FeedController;
__decorate([
    (0, common_1.Get)('user'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __param(3, (0, common_1.Query)('feedType')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", Promise)
], FeedController.prototype, "getUserFeed", null);
__decorate([
    (0, common_1.Get)('global'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], FeedController.prototype, "getGlobalFeed", null);
__decorate([
    (0, common_1.Get)('activity'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], FeedController.prototype, "getActivityFeed", null);
exports.FeedController = FeedController = __decorate([
    (0, common_1.Controller)('feed'),
    __metadata("design:paramtypes", [feed_service_1.FeedService])
], FeedController);
//# sourceMappingURL=feed.controller.js.map