import { ChatService } from './chat.service';
export declare class ChatController {
    private readonly chatService;
    constructor(chatService: ChatService);
    getConversation(conversationId: string): Promise<({
        messages: {
            id: string;
            createdAt: Date;
            type: string;
            userId: string;
            conversationId: string;
            content: string;
            isSeen: boolean;
            senderId: string;
        }[];
        match: {
            id: string;
            createdAt: Date;
            userOneId: string;
            userTwoId: string;
            status: string;
        };
    } & {
        id: string;
        createdAt: Date;
        matchId: string;
    }) | null>;
    getConversationByMatchId(matchId: string): Promise<({
        messages: {
            id: string;
            createdAt: Date;
            type: string;
            userId: string;
            conversationId: string;
            content: string;
            isSeen: boolean;
            senderId: string;
        }[];
        match: {
            id: string;
            createdAt: Date;
            userOneId: string;
            userTwoId: string;
            status: string;
        };
    } & {
        id: string;
        createdAt: Date;
        matchId: string;
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
        createdAt: Date;
        matchId: string;
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
        type: string;
        userId: string;
        conversationId: string;
        content: string;
        isSeen: boolean;
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
            createdAt: Date;
            matchId: string;
        };
        sender: {
            id: string;
            username: string;
            profileImageUrl: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        type: string;
        userId: string;
        conversationId: string;
        content: string;
        isSeen: boolean;
        senderId: string;
    }>;
    markMessageAsSeen(messageId: string, req: any): Promise<{
        id: string;
        createdAt: Date;
        type: string;
        userId: string;
        conversationId: string;
        content: string;
        isSeen: boolean;
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
        type: string;
        userId: string;
        conversationId: string;
        content: string;
        isSeen: boolean;
        senderId: string;
    }>;
}
