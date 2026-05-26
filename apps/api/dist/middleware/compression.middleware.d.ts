import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
export declare class CompressionMiddleware implements NestMiddleware {
    private middleware;
    constructor();
    use(req: Request, res: Response, next: NextFunction): void;
}
