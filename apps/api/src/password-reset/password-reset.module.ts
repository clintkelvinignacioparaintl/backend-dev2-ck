import { Module } from '@nestjs/common';
import { PasswordResetController } from './password-reset.controller';
import { PasswordResetService } from './password-reset.service';
import { PrismaModule } from '../prisma/prisma.module';
import { EmailService } from '../common/services/email.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [PrismaModule, ConfigModule],
  controllers: [PasswordResetController],
  providers: [PasswordResetService, EmailService],
  exports: [PasswordResetService],
})
export class PasswordResetModule {}
