"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const chat_module_1 = require("./chat/chat.module");
const user_profile_module_1 = require("./profiles/user-profile.module");
const business_profile_module_1 = require("./profiles/business-profile.module");
const cv_upload_module_1 = require("./upload/cv-upload.module");
const discovery_module_1 = require("./discovery/discovery.module");
const feed_module_1 = require("./feed/feed.module");
const filtering_module_1 = require("./filtering/filtering.module");
const cache_module_1 = require("./cache/cache.module");
const prisma_module_1 = require("./prisma/prisma.module");
const notification_module_1 = require("./notifications/notification.module");
const seen_status_module_1 = require("./seen-status/seen-status.module");
const auth_module_1 = require("./auth/auth.module");
const middleware_module_1 = require("./middleware/middleware.module");
const email_verification_module_1 = require("./email-verification/email-verification.module");
const password_reset_module_1 = require("./password-reset/password-reset.module");
const two_factor_module_1 = require("./two-factor/two-factor.module");
const search_module_1 = require("./search/search.module");
const analytics_module_1 = require("./analytics/analytics.module");
const http_exception_filter_1 = require("./common/filters/http-exception.filter");
const audit_interceptor_1 = require("./common/interceptors/audit.interceptor");
const audit_service_1 = require("./common/services/audit.service");
const ranking_service_1 = require("./common/services/ranking.service");
const canonical_transformer_service_1 = require("./common/services/canonical-transformer.service");
const feed_generator_worker_1 = require("./common/workers/feed-generator.worker");
const email_service_1 = require("./common/services/email.service");
const two_factor_service_1 = require("./common/services/two-factor.service");
const virus_scan_service_1 = require("./common/services/virus-scan.service");
const image_optimization_service_1 = require("./common/services/image-optimization.service");
const cdn_service_1 = require("./common/services/cdn.service");
const search_service_1 = require("./common/services/search.service");
const analytics_service_1 = require("./common/services/analytics.service");
const ab_testing_service_1 = require("./common/services/ab-testing.service");
const feature_flag_service_1 = require("./common/services/feature-flag.service");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            prisma_module_1.PrismaModule,
            cache_module_1.CacheModule,
            middleware_module_1.MiddlewareModule,
            auth_module_1.AuthModule,
            chat_module_1.ChatModule,
            user_profile_module_1.UserProfileModule,
            business_profile_module_1.BusinessProfileModule,
            cv_upload_module_1.CvUploadModule,
            discovery_module_1.DiscoveryModule,
            feed_module_1.FeedModule,
            filtering_module_1.FilteringModule,
            notification_module_1.NotificationModule,
            seen_status_module_1.SeenStatusModule,
            email_verification_module_1.EmailVerificationModule,
            password_reset_module_1.PasswordResetModule,
            two_factor_module_1.TwoFactorModule,
            search_module_1.SearchModule,
            analytics_module_1.AnalyticsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            audit_service_1.AuditService,
            ranking_service_1.RankingService,
            canonical_transformer_service_1.CanonicalTransformerService,
            feed_generator_worker_1.FeedGeneratorWorker,
            email_service_1.EmailService,
            two_factor_service_1.TwoFactorService,
            virus_scan_service_1.VirusScanService,
            image_optimization_service_1.ImageOptimizationService,
            cdn_service_1.CdnService,
            search_service_1.SearchService,
            analytics_service_1.AnalyticsService,
            ab_testing_service_1.AbTestingService,
            feature_flag_service_1.FeatureFlagService,
            {
                provide: core_1.APP_FILTER,
                useClass: http_exception_filter_1.HttpExceptionFilter,
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: audit_interceptor_1.AuditInterceptor,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map