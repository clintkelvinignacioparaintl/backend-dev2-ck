import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

export enum AuditAction {
  LOGIN = 'login',
  LOGOUT = 'logout',
  REGISTER = 'register',
  PROFILE_CREATE = 'profile_create',
  PROFILE_UPDATE = 'profile_update',
  PROFILE_DELETE = 'profile_delete',
  MATCH_CREATE = 'match_create',
  MATCH_DELETE = 'match_delete',
  MESSAGE_SEND = 'message_send',
  SWIPE = 'swipe',
  ROLE_CHANGE = 'role_change',
  ADMIN_ACTION = 'admin_action',
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

@Injectable()
export class AuditService {
  constructor(private prisma: PrismaService) {}

  async log(data: AuditLogData): Promise<void> {
    try {
      await this.prisma.auditLog.create({
        data: {
          userId: data.userId,
          action: data.action,
          resourceType: data.resourceType,
          resourceId: data.resourceId,
          metadata: data.metadata || {},
          ipAddress: data.ipAddress,
          userAgent: data.userAgent,
          timestamp: new Date(),
        },
      });
    } catch (error) {
      console.error('Failed to log audit event:', error);
    }
  }

  async logLogin(userId: string, ipAddress?: string, userAgent?: string): Promise<void> {
    await this.log({
      userId,
      action: AuditAction.LOGIN,
      ipAddress,
      userAgent,
    });
  }

  async logLogout(userId: string, ipAddress?: string, userAgent?: string): Promise<void> {
    await this.log({
      userId,
      action: AuditAction.LOGOUT,
      ipAddress,
      userAgent,
    });
  }

  async logAdminAction(
    userId: string,
    action: string,
    resourceType?: string,
    resourceId?: string,
    metadata?: Record<string, any>,
  ): Promise<void> {
    await this.log({
      userId,
      action: AuditAction.ADMIN_ACTION,
      resourceType,
      resourceId,
      metadata: { ...metadata, adminAction: action },
    });
  }
}
