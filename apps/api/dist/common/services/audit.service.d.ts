import { PrismaService } from '../../prisma/prisma.service';
export declare enum AuditAction {
    LOGIN = "login",
    LOGOUT = "logout",
    REGISTER = "register",
    PROFILE_CREATE = "profile_create",
    PROFILE_UPDATE = "profile_update",
    PROFILE_DELETE = "profile_delete",
    MATCH_CREATE = "match_create",
    MATCH_DELETE = "match_delete",
    MESSAGE_SEND = "message_send",
    SWIPE = "swipe",
    ROLE_CHANGE = "role_change",
    ADMIN_ACTION = "admin_action"
}
interface AuditLogData {
    userId: string;
    action: AuditAction;
    resourceType?: string;
    resourceId?: string;
    metadata?: Record<string, any>;
    ipAddress?: string;
    userAgent?: string;
}
export declare class AuditService {
    private prisma;
    constructor(prisma: PrismaService);
    log(data: AuditLogData): Promise<void>;
    logLogin(userId: string, ipAddress?: string, userAgent?: string): Promise<void>;
    logLogout(userId: string, ipAddress?: string, userAgent?: string): Promise<void>;
    logAdminAction(userId: string, action: string, resourceType?: string, resourceId?: string, metadata?: Record<string, any>): Promise<void>;
}
export {};
