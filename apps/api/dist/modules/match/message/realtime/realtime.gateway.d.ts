import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export declare class RealtimeGateway implements OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    private userSockets;
    private socketUsers;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleRegister(client: Socket, payload: {
        userId: string;
    }): {
        success: boolean;
        socketId: string;
    };
    handleJoinConversation(client: Socket, payload: {
        conversationId: string;
    }): {
        success: boolean;
        room: string;
    };
    handleLeaveConversation(client: Socket, payload: {
        conversationId: string;
    }): {
        success: boolean;
    };
    handleSendMessage(client: Socket, payload: {
        conversationId: string;
        senderId: string;
        receiverId: string;
        message: string;
    }): Promise<{
        success: boolean;
    }>;
    handleTyping(client: Socket, payload: {
        conversationId: string;
        userId: string;
    }): void;
    handleStopTyping(client: Socket, payload: {
        conversationId: string;
        userId: string;
    }): void;
    emitMatch(userId: string, payload: any): void;
    emitToUser(userId: string, event: string, payload: any): void;
    emitToConversation(conversationId: string, event: string, payload: any): void;
    isUserOnline(userId: string): boolean;
}
