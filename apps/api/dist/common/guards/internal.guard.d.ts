import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
export declare const INTERNAL_KEY = "internal";
export declare class InternalGuard implements CanActivate {
    private reflector;
    constructor(reflector: Reflector);
    canActivate(context: ExecutionContext): boolean;
}
export declare const Internal: () => import("@nestjs/common").CustomDecorator<string>;
