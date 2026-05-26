"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiddlewareModule = void 0;
const common_1 = require("@nestjs/common");
const rate_limit_middleware_1 = require("./rate-limit.middleware");
const compression_middleware_1 = require("./compression.middleware");
const logging_middleware_1 = require("./logging.middleware");
const security_middleware_1 = require("./security.middleware");
const request_size_middleware_1 = require("./request-size.middleware");
const csrf_middleware_1 = require("./csrf.middleware");
const cache_module_1 = require("../cache/cache.module");
let MiddlewareModule = class MiddlewareModule {
    configure(consumer) {
        consumer.apply(security_middleware_1.SecurityMiddleware).forRoutes('*');
        consumer.apply(request_size_middleware_1.RequestSizeMiddleware).forRoutes('*');
        consumer
            .apply(csrf_middleware_1.CsrfMiddleware)
            .exclude('auth/(.*)')
            .forRoutes('*');
        consumer.apply(logging_middleware_1.LoggingMiddleware).forRoutes('*');
        consumer.apply(compression_middleware_1.CompressionMiddleware).forRoutes('*');
        consumer.apply(rate_limit_middleware_1.RateLimitMiddleware).forRoutes('*');
    }
};
exports.MiddlewareModule = MiddlewareModule;
exports.MiddlewareModule = MiddlewareModule = __decorate([
    (0, common_1.Module)({
        imports: [cache_module_1.CacheModule],
    })
], MiddlewareModule);
//# sourceMappingURL=middleware.module.js.map