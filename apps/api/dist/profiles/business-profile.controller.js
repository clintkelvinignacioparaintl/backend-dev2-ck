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
exports.BusinessProfileController = void 0;
const common_1 = require("@nestjs/common");
const business_profile_service_1 = require("./business-profile.service");
let BusinessProfileController = class BusinessProfileController {
    constructor(businessProfileService) {
        this.businessProfileService = businessProfileService;
    }
    async getBusinessProfile(userId) {
        return this.businessProfileService.getBusinessProfile(userId);
    }
    async createBusinessProfile(body) {
        return this.businessProfileService.createBusinessProfile(body.userId, body);
    }
    async updateBusinessProfile(userId, body) {
        return this.businessProfileService.updateBusinessProfile(userId, body);
    }
    async deleteBusinessProfile(userId) {
        return this.businessProfileService.deleteBusinessProfile(userId);
    }
    async searchBusinessProfiles(query, page = '1', limit = '20') {
        return this.businessProfileService.searchBusinessProfiles(query, parseInt(page), parseInt(limit));
    }
    async getBusinessProfilesByIndustry(industry, page = '1', limit = '20') {
        return this.businessProfileService.getBusinessProfilesByIndustry(industry, parseInt(page), parseInt(limit));
    }
    async getBusinessProfilesByLocation(location, page = '1', limit = '20') {
        return this.businessProfileService.getBusinessProfilesByLocation(location, parseInt(page), parseInt(limit));
    }
    async getBusinessProfilesByTeamSize(minSize, maxSize, page = '1', limit = '20') {
        return this.businessProfileService.getBusinessProfilesByTeamSize(parseInt(minSize), parseInt(maxSize), parseInt(page), parseInt(limit));
    }
};
exports.BusinessProfileController = BusinessProfileController;
__decorate([
    (0, common_1.Get)(':userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BusinessProfileController.prototype, "getBusinessProfile", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BusinessProfileController.prototype, "createBusinessProfile", null);
__decorate([
    (0, common_1.Put)(':userId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BusinessProfileController.prototype, "updateBusinessProfile", null);
__decorate([
    (0, common_1.Delete)(':userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BusinessProfileController.prototype, "deleteBusinessProfile", null);
__decorate([
    (0, common_1.Get)('search/:query'),
    __param(0, (0, common_1.Param)('query')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], BusinessProfileController.prototype, "searchBusinessProfiles", null);
__decorate([
    (0, common_1.Get)('industry/:industry'),
    __param(0, (0, common_1.Param)('industry')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], BusinessProfileController.prototype, "getBusinessProfilesByIndustry", null);
__decorate([
    (0, common_1.Get)('location/:location'),
    __param(0, (0, common_1.Param)('location')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], BusinessProfileController.prototype, "getBusinessProfilesByLocation", null);
__decorate([
    (0, common_1.Get)('team-size'),
    __param(0, (0, common_1.Query)('minSize')),
    __param(1, (0, common_1.Query)('maxSize')),
    __param(2, (0, common_1.Query)('page')),
    __param(3, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], BusinessProfileController.prototype, "getBusinessProfilesByTeamSize", null);
exports.BusinessProfileController = BusinessProfileController = __decorate([
    (0, common_1.Controller)('profiles/business'),
    __metadata("design:paramtypes", [business_profile_service_1.BusinessProfileService])
], BusinessProfileController);
//# sourceMappingURL=business-profile.controller.js.map