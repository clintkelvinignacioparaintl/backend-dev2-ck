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
        message: string;
        id: string;
        createdAt: Date;
        userId: string;
        type: string;
        title: string;
        payload: import("@prisma/client/runtime/library").JsonValue | null;
        isRead: boolean;
    }>;
    getUserNotifications(userId: string, page?: number, limit?: number): Promise<any>;
    markAsRead(notificationId: string, userId: string): Promise<import("@prisma/client").Prisma.BatchPayload>;
    markAllAsRead(userId: string): Promise<void>;
    deleteNotification(notificationId: string, userId: string): Promise<void>;
    getUnreadCount(userId: string): Promise<number>;
    sendMatchNotification(userId: string, matchedUserId: string): Promise<{
        message: string;
        id: string;
        createdAt: Date;
        userId: string;
        type: string;
        title: string;
        payload: import("@prisma/client/runtime/library").JsonValue | null;
        isRead: boolean;
    } | undefined>;
    sendMessageNotification(userId: string, conversationId: string, senderName: string): Promise<{
        message: string;
        id: string;
        createdAt: Date;
        userId: string;
        type: string;
        title: string;
        payload: import("@prisma/client/runtime/library").JsonValue | null;
        isRead: boolean;
    }>;
    sendSwipeNotification(userId: string, swiperName: string): Promise<{
        message: string;
        id: string;
        createdAt: Date;
        userId: string;
        type: string;
        title: string;
        payload: import("@prisma/client/runtime/library").JsonValue | null;
        isRead: boolean;
    }>;
    sendProfileViewNotification(userId: string, viewerName: string): Promise<{
        message: string;
        id: string;
        createdAt: Date;
        userId: string;
        type: string;
        title: string;
        payload: import("@prisma/client/runtime/library").JsonValue | null;
        isRead: boolean;
    }>;
}
