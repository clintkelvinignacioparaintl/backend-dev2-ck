import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CacheService } from '../cache/cache.service';

@Injectable()
export class FeedService {
  constructor(
    private prisma: PrismaService,
    private cache: CacheService,
  ) {}

  async getUserFeed(
    userId: string,
    options: {
      page?: number;
      limit?: number;
      feedType?: 'all' | 'matches' | 'profiles';
    },
  ): Promise<any> {
    const { page = 1, limit = 20, feedType = 'all' } = options;
    const cacheKey = `user-feed:${userId}:${page}:${limit}:${feedType}`;
    const cached = await this.cache.get(cacheKey);

    if (cached) {
      return JSON.parse(cached);
    }

    const skip = (page - 1) * limit;

    let feedItems: any[] = [];

    if (feedType === 'all' || feedType === 'matches') {
      const matches = await this.prisma.match.findMany({
        where: {
          OR: [{ userOneId: userId }, { userTwoId: userId }],
          status: 'ACTIVE',
        },
        include: {
          userOne: {
            include: {
              personalProfile: true,
              businessProfile: true,
            },
          },
          userTwo: {
            include: {
              personalProfile: true,
              businessProfile: true,
            },
          },
          conversations: true,
        },
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip,
      });

      feedItems = feedItems.concat(
        matches.map((match) => ({
          type: 'match',
          data: match,
          timestamp: match.createdAt,
        })),
      );
    }

    if (feedType === 'all' || feedType === 'profiles') {
      const profiles = await this.prisma.personalProfile.findMany({
        where: {
          user: {
            isActive: true,
            isBanned: false,
            id: { not: userId },
          },
        },
        include: {
          user: {
            select: {
              id: true,
              username: true,
              profileImageUrl: true,
              currentMode: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip,
      });

      feedItems = feedItems.concat(
        profiles.map((profile) => ({
          type: 'profile',
          data: profile,
          timestamp: profile.createdAt,
        })),
      );
    }

    feedItems.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

    const total = await this.prisma.match.count({
      where: {
        OR: [{ userOneId: userId }, { userTwoId: userId }],
        status: 'ACTIVE',
      },
    });

    const result = {
      items: feedItems.slice(0, limit),
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

  async getGlobalFeed(options: {
    page?: number;
    limit?: number;
  }): Promise<any> {
    const { page = 1, limit = 20 } = options;
    const cacheKey = `global-feed:${page}:${limit}`;
    const cached = await this.cache.get(cacheKey);

    if (cached) {
      return JSON.parse(cached);
    }

    const skip = (page - 1) * limit;

    const users = await this.prisma.user.findMany({
      where: {
        isActive: true,
        isBanned: false,
      },
      include: {
        personalProfile: true,
        businessProfile: true,
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip,
    });

    const total = await this.prisma.user.count({
      where: {
        isActive: true,
        isBanned: false,
      },
    });

    const result = {
      users,
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

  async getActivityFeed(
    userId: string,
    options: { page?: number; limit?: number },
  ) {
    const { page = 1, limit = 20 } = options;
    const skip = (page - 1) * limit;

    const messages = await this.prisma.message.findMany({
      where: {
        conversation: {
          match: {
            OR: [{ userOneId: userId }, { userTwoId: userId }],
          },
        },
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
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip,
    });

    const total = await this.prisma.message.count({
      where: {
        conversation: {
          match: {
            OR: [{ userOneId: userId }, { userTwoId: userId }],
          },
        },
      },
    });

    return {
      messages,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
