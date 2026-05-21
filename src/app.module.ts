import { Module } from '@nestjs/common';
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

@Module({
  imports: [
    PrismaModule,
    CacheModule,
    ChatModule,
    UserProfileModule,
    BusinessProfileModule,
    CvUploadModule,
    DiscoveryModule,
    FeedModule,
    FilteringModule,
    MatchModule,
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
