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
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { AuditInterceptor } from './common/interceptors/audit.interceptor';
import { AuditService } from './common/services/audit.service';
import { RankingService } from './common/services/ranking.service';
import { CanonicalTransformerService } from './common/services/canonical-transformer.service';
import { FeedGeneratorWorker } from './common/workers/feed-generator.worker';

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
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AuditService,
    RankingService,
    CanonicalTransformerService,
    FeedGeneratorWorker,
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
