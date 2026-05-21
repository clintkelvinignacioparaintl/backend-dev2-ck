import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DiscoveryService {
  constructor(private prisma: PrismaService) {}

  async discoverUsers(
    userId: string,
    filters: {
      location?: string;
      skills?: string[];
      interests?: string[];
      accountType?: 'PERSONAL' | 'BUSINESS';
      page?: number;
      limit?: number;
    },
  ) {
    const {
      location,
      skills,
      interests,
      accountType,
      page = 1,
      limit = 20,
    } = filters;
    const skip = (page - 1) * limit;

    const where: any = {
      id: { not: userId },
      isActive: true,
      isBanned: false,
    };

    if (accountType) {
      where.currentMode = accountType;
    }

    const users = await this.prisma.user.findMany({
      where,
      skip,
      take: limit,
      include: {
        personalProfile: true,
        businessProfile: true,
      },
    });

    let filteredUsers = users;

    if (location) {
      filteredUsers = filteredUsers.filter(
        (user) =>
          user.personalProfile?.location
            ?.toLowerCase()
            .includes(location.toLowerCase()) ||
          user.businessProfile?.location
            ?.toLowerCase()
            .includes(location.toLowerCase()),
      );
    }

    if (skills && skills.length > 0) {
      filteredUsers = filteredUsers.filter((user) =>
        skills.some((skill) => user.personalProfile?.skills?.includes(skill)),
      );
    }

    if (interests && interests.length > 0) {
      filteredUsers = filteredUsers.filter((user) =>
        interests.some((interest) =>
          user.personalProfile?.interests?.includes(interest),
        ),
      );
    }

    const total = await this.prisma.user.count({ where });

    return {
      users: filteredUsers,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getRandomUsers(userId: string, count: number = 10) {
    const users = await this.prisma.user.findMany({
      where: {
        id: { not: userId },
        isActive: true,
        isBanned: false,
      },
      take: count * 2,
      include: {
        personalProfile: true,
        businessProfile: true,
      },
    });

    const shuffled = users.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  async getRecommendedUsers(userId: string, limit: number = 20) {
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

    const userSkills = user.personalProfile?.skills || [];
    const userInterests = user.personalProfile?.interests || [];
    const userLocation =
      user.personalProfile?.location || user.businessProfile?.location;

    const recommendedUsers = await this.prisma.user.findMany({
      where: {
        id: { not: userId },
        isActive: true,
        isBanned: false,
        OR: [
          {
            personalProfile: {
              OR: [
                { skills: { hasSome: userSkills } },
                { interests: { hasSome: userInterests } },
                ...(userLocation
                  ? [
                      {
                        location: {
                          contains: userLocation,
                          mode: 'insensitive' as const,
                        },
                      },
                    ]
                  : []),
              ],
            },
          },
          {
            businessProfile: {
              ...(userLocation
                ? { location: { contains: userLocation, mode: 'insensitive' } }
                : {}),
            },
          },
        ],
      },
      take: limit,
      include: {
        personalProfile: true,
        businessProfile: true,
      },
    });

    return recommendedUsers;
  }
}
