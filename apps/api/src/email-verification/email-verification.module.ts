import { Module } from '@nestjs/common';
import { EmailVerificationController } from './email-verification.controller';
import { EmailVerificationService } from './email-verification.service';
import { PrismaModule } from '../prisma/prisma.module';
import { EmailService } from '../common/services/email.service';

@Module({
  imports: [PrismaModule],
  controllers: [EmailVerificationController],
  providers: [EmailVerificationService, EmailService],
  exports: [EmailVerificationService],
})
export class EmailVerificationModule {}
