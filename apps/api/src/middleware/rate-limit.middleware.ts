import { Injectable, NestMiddleware, ForbiddenException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CacheService } from '../cache/cache.service';

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  private readonly ttl: number;
  private readonly limit: number;

  constructor(private cache: CacheService) {
    this.ttl = parseInt(process.env.RATE_LIMIT_TTL || '60', 10);
    this.limit = parseInt(process.env.RATE_LIMIT_LIMIT || '100', 10);
  }

  async use(req: Request, res: Response, next: NextFunction) {
    if (!this.cache.isAvailable()) {
      return next();
    }

    const identifier = this.getIdentifier(req);
    const key = `rate-limit:${identifier}`;

    const current = await this.cache.incr(key);

    if (current === 1) {
      await this.cache.expire(key, this.ttl);
    }

    if (current > this.limit) {
      throw new ForbiddenException('Rate limit exceeded');
    }

    res.setHeader('X-RateLimit-Limit', this.limit.toString());
    res.setHeader(
      'X-RateLimit-Remaining',
      Math.max(0, this.limit - current).toString(),
    );

    next();
  }

  private getIdentifier(req: Request): string {
    const userId = (req as Request & { user?: { userId: string } }).user
      ?.userId;
    if (userId) {
      return `user:${userId}`;
    }

    const ip = req.ip || req.connection.remoteAddress || 'unknown';
    return `ip:${ip}`;
  }
}
