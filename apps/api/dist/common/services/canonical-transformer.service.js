"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanonicalTransformerService = void 0;
const common_1 = require("@nestjs/common");
let CanonicalTransformerService = class CanonicalTransformerService {
    transform(id, type, content, score) {
        return {
            id,
            type,
            content,
            metadata: {
                timestamp: new Date().toISOString(),
                version: '1.0',
                score,
            },
        };
    }
    transformList(items, pagination) {
        return {
            items: items.map((item) => this.transform(item.id, item.type, item.content, item.score)),
            pagination: {
                ...pagination,
                totalPages: Math.ceil(pagination.total / pagination.limit),
            },
            metadata: {
                timestamp: new Date().toISOString(),
                version: '1.0',
            },
        };
    }
    adaptUserProfile(profile) {
        return this.transform(profile.id, 'user_profile', profile);
    }
    adaptBusinessProfile(profile) {
        return this.transform(profile.id, 'business_profile', profile);
    }
    adaptMatch(match) {
        return this.transform(match.id, 'match', match);
    }
    adaptMessage(message) {
        return this.transform(message.id, 'message', message);
    }
};
exports.CanonicalTransformerService = CanonicalTransformerService;
exports.CanonicalTransformerService = CanonicalTransformerService = __decorate([
    (0, common_1.Injectable)()
], CanonicalTransformerService);
//# sourceMappingURL=canonical-transformer.service.js.map