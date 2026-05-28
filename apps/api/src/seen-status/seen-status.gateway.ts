import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SeenStatusService } from './seen-status.service';
import { OnEvent } from '@nestjs/event-emitter';

@WebSocketGateway({
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
  },
  namespace: '/seen-status',
})
export class SeenStatusGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server!: Server;

  private userSockets: Map<string, Set<string>> = new Map(); // userId -> Set of socketIds

  constructor(private readonly seenStatusService: SeenStatusService) {}

  @OnEvent('gateway.broadcast.message.seen')
  handleBroadcastMessageSeen(data: {
    messageId: string;
    userId: string;
    seenAt: Date;
  }) {
    this.broadcastMessageSeen(data);
  }

  @OnEvent('gateway.broadcast.conversation.seen')
  handleBroadcastConversationSeen(data: {
    conversationId: string;
    userId: string;
    seenAt: Date;
  }) {
    this.broadcastConversationSeen(data);
  }

  handleConnection(client: Socket) {
    const userId = client.handshake.query.userId as string;
    if (userId) {
      if (!this.userSockets.has(userId)) {
        this.userSockets.set(userId, new Set());
      }
      this.userSockets.get(userId)!.add(client.id);
      console.log(`User ${userId} connected to seen-status with socket ${client.id}`);
    }
  }

  handleDisconnect(client: Socket) {
    const userId = this.findUserIdBySocketId(client.id);
    if (userId) {
      const sockets = this.userSockets.get(userId);
      if (sockets) {
        sockets.delete(client.id);
        if (sockets.size === 0) {
          this.userSockets.delete(userId);
        }
      }
      console.log(`User ${userId} disconnected from seen-status`);
    }
  }

  private findUserIdBySocketId(socketId: string): string | undefined {
    for (const [userId, sockets] of this.userSockets.entries()) {
      if (sockets.has(socketId)) return userId;
    }
    return undefined;
  }

  @SubscribeMessage('subscribeToConversation')
  handleSubscribeToConversation(
    client: Socket,
    conversationId: string,
  ) {
    const room = `conversation:${conversationId}`;
    client.join(room);
    console.log(`Socket ${client.id} subscribed to conversation ${conversationId}`);
  }

  @SubscribeMessage('unsubscribeFromConversation')
  handleUnsubscribeFromConversation(
    client: Socket,
    conversationId: string,
  ) {
    const room = `conversation:${conversationId}`;
    client.leave(room);
    console.log(`Socket ${client.id} unsubscribed from conversation ${conversationId}`);
  }

  @SubscribeMessage('subscribeToMessage')
  handleSubscribeToMessage(client: Socket, messageId: string) {
    const room = `message:${messageId}`;
    client.join(room);
    console.log(`Socket ${client.id} subscribed to message ${messageId}`);
  }

  broadcastMessageSeen(data: {
    messageId: string;
    userId: string;
    seenAt: Date;
  }) {
    const room = `message:${data.messageId}`;
    this.server.to(room).emit('messageSeen', {
      messageId: data.messageId,
      userId: data.userId,
      seenAt: data.seenAt,
    });
  }

  broadcastConversationSeen(data: {
    conversationId: string;
    userId: string;
    seenAt: Date;
  }) {
    const room = `conversation:${data.conversationId}`;
    this.server.to(room).emit('conversationSeen', {
      conversationId: data.conversationId,
      userId: data.userId,
      seenAt: data.seenAt,
    });
  }

  broadcastUserTyping(data: {
    conversationId: string;
    userId: string;
  }) {
    const room = `conversation:${data.conversationId}`;
    this.server.to(room).emit('userTyping', data);
  }

  broadcastUserStopTyping(data: {
    conversationId: string;
    userId: string;
  }) {
    const room = `conversation:${data.conversationId}`;
    this.server.to(room).emit('userStopTyping', data);
  }
}
