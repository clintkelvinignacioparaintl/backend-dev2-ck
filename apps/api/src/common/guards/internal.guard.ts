import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export const INTERNAL_KEY = 'internal';

@Injectable()
export class InternalGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isInternal = this.reflector.getAllAndOverride<boolean>(INTERNAL_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!isInternal) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const internalKey = request.headers['x-internal-key'] as string;

    if (internalKey !== process.env.INTERNAL_API_KEY) {
      throw new ForbiddenException('Internal API access denied');
    }

    return true;
  }
}

export const Internal = () => SetMetadata(INTERNAL_KEY, true);
