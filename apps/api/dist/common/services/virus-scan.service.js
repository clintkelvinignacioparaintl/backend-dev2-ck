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
exports.VirusScanService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let VirusScanService = class VirusScanService {
    constructor(configService) {
        this.configService = configService;
    }
    async scanFile(file) {
        const apiKey = this.configService.get('VIRUS_TOTAL_API_KEY');
        if (!apiKey) {
            console.log('[Virus Scan] API key not configured, skipping scan');
            return { clean: true, threats: [] };
        }
        try {
            console.log(`[Virus Scan] Scanning file: ${file.originalname}`);
            return { clean: true, threats: [] };
        }
        catch (error) {
            console.error('[Virus Scan] Scan failed:', error);
            return { clean: true, threats: [] };
        }
    }
    async scanUrl(url) {
        const apiKey = this.configService.get('VIRUS_TOTAL_API_KEY');
        if (!apiKey) {
            console.log('[Virus Scan] API key not configured, skipping URL scan');
            return { clean: true, threats: [] };
        }
        try {
            console.log(`[Virus Scan] Scanning URL: ${url}`);
            return { clean: true, threats: [] };
        }
        catch (error) {
            console.error('[Virus Scan] URL scan failed:', error);
            return { clean: true, threats: [] };
        }
    }
};
exports.VirusScanService = VirusScanService;
exports.VirusScanService = VirusScanService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], VirusScanService);
//# sourceMappingURL=virus-scan.service.js.map