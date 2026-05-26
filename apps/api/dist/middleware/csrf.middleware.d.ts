import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CacheService } from '../cache/cache.service';
export declare class CsrfMiddleware implements NestMiddleware {
    private cache;
    constructor(cache: CacheService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
