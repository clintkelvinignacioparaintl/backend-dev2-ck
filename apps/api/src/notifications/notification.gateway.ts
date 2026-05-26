import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { NotificationService } from './notification.service';

@WebSocketGateway({
  cors: {
    origin: process.env.CORS_ORIGIN?.split(',') || process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
  },
})
export class NotificationGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server!: Server;

  private users: Map<string, string> = new Map(); // userId -> socketId

  constructor(private readonly notificationService: NotificationService) {}

  handleConnection(client: Socket) {
    const userId = client.handshake.query.userId as string;
    if (userId) {
      this.users.set(userId, client.id);
      client.join(`user:${userId}`);
      console.log(`User ${userId} connected for notifications`);
    }
  }

  handleDisconnect(client: Socket) {
    const userId = this.findUserIdBySocketId(client.id);
    if (userId) {
      this.users.delete(userId);
      client.leave(`user:${userId}`);
      console.log(`User ${userId} disconnected from notifications`);
    }
  }

  private findUserIdBySocketId(socketId: string): string | undefined {
    for (const [userId, id] of this.users.entries()) {
      if (id === socketId) return userId;
    }
    return undefined;
  }

  async sendNotificationToUser(userId: string, notification: any) {
    this.server.to(`user:${userId}`).emit('notification', notification);
  }

  async sendNotificationToMultipleUsers(userIds: string[], notification: any) {
    const rooms = userIds.map((id) => `user:${id}`);
    this.server.to(rooms).emit('notification', notification);
  }

  @SubscribeMessage('subscribeToNotifications')
  handleSubscribeToNotifications(client: Socket, userId: string) {
    client.join(`user:${userId}`);
    console.log(`Socket ${client.id} subscribed to notifications for user ${userId}`);
  }

  @SubscribeMessage('unsubscribeFromNotifications')
  handleUnsubscribeFromNotifications(client: Socket, userId: string) {
    client.leave(`user:${userId}`);
    console.log(`Socket ${client.id} unsubscribed from notifications for user ${userId}`);
  }
}
