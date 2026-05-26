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
const match_module_1 = require("./modules/match/match.module");
const cache_module_1 = require("./cache/cache.module");
const prisma_module_1 = require("./prisma/prisma.module");
const notification_module_1 = require("./notifications/notification.module");
const seen_status_module_1 = require("./seen-status/seen-status.module");
const auth_module_1 = require("./auth/auth.module");
const middleware_module_1 = require("./middleware/middleware.module");
const http_exception_filter_1 = require("./common/filters/http-exception.filter");
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
            match_module_1.MatchModule,
            notification_module_1.NotificationModule,
            seen_status_module_1.SeenStatusModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_FILTER,
                useClass: http_exception_filter_1.HttpExceptionFilter,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map