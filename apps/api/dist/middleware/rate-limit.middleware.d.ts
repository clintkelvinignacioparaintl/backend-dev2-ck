import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CacheService } from '../cache/cache.service';
export declare class RateLimitMiddleware implements NestMiddleware {
    private cache;
    private readonly ttl;
    private readonly limit;
    constructor(cache: CacheService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
    private getIdentifier;
}
