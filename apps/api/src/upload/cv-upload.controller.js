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
exports.CvUploadController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const cv_upload_service_1 = require("./cv-upload.service");
let CvUploadController = class CvUploadController {
    constructor(cvUploadService) {
        this.cvUploadService = cvUploadService;
    }
    async uploadCv(req, file) {
        return this.cvUploadService.uploadCv(req.user?.userId || 'anonymous', file);
    }
    async deleteCv(req) {
        return this.cvUploadService.deleteCv(req.user?.userId || 'anonymous');
    }
    async getCv(req) {
        return this.cvUploadService.getCv(req.user?.userId || 'anonymous');
    }
};
exports.CvUploadController = CvUploadController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CvUploadController.prototype, "uploadCv", null);
__decorate([
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CvUploadController.prototype, "deleteCv", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CvUploadController.prototype, "getCv", null);
exports.CvUploadController = CvUploadController = __decorate([
    (0, common_1.Controller)('upload/cv'),
    __metadata("design:paramtypes", [cv_upload_service_1.CvUploadService])
], CvUploadController);
//# sourceMappingURL=cv-upload.controller.js.map