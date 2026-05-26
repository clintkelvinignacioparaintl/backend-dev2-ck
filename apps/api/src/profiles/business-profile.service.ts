import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BusinessProfileService {
  constructor(private prisma: PrismaService) {}

  async getBusinessProfile(userId: string) {
    return this.prisma.businessProfile.findUnique({
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
  }

  async createBusinessProfile(userId: string, data: any) {
    return this.prisma.businessProfile.create({
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

  async updateBusinessProfile(userId: string, data: any) {
    return this.prisma.businessProfile.update({
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
  }

  async deleteBusinessProfile(userId: string) {
    return this.prisma.businessProfile.delete({
      where: { userId },
    });
  }

  async searchBusinessProfiles(
    query: string,
    page: number = 1,
    limit: number = 20,
  ) {
    const skip = (page - 1) * limit;

    const profiles = await this.prisma.businessProfile.findMany({
      where: {
        OR: [
          { businessName: { contains: query, mode: 'insensitive' } },
          { industry: { contains: query, mode: 'insensitive' } },
          { services: { has: query } },
          { lookingFor: { has: query } },
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
            logoUrl: true,
            currentMode: true,
          },
        },
      },
    });

    const total = await this.prisma.businessProfile.count({
      where: {
        OR: [
          { businessName: { contains: query, mode: 'insensitive' } },
          { industry: { contains: query, mode: 'insensitive' } },
          { services: { has: query } },
          { lookingFor: { has: query } },
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

  async getBusinessProfilesByIndustry(
    industry: string,
    page: number = 1,
    limit: number = 20,
  ) {
    const skip = (page - 1) * limit;

    const profiles = await this.prisma.businessProfile.findMany({
      where: {
        industry: { contains: industry, mode: 'insensitive' },
      },
      skip,
      take: limit,
      include: {
        user: {
          select: {
            id: true,
            username: true,
            logoUrl: true,
            currentMode: true,
          },
        },
      },
    });

    const total = await this.prisma.businessProfile.count({
      where: {
        industry: { contains: industry, mode: 'insensitive' },
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

  async getBusinessProfilesByLocation(
    location: string,
    page: number = 1,
    limit: number = 20,
  ) {
    const skip = (page - 1) * limit;

    const profiles = await this.prisma.businessProfile.findMany({
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
            logoUrl: true,
            currentMode: true,
          },
        },
      },
    });

    const total = await this.prisma.businessProfile.count({
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

  async getBusinessProfilesByTeamSize(
    minSize: number,
    maxSize: number,
    page: number = 1,
    limit: number = 20,
  ) {
    const skip = (page - 1) * limit;

    const profiles = await this.prisma.businessProfile.findMany({
      where: {
        teamSize: {
          gte: minSize,
          lte: maxSize,
        },
      },
      skip,
      take: limit,
      include: {
        user: {
          select: {
            id: true,
            username: true,
            logoUrl: true,
            currentMode: true,
          },
        },
      },
    });

    const total = await this.prisma.businessProfile.count({
      where: {
        teamSize: {
          gte: minSize,
          lte: maxSize,
        },
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
