import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CacheService } from '../cache/cache.service';

@Injectable()
export class UserProfileService {
  constructor(
    private prisma: PrismaService,
    private cache: CacheService,
  ) {}

  async getUserProfile(userId: string): Promise<any> {
    const cacheKey = `user-profile:${userId}`;
    const cached = await this.cache.get(cacheKey);

    if (cached) {
      return JSON.parse(cached);
    }

    const profile = await this.prisma.personalProfile.findUnique({
      where: { userId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            username: true,
            currentMode: true,
            isVerified: true,
            isActive: true,
            createdAt: true,
          },
        },
      },
    });

    if (profile) {
      // Cache for 10 minutes
      await this.cache.set(cacheKey, JSON.stringify(profile), 600);
    }

    return profile;
  }

  async createUserProfile(userId: string, data: any) {
    return this.prisma.personalProfile.create({
      data: {
        userId,
        ...data,
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            username: true,
          },
        },
      },
    });
  }

  async updateUserProfile(userId: string, data: any) {
    const profile = await this.prisma.personalProfile.update({
      where: { userId },
      data,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            username: true,
          },
        },
      },
    });

    // Invalidate cache
    await this.cache.del(`user-profile:${userId}`);

    return profile;
  }

  async deleteUserProfile(userId: string) {
    await this.prisma.personalProfile.delete({
      where: { userId },
    });

    // Invalidate cache
    await this.cache.del(`user-profile:${userId}`);
  }

  async searchProfiles(query: string, page: number = 1, limit: number = 20) {
    const skip = (page - 1) * limit;

    const profiles = await this.prisma.personalProfile.findMany({
      where: {
        OR: [
          { firstName: { contains: query, mode: 'insensitive' } },
          { lastName: { contains: query, mode: 'insensitive' } },
          { skills: { has: query } },
          { interests: { has: query } },
          { location: { contains: query, mode: 'insensitive' } },
        ],
      },
      skip,
      take: limit,
      include: {
        user: {
          select: {
            id: true,
            username: true,
            currentMode: true,
          },
        },
      },
    });

    const total = await this.prisma.personalProfile.count({
      where: {
        OR: [
          { firstName: { contains: query, mode: 'insensitive' } },
          { lastName: { contains: query, mode: 'insensitive' } },
          { skills: { has: query } },
          { interests: { has: query } },
          { location: { contains: query, mode: 'insensitive' } },
        ],
      },
    });

    return {
      profiles,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getProfilesByLocation(
    location: string,
    page: number = 1,
    limit: number = 20,
  ) {
    const skip = (page - 1) * limit;

    const profiles = await this.prisma.personalProfile.findMany({
      where: {
        location: { contains: location, mode: 'insensitive' },
      },
      skip,
      take: limit,
      include: {
        user: {
          select: {
            id: true,
            username: true,
            currentMode: true,
          },
        },
      },
    });

    const total = await this.prisma.personalProfile.count({
      where: {
        location: { contains: location, mode: 'insensitive' },
      },
    });

    return {
      profiles,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getProfilesBySkill(
    skill: string,
    page: number = 1,
    limit: number = 20,
  ) {
    const skip = (page - 1) * limit;

    const profiles = await this.prisma.personalProfile.findMany({
      where: {
        skills: { has: skill },
      },
      skip,
      take: limit,
      include: {
        user: {
          select: {
            id: true,
            username: true,
            currentMode: true,
          },
        },
      },
    });

    const total = await this.prisma.personalProfile.count({
      where: {
        skills: { has: skill },
      },
    });

    return {
      profiles,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
