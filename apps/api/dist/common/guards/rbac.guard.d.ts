import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
export declare enum UserRole {
    GUEST = "guest",
    USER = "user",
    MODERATOR = "moderator",
    ADMIN = "admin"
}
export declare const ROLES_KEY = "roles";
export declare class RbacGuard implements CanActivate {
    private reflector;
    constructor(reflector: Reflector);
    canActivate(context: ExecutionContext): boolean;
}
export declare const Roles: (...roles: UserRole[]) => import("@nestjs/common").CustomDecorator<string>;
