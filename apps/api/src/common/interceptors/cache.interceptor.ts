import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Reflector } from '@nestjs/core';
import { CacheService } from '../../cache/cache.service';
import { CACHE_TTL_KEY, CACHE_KEY_PREFIX } from '../decorators/cache.decorator';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  constructor(
    private reflector: Reflector,
    private cache: CacheService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ttl = this.reflector.get<number>(CACHE_TTL_KEY, context.getHandler());
    const keyPrefix = this.reflector.get<string>(
      CACHE_KEY_PREFIX,
      context.getHandler(),
    );

    if (!ttl || !this.cache.isAvailable()) {
      return next.handle();
    }

    const request = context.switchToHttp().getRequest();
    const cacheKey = this.generateCacheKey(request, keyPrefix);

    return next.handle().pipe(
      map(async (data) => {
        if (data) {
          await this.cache.set(cacheKey, JSON.stringify(data), ttl);
        }
        return data;
      }),
    );
  }

  private generateCacheKey(request: any, prefix?: string): string {
    const userId = request.user?.userId || 'anonymous';
    const path = request.route?.path || request.url;
    const query = JSON.stringify(request.query);
    const baseKey = `${userId}:${path}:${query}`;
    return prefix ? `${prefix}:${baseKey}` : baseKey;
  }
}
