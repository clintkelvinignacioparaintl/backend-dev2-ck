import { Injectable, NestMiddleware, ForbiddenException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CacheService } from '../cache/cache.service';

@Injectable()
export class CsrfMiddleware implements NestMiddleware {
  constructor(private cache: CacheService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    // Skip CSRF for GET, HEAD, OPTIONS requests
    if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
      return next();
    }

    // Skip CSRF for authenticated routes with JWT (stateless)
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return next();
    }

    // For state-changing requests without JWT, check CSRF token
    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) {
      const csrfToken = req.headers['x-csrf-token'] as string;
      const sessionToken = req.headers['x-session-token'] as string;

      if (!this.cache.isAvailable()) {
        // If cache is not available, skip CSRF check (fallback mode)
        return next();
      }

      if (!sessionToken) {
        throw new ForbiddenException('CSRF protection: Session token required');
      }

      if (!csrfToken) {
        throw new ForbiddenException('CSRF protection: CSRF token required');
      }

      // Verify CSRF token against session
      const storedToken = await this.cache.get(`csrf:${sessionToken}`);
      if (!storedToken || storedToken !== csrfToken) {
        throw new ForbiddenException('CSRF protection: Invalid CSRF token');
      }
    }

    next();
  }
}
