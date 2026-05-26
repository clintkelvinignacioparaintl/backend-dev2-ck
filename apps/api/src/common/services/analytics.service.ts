import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AnalyticsService {
  constructor(private prisma: PrismaService) {}

  async getUserStats(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        personalProfile: true,
        businessProfile: true,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const messagesSent = await this.prisma.message.count({
      where: { userId },
    });

    const matchesReceived = await this.prisma.match.count({
      where: {
        OR: [{ userOneId: userId }, { userTwoId: userId }],
      },
    });

    const swipesGiven = await this.prisma.swipe.count({
      where: { userId },
    });

    const notifications = await this.prisma.notification.count({
      where: { userId },
    });

    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        currentMode: user.currentMode,
        isVerified: user.isVerified,
        createdAt: user.createdAt,
      },
      stats: {
        messagesSent,
        matchesReceived,
        swipesGiven,
        notifications,
      },
    };
  }

  async getGlobalStats() {
    const totalUsers = await this.prisma.user.count();
    const activeUsers = await this.prisma.user.count({
      where: { isActive: true },
    });
    const verifiedUsers = await this.prisma.user.count({
      where: { isVerified: true },
    });
    const totalMessages = await this.prisma.message.count();
    const totalMatches = await this.prisma.match.count();
    const totalSwipes = await this.prisma.swipe.count();

    return {
      totalUsers,
      activeUsers,
      verifiedUsers,
      totalMessages,
      totalMatches,
      totalSwipes,
    };
  }

  async getActivityStats(days: number = 7) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const newUsers = await this.prisma.user.count({
      where: {
        createdAt: {
          gte: startDate,
        },
      },
    });

    const newMessages = await this.prisma.message.count({
      where: {
        createdAt: {
          gte: startDate,
        },
      },
    });

    const newMatches = await this.prisma.match.count({
      where: {
        createdAt: {
          gte: startDate,
        },
      },
    });

    return {
      period: `${days} days`,
      newUsers,
      newMessages,
      newMatches,
    };
  }
}
