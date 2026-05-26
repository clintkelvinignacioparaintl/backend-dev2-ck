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
exports.CacheInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const core_1 = require("@nestjs/core");
const cache_service_1 = require("../../cache/cache.service");
const cache_decorator_1 = require("../decorators/cache.decorator");
let CacheInterceptor = class CacheInterceptor {
    constructor(reflector, cache) {
        this.reflector = reflector;
        this.cache = cache;
    }
    intercept(context, next) {
        const ttl = this.reflector.get(cache_decorator_1.CACHE_TTL_KEY, context.getHandler());
        const keyPrefix = this.reflector.get(cache_decorator_1.CACHE_KEY_PREFIX, context.getHandler());
        if (!ttl || !this.cache.isAvailable()) {
            return next.handle();
        }
        const request = context.switchToHttp().getRequest();
        const cacheKey = this.generateCacheKey(request, keyPrefix);
        return next.handle().pipe((0, operators_1.map)(async (data) => {
            if (data) {
                await this.cache.set(cacheKey, JSON.stringify(data), ttl);
            }
            return data;
        }));
    }
    generateCacheKey(request, prefix) {
        const userId = request.user?.userId || 'anonymous';
        const path = request.route?.path || request.url;
        const query = JSON.stringify(request.query);
        const baseKey = `${userId}:${path}:${query}`;
        return prefix ? `${prefix}:${baseKey}` : baseKey;
    }
};
exports.CacheInterceptor = CacheInterceptor;
exports.CacheInterceptor = CacheInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        cache_service_1.CacheService])
], CacheInterceptor);
//# sourceMappingURL=cache.interceptor.js.map