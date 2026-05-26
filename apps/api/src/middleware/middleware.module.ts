import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { RateLimitMiddleware } from './rate-limit.middleware';
import { CompressionMiddleware } from './compression.middleware';
import { LoggingMiddleware } from './logging.middleware';
import { SecurityMiddleware } from './security.middleware';
import { RequestSizeMiddleware } from './request-size.middleware';
import { CsrfMiddleware } from './csrf.middleware';
import { CacheModule } from '../cache/cache.module';

@Module({
  imports: [CacheModule],
})
export class MiddlewareModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Security middleware - apply first
    consumer.apply(SecurityMiddleware).forRoutes('*');

    // Request size limiting
    consumer.apply(RequestSizeMiddleware).forRoutes('*');

    // CSRF protection (skip for auth routes)
    consumer
      .apply(CsrfMiddleware)
      .exclude('auth/(.*)')
      .forRoutes('*');

    // Logging
    consumer.apply(LoggingMiddleware).forRoutes('*');

    // Compression
    consumer.apply(CompressionMiddleware).forRoutes('*');

    // Rate limiting
    consumer.apply(RateLimitMiddleware).forRoutes('*');
  }
}
