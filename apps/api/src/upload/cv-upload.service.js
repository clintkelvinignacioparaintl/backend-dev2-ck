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
exports.CvUploadService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const fs_1 = require("fs");
const path_1 = require("path");
let CvUploadService = class CvUploadService {
    constructor(prisma) {
        this.prisma = prisma;
        this.uploadDir = './uploads/cv';
    }
    async uploadCv(userId, file) {
        const fileName = `${userId}-${Date.now()}-${file.originalname}`;
        const filePath = (0, path_1.join)(this.uploadDir, fileName);
        await fs_1.promises.mkdir(this.uploadDir, { recursive: true });
        await fs_1.promises.writeFile(filePath, file.buffer);
        const fileUrl = `/uploads/cv/${fileName}`;
        await this.prisma.personalProfile.update({
            where: { userId },
            data: { resumeUrl: fileUrl },
        });
        return {
            success: true,
            fileUrl,
            fileName,
        };
    }
    async deleteCv(userId) {
        const profile = await this.prisma.personalProfile.findUnique({
            where: { userId },
            select: { resumeUrl: true },
        });
        if (!profile || !profile.resumeUrl) {
            throw new Error('No CV found for this user');
        }
        const filePath = (0, path_1.join)('.', profile.resumeUrl);
        try {
            await fs_1.promises.unlink(filePath);
        }
        catch (error) {
            console.error('Error deleting file:', error);
        }
        await this.prisma.personalProfile.update({
            where: { userId },
            data: { resumeUrl: null },
        });
        return {
            success: true,
            message: 'CV deleted successfully',
        };
    }
    async getCv(userId) {
        const profile = await this.prisma.personalProfile.findUnique({
            where: { userId },
            select: { resumeUrl: true },
        });
        if (!profile || !profile.resumeUrl) {
            throw new Error('No CV found for this user');
        }
        return {
            resumeUrl: profile.resumeUrl,
        };
    }
};
exports.CvUploadService = CvUploadService;
exports.CvUploadService = CvUploadService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CvUploadService);
//# sourceMappingURL=cv-upload.service.js.map