import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export declare class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    private users;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    private findUserIdBySocketId;
    handleJoinConversation(client: Socket, conversationId: string): void;
    handleLeaveConversation(client: Socket, conversationId: string): void;
    handleSendMessage(client: Socket, payload: {
        conversationId: string;
        message: any;
    }): void;
    handleTyping(client: Socket, payload: {
        conversationId: string;
        userId: string;
    }): void;
    handleStopTyping(client: Socket, payload: {
        conversationId: string;
        userId: string;
    }): void;
}
