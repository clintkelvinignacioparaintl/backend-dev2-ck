import { Module } from '@nestjs/common';
import { FilteringService } from './filtering.service';
import { FilteringController } from './filtering.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [FilteringService],
  controllers: [FilteringController],
  exports: [FilteringService],
})
export class FilteringModule {}
