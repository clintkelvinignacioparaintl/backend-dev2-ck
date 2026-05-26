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
exports.AbTestingService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let AbTestingService = class AbTestingService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async assignVariant(userId, experimentKey) {
        const hash = this.hashString(`${userId}-${experimentKey}`);
        const variants = await this.getExperimentVariants(experimentKey);
        if (variants.length === 0) {
            return 'control';
        }
        const variantIndex = hash % variants.length;
        const variant = variants[variantIndex];
        await this.recordAssignment(userId, experimentKey, variant);
        return variant;
    }
    async getExperimentVariants(experimentKey) {
        const experiments = {
            'new-ui-design': ['control', 'variant-a', 'variant-b'],
            'pricing-page': ['control', 'variant-a'],
            'onboarding-flow': ['control', 'variant-a', 'variant-b', 'variant-c'],
        };
        return experiments[experimentKey] || ['control'];
    }
    async recordAssignment(userId, experimentKey, variant) {
        console.log(`[A/B Testing] User ${userId} assigned to ${variant} in experiment ${experimentKey}`);
    }
    async trackConversion(userId, experimentKey, variant) {
        console.log(`[A/B Testing] User ${userId} converted in ${experimentKey} with variant ${variant}`);
    }
    async getExperimentStats(experimentKey) {
        return {
            experimentKey,
            variants: await this.getExperimentVariants(experimentKey),
        };
    }
    hashString(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return Math.abs(hash);
    }
};
exports.AbTestingService = AbTestingService;
exports.AbTestingService = AbTestingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AbTestingService);
//# sourceMappingURL=ab-testing.service.js.map