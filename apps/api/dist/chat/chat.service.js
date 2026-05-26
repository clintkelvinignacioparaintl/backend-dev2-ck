"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ChatService = class ChatService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getConversation(conversationId) {
        return this.prisma.conversation.findUnique({
            where: { id: conversationId },
            include: {
                messages: {
                    orderBy: { createdAt: 'asc' },
                },
                match: true,
            },
        });
    }
    async getConversationByMatchId(matchId) {
        return this.prisma.conversation.findFirst({
            where: { matchId },
            include: {
                messages: {
                    orderBy: { createdAt: 'asc' },
                },
                match: true,
            },
        });
    }
    async createConversation(matchId) {
        return this.prisma.conversation.create({
            data: {
                matchId,
            },
            include: {
                match: true,
            },
        });
    }
    async getMessages(conversationId, page = 1, limit = 50) {
        const skip = (page - 1) * limit;
        return this.prisma.message.findMany({
            where: { conversationId },
            orderBy: { createdAt: 'desc' },
            skip,
            take: limit,
            include: {
                sender: {
                    select: {
                        id: true,
                        username: true,
                        profileImageUrl: true,
                    },
                },
            },
        });
    }
    async sendMessage(conversationId, senderId, content, type = 'TEXT') {
        return this.prisma.message.create({
            data: {
                conversationId,
                senderId,
                userId: senderId,
                content,
                type,
            },
            include: {
                sender: {
                    select: {
                        id: true,
                        username: true,
                        profileImageUrl: true,
                    },
                },
                conversation: true,
            },
        });
    }
    async markMessageAsSeen(messageId, userId) {
        const message = await this.prisma.message.findUnique({
            where: { id: messageId },
        });
        if (!message) {
            throw new Error('Message not found');
        }
        if (message.senderId === userId) {
            throw new Error('Cannot mark own message as seen');
        }
        return this.prisma.message.update({
            where: { id: messageId },
            data: { isSeen: true },
        });
    }
    async markConversationAsSeen(conversationId, userId) {
        const conversation = await this.prisma.conversation.findUnique({
            where: { id: conversationId },
            include: {
                match: true,
            },
        });
        if (!conversation) {
            throw new Error('Conversation not found');
        }
        if (conversation.match.userOneId !== userId &&
            conversation.match.userTwoId !== userId) {
            throw new Error('User is not part of this conversation');
        }
        await this.prisma.message.updateMany({
            where: {
                conversationId,
                senderId: { not: userId },
                isSeen: false,
            },
            data: { isSeen: true },
        });
        return { success: true };
    }
    async getUnreadMessageCount(userId) {
        const conversations = await this.prisma.conversation.findMany({
            where: {
                match: {
                    OR: [{ userOneId: userId }, { userTwoId: userId }],
                },
            },
            include: {
                messages: true,
                match: true,
            },
        });
        let unreadCount = 0;
        for (const conversation of conversations) {
            const otherUserId = conversation.match.userOneId === userId
                ? conversation.match.userTwoId
                : conversation.match.userOneId;
            const unreadMessages = conversation.messages.filter((msg) => msg.senderId === otherUserId && !msg.isSeen);
            unreadCount += unreadMessages.length;
        }
        return { unreadCount };
    }
    async deleteMessage(messageId, userId) {
        const message = await this.prisma.message.findUnique({
            where: { id: messageId },
        });
        if (!message) {
            throw new Error('Message not found');
        }
        if (message.senderId !== userId) {
            throw new Error('Cannot delete message from another user');
        }
        return this.prisma.message.delete({
            where: { id: messageId },
        });
    }
};
exports.ChatService = ChatService;
exports.ChatService = ChatService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ChatService);
//# sourceMappingURL=chat.service.js.map