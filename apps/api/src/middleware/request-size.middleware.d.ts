import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
export declare class RequestSizeMiddleware implements NestMiddleware {
    private readonly maxSize;
    constructor();
    use(req: Request, res: Response, next: NextFunction): void;
}
