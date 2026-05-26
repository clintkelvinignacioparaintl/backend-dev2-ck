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
exports.FeatureFlagService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let FeatureFlagService = class FeatureFlagService {
    constructor(configService) {
        this.configService = configService;
        this.flags = new Map();
        this.initializeFlags();
    }
    initializeFlags() {
        this.flags.set('new-dashboard', this.configService.get('FEATURE_FLAG_NEW_DASHBOARD') === 'true');
        this.flags.set('advanced-search', this.configService.get('FEATURE_FLAG_ADVANCED_SEARCH') === 'true');
        this.flags.set('real-time-chat', this.configService.get('FEATURE_FLAG_REAL_TIME_CHAT') === 'true');
        this.flags.set('video-calls', this.configService.get('FEATURE_FLAG_VIDEO_CALLS') === 'true');
        this.flags.set('ai-recommendations', this.configService.get('FEATURE_FLAG_AI_RECOMMENDATIONS') === 'true');
        this.flags.set('dark-mode', this.configService.get('FEATURE_FLAG_DARK_MODE') === 'true');
    }
    isEnabled(flagKey) {
        return this.flags.get(flagKey) || false;
    }
    isDisabled(flagKey) {
        return !this.isEnabled(flagKey);
    }
    setFlag(flagKey, enabled) {
        this.flags.set(flagKey, enabled);
    }
    getAllFlags() {
        return Object.fromEntries(this.flags);
    }
    isUserEnabled(userId, flagKey) {
        return this.isEnabled(flagKey);
    }
    async getUserFlags(userId) {
        return this.getAllFlags();
    }
};
exports.FeatureFlagService = FeatureFlagService;
exports.FeatureFlagService = FeatureFlagService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], FeatureFlagService);
//# sourceMappingURL=feature-flag.service.js.map