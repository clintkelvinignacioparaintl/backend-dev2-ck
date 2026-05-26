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
exports.RateLimitMiddleware = void 0;
const common_1 = require("@nestjs/common");
const cache_service_1 = require("../cache/cache.service");
let RateLimitMiddleware = class RateLimitMiddleware {
    constructor(cache) {
        this.cache = cache;
        this.ttl = parseInt(process.env.RATE_LIMIT_TTL || '60', 10);
        this.limit = parseInt(process.env.RATE_LIMIT_LIMIT || '100', 10);
    }
    async use(req, res, next) {
        if (!this.cache.isAvailable()) {
            return next();
        }
        const identifier = this.getIdentifier(req);
        const key = `rate-limit:${identifier}`;
        const current = await this.cache.incr(key);
        if (current === 1) {
            await this.cache.expire(key, this.ttl);
        }
        if (current > this.limit) {
            throw new common_1.ForbiddenException('Rate limit exceeded');
        }
        res.setHeader('X-RateLimit-Limit', this.limit.toString());
        res.setHeader('X-RateLimit-Remaining', Math.max(0, this.limit - current).toString());
        next();
    }
    getIdentifier(req) {
        const userId = req.user
            ?.userId;
        if (userId) {
            return `user:${userId}`;
        }
        const ip = req.ip || req.connection.remoteAddress || 'unknown';
        return `ip:${ip}`;
    }
};
exports.RateLimitMiddleware = RateLimitMiddleware;
exports.RateLimitMiddleware = RateLimitMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [cache_service_1.CacheService])
], RateLimitMiddleware);
//# sourceMappingURL=rate-limit.middleware.js.map