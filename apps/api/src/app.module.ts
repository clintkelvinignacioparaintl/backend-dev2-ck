import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR, APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import { UserProfileModule } from './profiles/user-profile.module';
import { BusinessProfileModule } from './profiles/business-profile.module';
import { CvUploadModule } from './upload/cv-upload.module';
import { DiscoveryModule } from './discovery/discovery.module';
import { FeedModule } from './feed/feed.module';
import { FilteringModule } from './filtering/filtering.module';
import { MatchModule } from './modules/match/match.module';
import { CacheModule } from './cache/cache.module';
import { PrismaModule } from './prisma/prisma.module';
import { NotificationModule } from './notifications/notification.module';
import { SeenStatusModule } from './seen-status/seen-status.module';
import { AuthModule } from './auth/auth.module';
import { MiddlewareModule } from './middleware/middleware.module';
import { EmailVerificationModule } from './email-verification/email-verification.module';
import { PasswordResetModule } from './password-reset/password-reset.module';
import { TwoFactorModule } from './two-factor/two-factor.module';
import { SearchModule } from './search/search.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { AuditInterceptor } from './common/interceptors/audit.interceptor';
import { AuditService } from './common/services/audit.service';
import { RankingService } from './common/services/ranking.service';
import { CanonicalTransformerService } from './common/services/canonical-transformer.service';
import { FeedGeneratorWorker } from './common/workers/feed-generator.worker';
import { EmailService } from './common/services/email.service';
import { TwoFactorService } from './common/services/two-factor.service';
import { VirusScanService } from './common/services/virus-scan.service';
import { ImageOptimizationService } from './common/services/image-optimization.service';
import { CdnService } from './common/services/cdn.service';
import { SearchService } from './common/services/search.service';
import { AnalyticsService } from './common/services/analytics.service';
import { AbTestingService } from './common/services/ab-testing.service';
import { FeatureFlagService } from './common/services/feature-flag.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    CacheModule,
    MiddlewareModule,
    AuthModule,
    ChatModule,
    UserProfileModule,
    BusinessProfileModule,
    CvUploadModule,
    DiscoveryModule,
    FeedModule,
    FilteringModule,
    MatchModule,
    NotificationModule,
    SeenStatusModule,
    EmailVerificationModule,
    PasswordResetModule,
    TwoFactorModule,
    SearchModule,
    AnalyticsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AuditService,
    RankingService,
    CanonicalTransformerService,
    FeedGeneratorWorker,
    EmailService,
    TwoFactorService,
    VirusScanService,
    ImageOptimizationService,
    CdnService,
    SearchService,
    AnalyticsService,
    AbTestingService,
    FeatureFlagService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: AuditInterceptor,
    },
  ],
})
export class AppModule {}
