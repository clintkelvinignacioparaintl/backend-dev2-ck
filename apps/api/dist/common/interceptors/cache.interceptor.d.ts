import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { CacheService } from '../../cache/cache.service';
export declare class CacheInterceptor implements NestInterceptor {
    private reflector;
    private cache;
    constructor(reflector: Reflector, cache: CacheService);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
    private generateCacheKey;
}
