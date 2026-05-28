import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from '../prisma/prisma.module';
import { EmailService } from '../common/services/email.service';
import { TwoFactorService } from '../common/services/two-factor.service';

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key',
      signOptions: {
        expiresIn: (process.env.JWT_EXPIRATION || '7d') as any,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [JwtStrategy, AuthService, EmailService, TwoFactorService],
  exports: [JwtModule, AuthService],
})
export class AuthModule {}
