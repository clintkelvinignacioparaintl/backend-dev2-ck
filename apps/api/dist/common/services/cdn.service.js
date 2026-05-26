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
exports.CdnService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
let CdnService = class CdnService {
    constructor(configService) {
        this.configService = configService;
        this.bucketName = this.configService.get('AWS_S3_BUCKET') || '';
        this.cdnUrl = this.configService.get('CDN_URL') || '';
        this.s3Client = new client_s3_1.S3Client({
            region: this.configService.get('AWS_REGION') || 'us-east-1',
            credentials: {
                accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID') || '',
                secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY') || '',
            },
        });
    }
    async uploadFile(key, buffer, contentType) {
        if (!this.bucketName) {
            console.log('[CDN] S3 not configured, skipping upload');
            return '';
        }
        try {
            const command = new client_s3_1.PutObjectCommand({
                Bucket: this.bucketName,
                Key: key,
                Body: buffer,
                ContentType: contentType,
            });
            await this.s3Client.send(command);
            return `${this.cdnUrl}/${key}`;
        }
        catch (error) {
            console.error('[CDN] Upload failed:', error);
            throw error;
        }
    }
    async getSignedUrl(key, expiresIn = 3600) {
        if (!this.bucketName) {
            return '';
        }
        try {
            const command = new client_s3_1.GetObjectCommand({
                Bucket: this.bucketName,
                Key: key,
            });
            return await (0, s3_request_presigner_1.getSignedUrl)(this.s3Client, command, { expiresIn });
        }
        catch (error) {
            console.error('[CDN] Get signed URL failed:', error);
            throw error;
        }
    }
    async deleteFile(key) {
        if (!this.bucketName) {
            return;
        }
        try {
            const command = new client_s3_1.DeleteObjectCommand({
                Bucket: this.bucketName,
                Key: key,
            });
            await this.s3Client.send(command);
        }
        catch (error) {
            console.error('[CDN] Delete failed:', error);
            throw error;
        }
    }
    generateKey(prefix, filename) {
        const timestamp = Date.now();
        const random = Math.random().toString(36).substring(2, 15);
        return `${prefix}/${timestamp}-${random}-${filename}`;
    }
};
exports.CdnService = CdnService;
exports.CdnService = CdnService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], CdnService);
//# sourceMappingURL=cdn.service.js.map