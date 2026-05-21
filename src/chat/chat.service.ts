import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  async getConversation(conversationId: string) {
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

  async getConversationByMatchId(matchId: string) {
    return this.prisma.conversation.findUnique({
      where: { matchId },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' },
        },
        match: true,
      },
    });
  }

  async createConversation(matchId: string) {
    return this.prisma.conversation.create({
      data: {
        matchId,
      },
      include: {
        match: true,
      },
    });
  }

  async getMessages(
    conversationId: string,
    page: number = 1,
    limit: number = 50,
  ) {
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

  async sendMessage(
    conversationId: string,
    senderId: string,
    content: string,
    type: 'TEXT' | 'IMAGE' | 'FILE' = 'TEXT',
  ) {
    return this.prisma.message.create({
      data: {
        conversationId,
        senderId,
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

  async markMessageAsSeen(messageId: string, userId: string) {
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

  async markConversationAsSeen(conversationId: string, userId: string) {
    const conversation = await this.prisma.conversation.findUnique({
      where: { id: conversationId },
      include: {
        match: true,
      },
    });

    if (!conversation) {
      throw new Error('Conversation not found');
    }

    if (
      conversation.match.userOneId !== userId &&
      conversation.match.userTwoId !== userId
    ) {
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

  async getUnreadMessageCount(userId: string) {
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
      const otherUserId =
        conversation.match.userOneId === userId
          ? conversation.match.userTwoId
          : conversation.match.userOneId;

      const unreadMessages = conversation.messages.filter(
        (msg) => msg.senderId === otherUserId && !msg.isSeen,
      );

      unreadCount += unreadMessages.length;
    }

    return { unreadCount };
  }

  async deleteMessage(messageId: string, userId: string) {
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
}
