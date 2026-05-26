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
exports.TwoFactorService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const two_factor_service_1 = require("../common/services/two-factor.service");
const bcrypt = require("bcrypt");
let TwoFactorService = class TwoFactorService {
    constructor(prisma, twoFactorAuthService) {
        this.prisma = prisma;
        this.twoFactorAuthService = twoFactorAuthService;
    }
    async enableTwoFactor(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new common_1.BadRequestException('User not found');
        }
        if (user.twoFactorEnabled) {
            throw new common_1.BadRequestException('Two-factor authentication already enabled');
        }
        const secret = this.twoFactorAuthService.generateSecret();
        const qrCode = this.twoFactorAuthService.generateQRCode(secret, user.email);
        await this.prisma.user.update({
            where: { id: userId },
            data: {
                twoFactorSecret: secret,
            },
        });
        return { secret, qrCode };
    }
    async confirmTwoFactor(userId, token) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user || !user.twoFactorSecret) {
            throw new common_1.BadRequestException('Two-factor authentication not set up');
        }
        const isValid = this.twoFactorAuthService.verifyToken(user.twoFactorSecret, token);
        if (!isValid) {
            throw new common_1.BadRequestException('Invalid two-factor token');
        }
        await this.prisma.user.update({
            where: { id: userId },
            data: {
                twoFactorEnabled: true,
            },
        });
        return { message: 'Two-factor authentication enabled' };
    }
    async disableTwoFactor(userId, password) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new common_1.BadRequestException('User not found');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid password');
        }
        await this.prisma.user.update({
            where: { id: userId },
            data: {
                twoFactorEnabled: false,
                twoFactorSecret: null,
            },
        });
        return { message: 'Two-factor authentication disabled' };
    }
    async verifyTwoFactorToken(userId, token) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user || !user.twoFactorSecret || !user.twoFactorEnabled) {
            throw new common_1.BadRequestException('Two-factor authentication not enabled');
        }
        const isValid = this.twoFactorAuthService.verifyToken(user.twoFactorSecret, token);
        if (!isValid) {
            throw new common_1.BadRequestException('Invalid two-factor token');
        }
        return { valid: true };
    }
};
exports.TwoFactorService = TwoFactorService;
exports.TwoFactorService = TwoFactorService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        two_factor_service_1.TwoFactorService])
], TwoFactorService);
//# sourceMappingURL=two-factor.service.js.map