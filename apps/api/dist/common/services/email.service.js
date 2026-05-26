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
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let EmailService = class EmailService {
    constructor(configService) {
        this.configService = configService;
    }
    async sendVerificationEmail(email, token) {
        const verificationUrl = `${this.configService.get('APP_URL')}/auth/verify?token=${token}`;
        console.log(`[Email Service] Sending verification email to ${email}`);
        console.log(`[Email Service] Verification URL: ${verificationUrl}`);
    }
    async sendPasswordResetEmail(email, token) {
        const resetUrl = `${this.configService.get('APP_URL')}/auth/reset-password?token=${token}`;
        console.log(`[Email Service] Sending password reset email to ${email}`);
        console.log(`[Email Service] Reset URL: ${resetUrl}`);
    }
    async sendTwoFactorCode(email, code) {
        console.log(`[Email Service] Sending 2FA code to ${email}: ${code}`);
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], EmailService);
//# sourceMappingURL=email.service.js.map