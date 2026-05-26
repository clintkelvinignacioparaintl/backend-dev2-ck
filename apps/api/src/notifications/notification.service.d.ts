import { PrismaService } from '../prisma/prisma.service';
import { CacheService } from '../cache/cache.service';
export declare enum NotificationType {
    MATCH = "MATCH",
    MESSAGE = "MESSAGE",
    SWIPE = "SWIPE",
    PROFILE_VIEW = "PROFILE_VIEW",
    SYSTEM = "SYSTEM"
}
export interface CreateNotificationDto {
    userId: string;
    type: NotificationType;
    payload: Record<string, any>;
    isRead?: boolean;
}
export declare class NotificationService {
    private prisma;
    private cache;
    constructor(prisma: PrismaService, cache: CacheService);
    create(dto: CreateNotificationDto): Promise<{
        id: string;
        createdAt: Date;
        type: string;
        title: string;
        message: string;
        payload: import("@prisma/client/runtime/library").JsonValue | null;
        isRead: boolean;
        userId: string;
    }>;
    getUserNotifications(userId: string, page?: number, limit?: number): Promise<any>;
    markAsRead(notificationId: string, userId: string): Promise<import("@prisma/client").Prisma.BatchPayload>;
    markAllAsRead(userId: string): Promise<void>;
    deleteNotification(notificationId: string, userId: string): Promise<void>;
    getUnreadCount(userId: string): Promise<number>;
    sendMatchNotification(userId: string, matchedUserId: string): Promise<{
        id: string;
        createdAt: Date;
        type: string;
        title: string;
        message: string;
        payload: import("@prisma/client/runtime/library").JsonValue | null;
        isRead: boolean;
        userId: string;
    } | undefined>;
    sendMessageNotification(userId: string, conversationId: string, senderName: string): Promise<{
        id: string;
        createdAt: Date;
        type: string;
        title: string;
        message: string;
        payload: import("@prisma/client/runtime/library").JsonValue | null;
        isRead: boolean;
        userId: string;
    }>;
    sendSwipeNotification(userId: string, swiperName: string): Promise<{
        id: string;
        createdAt: Date;
        type: string;
        title: string;
        message: string;
        payload: import("@prisma/client/runtime/library").JsonValue | null;
        isRead: boolean;
        userId: string;
    }>;
    sendProfileViewNotification(userId: string, viewerName: string): Promise<{
        id: string;
        createdAt: Date;
        type: string;
        title: string;
        message: string;
        payload: import("@prisma/client/runtime/library").JsonValue | null;
        isRead: boolean;
        userId: string;
    }>;
}
