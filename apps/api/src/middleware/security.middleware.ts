import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';

@Injectable()
export class SecurityMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const cspEnabled = process.env.CSP_ENABLED !== 'false';
    const hstsEnabled = process.env.HSTS_ENABLED !== 'false';

    const helmetConfig: any = {
      noSniff: true,
      frameguard: { action: 'deny' },
      xssFilter: true,
      referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
    };

    if (cspEnabled) {
      helmetConfig.contentSecurityPolicy = {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          scriptSrc: ["'self'"],
          imgSrc: ["'self'", 'data:', 'https:'],
          connectSrc: ["'self'"],
          fontSrc: ["'self'"],
          objectSrc: ["'none'"],
          mediaSrc: ["'self'"],
          frameSrc: ["'none'"],
        },
      };
    }

    if (hstsEnabled) {
      helmetConfig.hsts = {
        maxAge: parseInt(process.env.HSTS_MAX_AGE || '31536000', 10),
        includeSubDomains: process.env.HSTS_INCLUDE_SUBDOMAINS === 'true',
        preload: process.env.HSTS_PRELOAD === 'true',
      };
    }

    helmet(helmetConfig)(req, res, next);
  }
}
