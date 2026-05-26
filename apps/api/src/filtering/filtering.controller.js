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
exports.FilteringController = void 0;
const common_1 = require("@nestjs/common");
const filtering_service_1 = require("./filtering.service");
let FilteringController = class FilteringController {
    constructor(filteringService) {
        this.filteringService = filteringService;
    }
    async filterUsers(accountType, location, skills, interests, industry, teamSizeMin, teamSizeMax, isActive, isVerified, page, limit) {
        return this.filteringService.filterUsers({
            accountType,
            location,
            skills: skills ? skills.split(',') : undefined,
            interests: interests ? interests.split(',') : undefined,
            industry,
            teamSizeMin: teamSizeMin ? parseInt(teamSizeMin) : undefined,
            teamSizeMax: teamSizeMax ? parseInt(teamSizeMax) : undefined,
            isActive: isActive ? isActive === 'true' : undefined,
            isVerified: isVerified ? isVerified === 'true' : undefined,
            page: page ? parseInt(page) : 1,
            limit: limit ? parseInt(limit) : 20,
        });
    }
    async filterMatches(userId, status, page, limit) {
        return this.filteringService.filterMatches(userId, {
            status,
            page: page ? parseInt(page) : 1,
            limit: limit ? parseInt(limit) : 20,
        });
    }
    async filterMessages(conversationId, type, isSeen, page, limit) {
        return this.filteringService.filterMessages(conversationId, {
            type,
            isSeen: isSeen ? isSeen === 'true' : undefined,
            page: page ? parseInt(page) : 1,
            limit: limit ? parseInt(limit) : 20,
        });
    }
};
exports.FilteringController = FilteringController;
__decorate([
    (0, common_1.Get)('users'),
    __param(0, (0, common_1.Query)('accountType')),
    __param(1, (0, common_1.Query)('location')),
    __param(2, (0, common_1.Query)('skills')),
    __param(3, (0, common_1.Query)('interests')),
    __param(4, (0, common_1.Query)('industry')),
    __param(5, (0, common_1.Query)('teamSizeMin')),
    __param(6, (0, common_1.Query)('teamSizeMax')),
    __param(7, (0, common_1.Query)('isActive')),
    __param(8, (0, common_1.Query)('isVerified')),
    __param(9, (0, common_1.Query)('page')),
    __param(10, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], FilteringController.prototype, "filterUsers", null);
__decorate([
    (0, common_1.Get)('matches/:userId'),
    __param(0, (0, common_1.Query)('userId')),
    __param(1, (0, common_1.Query)('status')),
    __param(2, (0, common_1.Query)('page')),
    __param(3, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], FilteringController.prototype, "filterMatches", null);
__decorate([
    (0, common_1.Get)('messages/:conversationId'),
    __param(0, (0, common_1.Query)('conversationId')),
    __param(1, (0, common_1.Query)('type')),
    __param(2, (0, common_1.Query)('isSeen')),
    __param(3, (0, common_1.Query)('page')),
    __param(4, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], FilteringController.prototype, "filterMessages", null);
exports.FilteringController = FilteringController = __decorate([
    (0, common_1.Controller)('filter'),
    __metadata("design:paramtypes", [filtering_service_1.FilteringService])
], FilteringController);
//# sourceMappingURL=filtering.controller.js.map