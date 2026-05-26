import { NotificationService, CreateNotificationDto } from './notification.service';
export declare class NotificationController {
    private readonly notificationService;
    constructor(notificationService: NotificationService);
    getUserNotifications(userId: string, page?: string, limit?: string): Promise<any>;
    getUnreadCount(userId: string): Promise<{
        count: number;
    }>;
    createNotification(dto: CreateNotificationDto): Promise<{
        id: string;
        createdAt: Date;
        type: string;
        title: string;
        message: string;
        payload: import("@prisma/client/runtime/library").JsonValue | null;
        isRead: boolean;
        userId: string;
    }>;
    markAsRead(notificationId: string, userId: string): Promise<import("@prisma/client").Prisma.BatchPayload>;
    markAllAsRead(userId: string): Promise<{
        success: boolean;
    }>;
    deleteNotification(notificationId: string, userId: string): Promise<{
        success: boolean;
    }>;
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
    sendMessageNotification(userId: string, body: {
        conversationId: string;
        senderName: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        type: string;
        title: string;
        message: string;
        payload: import("@prisma/client/runtime/library").JsonValue | null;
        isRead: boolean;
        userId: string;
    }>;
    sendSwipeNotification(userId: string, body: {
        swiperName: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        type: string;
        title: string;
        message: string;
        payload: import("@prisma/client/runtime/library").JsonValue | null;
        isRead: boolean;
        userId: string;
    }>;
    sendProfileViewNotification(userId: string, body: {
        viewerName: string;
    }): Promise<{
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
