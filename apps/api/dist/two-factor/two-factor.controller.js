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
exports.TwoFactorController = void 0;
const common_1 = require("@nestjs/common");
const two_factor_service_1 = require("./two-factor.service");
let TwoFactorController = class TwoFactorController {
    constructor(twoFactorService) {
        this.twoFactorService = twoFactorService;
    }
    async enableTwoFactor(req) {
        return this.twoFactorService.enableTwoFactor(req.user.userId);
    }
    async confirmTwoFactor(req, token) {
        return this.twoFactorService.confirmTwoFactor(req.user.userId, token);
    }
    async disableTwoFactor(req, password) {
        return this.twoFactorService.disableTwoFactor(req.user.userId, password);
    }
    async verifyTwoFactorToken(req, token) {
        return this.twoFactorService.verifyTwoFactorToken(req.user.userId, token);
    }
};
exports.TwoFactorController = TwoFactorController;
__decorate([
    (0, common_1.Post)('enable'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TwoFactorController.prototype, "enableTwoFactor", null);
__decorate([
    (0, common_1.Post)('confirm'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], TwoFactorController.prototype, "confirmTwoFactor", null);
__decorate([
    (0, common_1.Post)('disable'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], TwoFactorController.prototype, "disableTwoFactor", null);
__decorate([
    (0, common_1.Post)('verify'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], TwoFactorController.prototype, "verifyTwoFactorToken", null);
exports.TwoFactorController = TwoFactorController = __decorate([
    (0, common_1.Controller)('two-factor'),
    __metadata("design:paramtypes", [two_factor_service_1.TwoFactorService])
], TwoFactorController);
//# sourceMappingURL=two-factor.controller.js.map