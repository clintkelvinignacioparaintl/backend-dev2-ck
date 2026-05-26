import { Injectable, NestMiddleware, BadRequestException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestSizeMiddleware implements NestMiddleware {
  private readonly maxSize: number;

  constructor() {
    // Default max size: 10MB (adjust based on your needs)
    this.maxSize = parseInt(process.env.MAX_REQUEST_SIZE || '10485760', 10);
  }

  use(req: Request, res: Response, next: NextFunction) {
    const contentLength = parseInt(req.headers['content-length'] || '0', 10);

    if (contentLength > this.maxSize) {
      throw new BadRequestException(
        `Request body too large. Maximum size is ${this.maxSize / 1024 / 1024}MB`,
      );
    }

    next();
  }
}
