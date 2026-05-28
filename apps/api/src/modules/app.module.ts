import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { SwipeModule } from './modules/swipe/swipe.module';
import { DiscoveryModule } from './modules/discovery/discovery.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    AuthModule,
    PrismaModule,
    DashboardModule,
    SwipeModule,
    DiscoveryModule,
  ],
})
export class AppModule {}