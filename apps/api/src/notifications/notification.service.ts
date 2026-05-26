import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CacheService } from '../cache/cache.service';

export enum NotificationType {
  MATCH = 'MATCH',
  MESSAGE = 'MESSAGE',
  SWIPE = 'SWIPE',
  PROFILE_VIEW = 'PROFILE_VIEW',
  SYSTEM = 'SYSTEM',
}

export interface CreateNotificationDto {
  userId: string;
  type: NotificationType;
  payload: Record<string, any>;
  isRead?: boolean;
}

@Injectable()
export class NotificationService {
  constructor(
    private prisma: PrismaService,
    private cache: CacheService,
  ) {}

  async create(dto: CreateNotificationDto) {
    const notification = await this.prisma.notification.create({
      data: {
        userId: dto.userId,
        type: dto.type,
        title: dto.payload?.title || 'Notification',
        message: dto.payload?.message || '',
        payload: dto.payload,
        isRead: dto.isRead || false,
      },
    });

    // Invalidate cache for user notifications
    await this.cache.delPattern(`notifications:${dto.userId}:*`);

    return notification;
  }

  async getUserNotifications(userId: string, page = 1, limit = 20) {
    const cacheKey = `notifications:${userId}:${page}:${limit}`;
    const cached = await this.cache.get(cacheKey);

    if (cached) {
      return JSON.parse(cached);
    }

    const skip = (page - 1) * limit;

    const [notifications, total] = await Promise.all([
      this.prisma.notification.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.notification.count({ where: { userId } }),
    ]);

    const result = {
      notifications,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };

    // Cache for 5 minutes
    await this.cache.set(cacheKey, JSON.stringify(result), 300);

    return result;
  }

  async markAsRead(notificationId: string, userId: string) {
    const notification = await this.prisma.notification.updateMany({
      where: {
        id: notificationId,
        userId,
      },
      data: { isRead: true },
    });

    // Invalidate cache
    await this.cache.delPattern(`notifications:${userId}:*`);

    return notification;
  }

  async markAllAsRead(userId: string) {
    await this.prisma.notification.updateMany({
      where: { userId, isRead: false },
      data: { isRead: true },
    });

    // Invalidate cache
    await this.cache.delPattern(`notifications:${userId}:*`);
  }

  async deleteNotification(notificationId: string, userId: string) {
    await this.prisma.notification.deleteMany({
      where: { id: notificationId, userId },
    });

    // Invalidate cache
    await this.cache.delPattern(`notifications:${userId}:*`);
  }

  async getUnreadCount(userId: string) {
    const cacheKey = `notifications:${userId}:unread`;
    const cached = await this.cache.get(cacheKey);

    if (cached) {
      return parseInt(cached);
    }

    const count = await this.prisma.notification.count({
      where: { userId, isRead: false },
    });

    // Cache for 1 minute
    await this.cache.set(cacheKey, count.toString(), 60);

    return count;
  }

  async sendMatchNotification(userId: string, matchedUserId: string) {
    const matchedUser = await this.prisma.user.findUnique({
      where: { id: matchedUserId },
      include: { personalProfile: true },
    });

    if (!matchedUser) return;

    return this.create({
      userId,
      type: NotificationType.MATCH,
      payload: {
        title: 'New Match!',
        message: `You matched with ${matchedUser.personalProfile?.firstName || matchedUser.username}`,
        matchedUserId,
      },
    });
  }

  async sendMessageNotification(
    userId: string,
    conversationId: string,
    senderName: string,
  ) {
    return this.create({
      userId,
      type: NotificationType.MESSAGE,
      payload: {
        title: 'New Message',
        message: `${senderName} sent you a message`,
        conversationId,
      },
    });
  }

  async sendSwipeNotification(userId: string, swiperName: string) {
    return this.create({
      userId,
      type: NotificationType.SWIPE,
      payload: {
        title: 'New Swipe',
        message: `${swiperName} swiped right on you`,
      },
    });
  }

  async sendProfileViewNotification(userId: string, viewerName: string) {
    return this.create({
      userId,
      type: NotificationType.PROFILE_VIEW,
      payload: {
        title: 'Profile View',
        message: `${viewerName} viewed your profile`,
      },
    });
  }
}
