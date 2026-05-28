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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const prisma_service_1 = require("../../../../../../prisma/prisma.service");
const mail_service_1 = require("../../../../../../common/mail/mail.service");
let AuthService = class AuthService {
    constructor(prisma, jwtService, mailService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.mailService = mailService;
    }
    async sendOtp(email) {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpHash = await bcrypt.hash(otp, 10);
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
        await this.prisma.otpVerification.deleteMany({ where: { email } });
        await this.prisma.otpVerification.create({
            data: { email, otpHash, expiresAt },
        });
        await this.mailService.sendOtpEmail(email, otp);
        return { success: true, email, message: 'OTP sent' };
    }
    async register(dto) {
        const existingEmail = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });
        if (existingEmail)
            throw new common_1.ConflictException('Email already in use');
        const existingUsername = await this.prisma.user.findUnique({
            where: { username: dto.username },
        });
        if (existingUsername)
            throw new common_1.ConflictException('Username already taken');
        const otpRecord = await this.prisma.otpVerification.findFirst({
            where: { email: dto.email, verified: false },
            orderBy: { createdAt: 'desc' },
        });
        if (!otpRecord)
            throw new common_1.BadRequestException('OTP not found. Please request a new one');
        if (otpRecord.expiresAt < new Date())
            throw new common_1.BadRequestException('OTP has expired');
        const otpValid = await bcrypt.compare(dto.otpCode, otpRecord.otpHash);
        if (!otpValid)
            throw new common_1.BadRequestException('Invalid OTP');
        await this.prisma.otpVerification.update({
            where: { id: otpRecord.id },
            data: { verified: true },
        });
        const passwordHash = await bcrypt.hash(dto.password, 10);
        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                username: dto.username,
                name: dto.fullname,
                password: passwordHash,
                isVerified: true,
            },
        });
        const payload = { sub: user.id, username: user.username };
        return {
            success: true,
            access_token: await this.jwtService.signAsync(payload),
            user: {
                id: user.id,
                fullname: user.name,
                username: user.username,
                email: user.email,
            },
        };
    }
    async checkUsername(username) {
        const user = await this.prisma.user.findUnique({ where: { username } });
        return { available: !user };
    }
    verifyOtp(dto) {
        return { success: true, dto };
    }
    async login(dto) {
        const user = await this.prisma.user.findUnique({
            where: { username: dto.username },
        });
        if (!user)
            throw new common_1.UnauthorizedException('Invalid credentials');
        const passwordMatch = await bcrypt.compare(dto.password, user.password);
        if (!passwordMatch)
            throw new common_1.UnauthorizedException('Invalid credentials');
        const payload = { sub: user.id, username: user.username };
        return {
            access_token: await this.jwtService.signAsync(payload),
            user: {
                id: user.id,
                fullname: user.name,
                username: user.username,
                email: user.email,
            },
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        mail_service_1.MailService])
], AuthService);
//# sourceMappingURL=auth.service.js.map