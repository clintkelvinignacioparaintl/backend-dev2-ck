import { ChatService } from './chat.service';
export declare class ChatController {
    private readonly chatService;
    constructor(chatService: ChatService);
    getConversation(conversationId: string): Promise<({
        match: {
            id: string;
            createdAt: Date;
            userOneId: string;
            userTwoId: string;
            status: string;
        };
        messages: {
            id: string;
            createdAt: Date;
            content: string;
            type: string;
            isSeen: boolean;
            userId: string;
            conversationId: string;
            senderId: string;
        }[];
    } & {
        id: string;
        matchId: string;
        createdAt: Date;
    }) | null>;
    getConversationByMatchId(matchId: string): Promise<({
        match: {
            id: string;
            createdAt: Date;
            userOneId: string;
            userTwoId: string;
            status: string;
        };
        messages: {
            id: string;
            createdAt: Date;
            content: string;
            type: string;
            isSeen: boolean;
            userId: string;
            conversationId: string;
            senderId: string;
        }[];
    } & {
        id: string;
        matchId: string;
        createdAt: Date;
    }) | null>;
    createConversation(matchId: string): Promise<{
        match: {
            id: string;
            createdAt: Date;
            userOneId: string;
            userTwoId: string;
            status: string;
        };
    } & {
        id: string;
        matchId: string;
        createdAt: Date;
    }>;
    getMessages(conversationId: string, page?: string, limit?: string): Promise<({
        sender: {
            id: string;
            username: string;
            profileImageUrl: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        content: string;
        type: string;
        isSeen: boolean;
        userId: string;
        conversationId: string;
        senderId: string;
    })[]>;
    sendMessage(body: {
        conversationId: string;
        senderId: string;
        content: string;
        type?: 'TEXT' | 'IMAGE' | 'FILE';
    }): Promise<{
        conversation: {
            id: string;
            matchId: string;
            createdAt: Date;
        };
        sender: {
            id: string;
            username: string;
            profileImageUrl: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        content: string;
        type: string;
        isSeen: boolean;
        userId: string;
        conversationId: string;
        senderId: string;
    }>;
    markMessageAsSeen(messageId: string, req: any): Promise<{
        id: string;
        createdAt: Date;
        content: string;
        type: string;
        isSeen: boolean;
        userId: string;
        conversationId: string;
        senderId: string;
    }>;
    markConversationAsSeen(conversationId: string, req: any): Promise<{
        success: boolean;
    }>;
    getUnreadMessageCount(req: any): Promise<{
        unreadCount: number;
    }>;
    deleteMessage(messageId: string, req: any): Promise<{
        id: string;
        createdAt: Date;
        content: string;
        type: string;
        isSeen: boolean;
        userId: string;
        conversationId: string;
        senderId: string;
    }>;
}
