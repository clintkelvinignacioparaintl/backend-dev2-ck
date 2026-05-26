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
exports.ImageOptimizationService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const sharp = require("sharp");
let ImageOptimizationService = class ImageOptimizationService {
    constructor(configService) {
        this.configService = configService;
    }
    async optimizeImage(buffer) {
        const maxSize = parseInt(this.configService.get('MAX_IMAGE_SIZE') || '1920', 10);
        const quality = parseInt(this.configService.get('IMAGE_QUALITY') || '80', 10);
        return sharp(buffer)
            .resize(maxSize, maxSize, {
            fit: 'inside',
            withoutEnlargement: true,
        })
            .jpeg({ quality })
            .toBuffer();
    }
    async generateThumbnail(buffer, size = 300) {
        return sharp(buffer)
            .resize(size, size, {
            fit: 'cover',
        })
            .jpeg({ quality: 70 })
            .toBuffer();
    }
    async getImageMetadata(buffer) {
        const metadata = await sharp(buffer).metadata();
        return {
            width: metadata.width || 0,
            height: metadata.height || 0,
            format: metadata.format || 'unknown',
            size: buffer.length,
        };
    }
    async convertToWebP(buffer) {
        return sharp(buffer)
            .webp({ quality: 80 })
            .toBuffer();
    }
};
exports.ImageOptimizationService = ImageOptimizationService;
exports.ImageOptimizationService = ImageOptimizationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], ImageOptimizationService);
//# sourceMappingURL=image-optimization.service.js.map