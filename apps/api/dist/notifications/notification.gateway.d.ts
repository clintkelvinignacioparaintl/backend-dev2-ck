import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { NotificationService } from './notification.service';
export declare class NotificationGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly notificationService;
    server: Server;
    private users;
    constructor(notificationService: NotificationService);
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    private findUserIdBySocketId;
    sendNotificationToUser(userId: string, notification: any): Promise<void>;
    sendNotificationToMultipleUsers(userIds: string[], notification: any): Promise<void>;
    handleSubscribeToNotifications(client: Socket, userId: string): void;
    handleUnsubscribeFromNotifications(client: Socket, userId: string): void;
}
