import { Module } from '@nestjs/common';
import { BusinessProfileService } from './business-profile.service';
import { BusinessProfileController } from './business-profile.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [BusinessProfileService],
  controllers: [BusinessProfileController],
  exports: [BusinessProfileService],
})
export class BusinessProfileModule {}
