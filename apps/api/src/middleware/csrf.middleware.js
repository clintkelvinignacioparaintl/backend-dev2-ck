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
exports.CsrfMiddleware = void 0;
const common_1 = require("@nestjs/common");
const cache_service_1 = require("../cache/cache.service");
let CsrfMiddleware = class CsrfMiddleware {
    constructor(cache) {
        this.cache = cache;
    }
    async use(req, res, next) {
        if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
            return next();
        }
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            return next();
        }
        if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) {
            const csrfToken = req.headers['x-csrf-token'];
            const sessionToken = req.headers['x-session-token'];
            if (!this.cache.isAvailable()) {
                return next();
            }
            if (!sessionToken) {
                throw new common_1.ForbiddenException('CSRF protection: Session token required');
            }
            if (!csrfToken) {
                throw new common_1.ForbiddenException('CSRF protection: CSRF token required');
            }
            const storedToken = await this.cache.get(`csrf:${sessionToken}`);
            if (!storedToken || storedToken !== csrfToken) {
                throw new common_1.ForbiddenException('CSRF protection: Invalid CSRF token');
            }
        }
        next();
    }
};
exports.CsrfMiddleware = CsrfMiddleware;
exports.CsrfMiddleware = CsrfMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [cache_service_1.CacheService])
], CsrfMiddleware);
//# sourceMappingURL=csrf.middleware.js.map