import { PrismaService } from '../prisma/prisma.service';
export declare class ChatService {
    private prisma;
    constructor(prisma: PrismaService);
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
    getMessages(conversationId: string, page?: number, limit?: number): Promise<({
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
    sendMessage(conversationId: string, senderId: string, content: string, type?: 'TEXT' | 'IMAGE' | 'FILE'): Promise<{
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
    markMessageAsSeen(messageId: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        type: string;
        userId: string;
        conversationId: string;
        content: string;
        isSeen: boolean;
        senderId: string;
    }>;
    markConversationAsSeen(conversationId: string, userId: string): Promise<{
        success: boolean;
    }>;
    getUnreadMessageCount(userId: string): Promise<{
        unreadCount: number;
    }>;
    deleteMessage(messageId: string, userId: string): Promise<{
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
