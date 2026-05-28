import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthController } from './controllers/controllers/auth.controller';
import { AuthService } from './controllers/services/auth/auth.service';
import { AuthRepository } from './controllers/repositories/auth.repository';

import { MailService } from '../../../common/mail/mail.service';
import { PrismaModule } from '../../../prisma/prisma.module';

@Module({
  imports: [
    ConfigModule,

    JwtModule.registerAsync({
      imports: [ConfigModule],

      inject: [ConfigService],

      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),

        signOptions: {
          expiresIn: '7d',
        },
      }),
    }),

    PrismaModule,
  ],

  controllers: [AuthController],

  providers: [AuthService, AuthRepository, MailService],
})
export class AuthModule {}