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
exports.EmailVerificationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const email_service_1 = require("../common/services/email.service");
let EmailVerificationService = class EmailVerificationService {
    constructor(prisma, emailService) {
        this.prisma = prisma;
        this.emailService = emailService;
    }
    async sendVerificationEmail(email) {
        const user = await this.prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            throw new common_1.BadRequestException('User not found');
        }
        if (user.isVerified) {
            throw new common_1.BadRequestException('Email already verified');
        }
        const verificationToken = this.generateToken();
        const verificationTokenExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
        await this.prisma.user.update({
            where: { id: user.id },
            data: {
                verificationToken,
                verificationTokenExpiresAt,
            },
        });
        await this.emailService.sendVerificationEmail(user.email, verificationToken);
        return { message: 'Verification email sent' };
    }
    async verifyEmail(token) {
        const user = await this.prisma.user.findFirst({
            where: {
                verificationToken: token,
                verificationTokenExpiresAt: {
                    gt: new Date(),
                },
            },
        });
        if (!user) {
            throw new common_1.BadRequestException('Invalid or expired verification token');
        }
        await this.prisma.user.update({
            where: { id: user.id },
            data: {
                isVerified: true,
                verificationToken: null,
                verificationTokenExpiresAt: null,
            },
        });
        return { message: 'Email verified successfully' };
    }
    generateToken() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
};
exports.EmailVerificationService = EmailVerificationService;
exports.EmailVerificationService = EmailVerificationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        email_service_1.EmailService])
], EmailVerificationService);
//# sourceMappingURL=email-verification.service.js.map