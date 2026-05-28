import { Server, Socket } from 'socket.io';
export declare class ChatGateway {
    server: Server;
    joinConversation(client: Socket, conversationId: string): Promise<{
        joined: boolean;
        conversationId: string;
    }>;
    sendMessage(client: Socket, body: {
        conversationId: string;
        senderId: string;
        content: string;
    }): Promise<any>;
}
