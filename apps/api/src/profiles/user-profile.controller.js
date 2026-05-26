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
exports.UserProfileController = void 0;
const common_1 = require("@nestjs/common");
const user_profile_service_1 = require("./user-profile.service");
let UserProfileController = class UserProfileController {
    constructor(userProfileService) {
        this.userProfileService = userProfileService;
    }
    async getUserProfile(userId) {
        return this.userProfileService.getUserProfile(userId);
    }
    async createUserProfile(body) {
        return this.userProfileService.createUserProfile(body.userId, body);
    }
    async updateUserProfile(userId, body) {
        return this.userProfileService.updateUserProfile(userId, body);
    }
    async deleteUserProfile(userId) {
        return this.userProfileService.deleteUserProfile(userId);
    }
    async searchProfiles(query, page = '1', limit = '20') {
        return this.userProfileService.searchProfiles(query, parseInt(page), parseInt(limit));
    }
    async getProfilesByLocation(location, page = '1', limit = '20') {
        return this.userProfileService.getProfilesByLocation(location, parseInt(page), parseInt(limit));
    }
    async getProfilesBySkill(skill, page = '1', limit = '20') {
        return this.userProfileService.getProfilesBySkill(skill, parseInt(page), parseInt(limit));
    }
};
exports.UserProfileController = UserProfileController;
__decorate([
    (0, common_1.Get)(':userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserProfileController.prototype, "getUserProfile", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserProfileController.prototype, "createUserProfile", null);
__decorate([
    (0, common_1.Put)(':userId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserProfileController.prototype, "updateUserProfile", null);
__decorate([
    (0, common_1.Delete)(':userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserProfileController.prototype, "deleteUserProfile", null);
__decorate([
    (0, common_1.Get)('search/:query'),
    __param(0, (0, common_1.Param)('query')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], UserProfileController.prototype, "searchProfiles", null);
__decorate([
    (0, common_1.Get)('location/:location'),
    __param(0, (0, common_1.Param)('location')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], UserProfileController.prototype, "getProfilesByLocation", null);
__decorate([
    (0, common_1.Get)('skill/:skill'),
    __param(0, (0, common_1.Param)('skill')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], UserProfileController.prototype, "getProfilesBySkill", null);
exports.UserProfileController = UserProfileController = __decorate([
    (0, common_1.Controller)('profiles/users'),
    __metadata("design:paramtypes", [user_profile_service_1.UserProfileService])
], UserProfileController);
//# sourceMappingURL=user-profile.controller.js.map