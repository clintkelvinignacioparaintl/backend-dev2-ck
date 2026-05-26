import { Module } from '@nestjs/common';
import { SeenStatusService } from './seen-status.service';
import { SeenStatusGateway } from './seen-status.gateway';
import { CacheModule } from '../cache/cache.module';

@Module({
  imports: [CacheModule],
  providers: [SeenStatusService, SeenStatusGateway],
  exports: [SeenStatusService],
})
export class SeenStatusModule {}
