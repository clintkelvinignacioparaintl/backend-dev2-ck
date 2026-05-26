import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server!: Server;

  private users: Map<string, string> = new Map(); // userId -> socketId

  handleConnection(client: Socket) {
    const userId = client.handshake.query.userId as string;
    if (userId) {
      this.users.set(userId, client.id);
      console.log(`User ${userId} connected with socket ${client.id}`);
    }
  }

  handleDisconnect(client: Socket) {
    const userId = this.findUserIdBySocketId(client.id);
    if (userId) {
      this.users.delete(userId);
      console.log(`User ${userId} disconnected`);
    }
  }

  private findUserIdBySocketId(socketId: string): string | undefined {
    for (const [userId, id] of this.users.entries()) {
      if (id === socketId) return userId;
    }
    return undefined;
  }

  @SubscribeMessage('joinConversation')
  handleJoinConversation(client: Socket, conversationId: string) {
    client.join(conversationId);
    console.log(`Socket ${client.id} joined conversation ${conversationId}`);
  }

  @SubscribeMessage('leaveConversation')
  handleLeaveConversation(client: Socket, conversationId: string) {
    client.leave(conversationId);
    console.log(`Socket ${client.id} left conversation ${conversationId}`);
  }

  @SubscribeMessage('sendMessage')
  handleSendMessage(
    client: Socket,
    payload: { conversationId: string; message: any },
  ) {
    this.server.to(payload.conversationId).emit('newMessage', payload.message);
  }

  @SubscribeMessage('typing')
  handleTyping(
    client: Socket,
    payload: { conversationId: string; userId: string },
  ) {
    client.to(payload.conversationId).emit('userTyping', payload.userId);
  }

  @SubscribeMessage('stopTyping')
  handleStopTyping(
    client: Socket,
    payload: { conversationId: string; userId: string },
  ) {
    client.to(payload.conversationId).emit('userStopTyping', payload.userId);
  }
}
