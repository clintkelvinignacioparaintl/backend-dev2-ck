import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { RateLimitMiddleware } from './rate-limit.middleware';
import { CompressionMiddleware } from './compression.middleware';
import { LoggingMiddleware } from './logging.middleware';
import { CacheModule } from '../cache/cache.module';

@Module({
  imports: [CacheModule],
})
export class MiddlewareModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');

    consumer.apply(CompressionMiddleware).forRoutes('*');

    consumer.apply(RateLimitMiddleware).forRoutes('*');
  }
}
