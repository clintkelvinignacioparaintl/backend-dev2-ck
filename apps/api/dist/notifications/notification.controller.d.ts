import { NotificationService, CreateNotificationDto } from './notification.service';
export declare class NotificationController {
    private readonly notificationService;
    constructor(notificationService: NotificationService);
    getUserNotifications(userId: string, page?: string, limit?: string): Promise<any>;
    getUnreadCount(userId: string): Promise<{
        count: number;
    }>;
    createNotification(dto: CreateNotificationDto): Promise<{
        message: string;
        id: string;
        createdAt: Date;
        type: string;
        userId: string;
        title: string;
        payload: import("@prisma/client/runtime/library").JsonValue | null;
        isRead: boolean;
    }>;
    markAsRead(notificationId: string, userId: string): Promise<import("@prisma/client").Prisma.BatchPayload>;
    markAllAsRead(userId: string): Promise<{
        success: boolean;
    }>;
    deleteNotification(notificationId: string, userId: string): Promise<{
        success: boolean;
    }>;
    sendMatchNotification(userId: string, matchedUserId: string): Promise<{
        message: string;
        id: string;
        createdAt: Date;
        type: string;
        userId: string;
        title: string;
        payload: import("@prisma/client/runtime/library").JsonValue | null;
        isRead: boolean;
    } | undefined>;
    sendMessageNotification(userId: string, body: {
        conversationId: string;
        senderName: string;
    }): Promise<{
        message: string;
        id: string;
        createdAt: Date;
        type: string;
        userId: string;
        title: string;
        payload: import("@prisma/client/runtime/library").JsonValue | null;
        isRead: boolean;
    }>;
    sendSwipeNotification(userId: string, body: {
        swiperName: string;
    }): Promise<{
        message: string;
        id: string;
        createdAt: Date;
        type: string;
        userId: string;
        title: string;
        payload: import("@prisma/client/runtime/library").JsonValue | null;
        isRead: boolean;
    }>;
    sendProfileViewNotification(userId: string, body: {
        viewerName: string;
    }): Promise<{
        message: string;
        id: string;
        createdAt: Date;
        type: string;
        userId: string;
        title: string;
        payload: import("@prisma/client/runtime/library").JsonValue | null;
        isRead: boolean;
    }>;
}
