import { EventEmitter2 } from '@nestjs/event-emitter';
import { PrismaService } from '../prisma/prisma.service';
export declare class ChatService {
    private prisma;
    private eventEmitter;
    constructor(prisma: PrismaService, eventEmitter: EventEmitter2);
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
    getMessages(conversationId: string, page?: number, limit?: number): Promise<({
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
    sendMessage(conversationId: string, senderId: string, content: string, type?: 'TEXT' | 'IMAGE' | 'FILE'): Promise<{
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
    markMessageAsSeen(messageId: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        content: string;
        type: string;
        isSeen: boolean;
        userId: string;
        conversationId: string;
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
        content: string;
        type: string;
        isSeen: boolean;
        userId: string;
        conversationId: string;
        senderId: string;
    }>;
}
