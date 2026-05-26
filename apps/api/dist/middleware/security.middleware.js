"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityMiddleware = void 0;
const common_1 = require("@nestjs/common");
const helmet_1 = require("helmet");
let SecurityMiddleware = class SecurityMiddleware {
    use(req, res, next) {
        const cspEnabled = process.env.CSP_ENABLED !== 'false';
        const hstsEnabled = process.env.HSTS_ENABLED !== 'false';
        const helmetConfig = {
            noSniff: true,
            frameguard: { action: 'deny' },
            xssFilter: true,
            referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
        };
        if (cspEnabled) {
            helmetConfig.contentSecurityPolicy = {
                directives: {
                    defaultSrc: ["'self'"],
                    styleSrc: ["'self'", "'unsafe-inline'"],
                    scriptSrc: ["'self'"],
                    imgSrc: ["'self'", 'data:', 'https:'],
                    connectSrc: ["'self'"],
                    fontSrc: ["'self'"],
                    objectSrc: ["'none'"],
                    mediaSrc: ["'self'"],
                    frameSrc: ["'none'"],
                },
            };
        }
        if (hstsEnabled) {
            helmetConfig.hsts = {
                maxAge: parseInt(process.env.HSTS_MAX_AGE || '31536000', 10),
                includeSubDomains: process.env.HSTS_INCLUDE_SUBDOMAINS === 'true',
                preload: process.env.HSTS_PRELOAD === 'true',
            };
        }
        (0, helmet_1.default)(helmetConfig)(req, res, next);
    }
};
exports.SecurityMiddleware = SecurityMiddleware;
exports.SecurityMiddleware = SecurityMiddleware = __decorate([
    (0, common_1.Injectable)()
], SecurityMiddleware);
//# sourceMappingURL=security.middleware.js.map