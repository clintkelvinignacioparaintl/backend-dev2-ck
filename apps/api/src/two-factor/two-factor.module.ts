import { Module } from '@nestjs/common';
import { TwoFactorController } from './two-factor.controller';
import { TwoFactorService } from './two-factor.service';
import { PrismaModule } from '../prisma/prisma.module';
import { TwoFactorService as TwoFactorAuthService } from '../common/services/two-factor.service';

@Module({
  imports: [PrismaModule],
  controllers: [TwoFactorController],
  providers: [TwoFactorService, TwoFactorAuthService],
  exports: [TwoFactorService],
})
export class TwoFactorModule {}
