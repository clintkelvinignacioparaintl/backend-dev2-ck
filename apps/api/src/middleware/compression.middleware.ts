import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as compression from 'compression';

@Injectable()
export class CompressionMiddleware implements NestMiddleware {
  private middleware: any;

  constructor() {
    const enabled = process.env.COMPRESSION_ENABLED !== 'false';
    this.middleware = enabled ? compression() : (req: any, res: any, next: any) => next();
  }

  use(req: Request, res: Response, next: NextFunction) {
    this.middleware(req, res, next);
  }
}
