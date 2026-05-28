import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SeenStatusService } from './seen-status.service';
export declare class SeenStatusGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly seenStatusService;
    server: Server;
    private userSockets;
    constructor(seenStatusService: SeenStatusService);
    handleBroadcastMessageSeen(data: {
        messageId: string;
        userId: string;
        seenAt: Date;
    }): void;
    handleBroadcastConversationSeen(data: {
        conversationId: string;
        userId: string;
        seenAt: Date;
    }): void;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    private findUserIdBySocketId;
    handleSubscribeToConversation(client: Socket, conversationId: string): void;
    handleUnsubscribeFromConversation(client: Socket, conversationId: string): void;
    handleSubscribeToMessage(client: Socket, messageId: string): void;
    broadcastMessageSeen(data: {
        messageId: string;
        userId: string;
        seenAt: Date;
    }): void;
    broadcastConversationSeen(data: {
        conversationId: string;
        userId: string;
        seenAt: Date;
    }): void;
    broadcastUserTyping(data: {
        conversationId: string;
        userId: string;
    }): void;
    broadcastUserStopTyping(data: {
        conversationId: string;
        userId: string;
    }): void;
}
