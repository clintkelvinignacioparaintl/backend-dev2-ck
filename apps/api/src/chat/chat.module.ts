import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { SeenStatusModule } from '../seen-status/seen-status.module';
import { CacheModule } from '../cache/cache.module';
import { SeenStatusListener } from '../events/seen-status.listener';

@Module({
  imports: [PrismaModule, SeenStatusModule, CacheModule],
  providers: [ChatGateway, ChatService, SeenStatusListener],
  controllers: [ChatController],
  exports: [ChatService],
})
export class ChatModule {}
