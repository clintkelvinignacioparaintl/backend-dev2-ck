import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class SearchService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {}

  async searchPersonalProfiles(query: string, limit?: number) {
    const defaultLimit = parseInt(this.configService.get('DEFAULT_SEARCH_LIMIT') || '20', 10);
    const finalLimit = limit || defaultLimit;

    const profiles = await this.prisma.personalProfile.findMany({
      where: {
        OR: [
          { firstName: { contains: query, mode: 'insensitive' } },
          { lastName: { contains: query, mode: 'insensitive' } },
          { bio: { contains: query, mode: 'insensitive' } },
          { location: { contains: query, mode: 'insensitive' } },
          { skills: { has: query } },
          { interests: { has: query } },
        ],
      },
      take: finalLimit,
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
            profileImageUrl: true,
          },
        },
      },
    });

    return profiles;
  }

  async searchBusinessProfiles(query: string, limit?: number) {
    const defaultLimit = parseInt(this.configService.get('DEFAULT_SEARCH_LIMIT') || '20', 10);
    const finalLimit = limit || defaultLimit;

    const profiles = await this.prisma.businessProfile.findMany({
      where: {
        OR: [
          { businessName: { contains: query, mode: 'insensitive' } },
          { industry: { contains: query, mode: 'insensitive' } },
          { location: { contains: query, mode: 'insensitive' } },
          { services: { has: query } },
          { lookingFor: { has: query } },
        ],
      },
      take: finalLimit,
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
            logoUrl: true,
          },
        },
      },
    });

    return profiles;
  }

  async searchUsers(query: string, limit?: number) {
    const defaultLimit = parseInt(this.configService.get('DEFAULT_SEARCH_LIMIT') || '20', 10);
    const finalLimit = limit || defaultLimit;

    const users = await this.prisma.user.findMany({
      where: {
        OR: [
          { username: { contains: query, mode: 'insensitive' } },
          { email: { contains: query, mode: 'insensitive' } },
          { name: { contains: query, mode: 'insensitive' } },
        ],
        isActive: true,
        isBanned: false,
      },
      take: finalLimit,
      select: {
        id: true,
        username: true,
        email: true,
        name: true,
        profileImageUrl: true,
        logoUrl: true,
        currentMode: true,
      },
    });

    return users;
  }

  async fullTextSearch(query: string, limit?: number) {
    const defaultLimit = parseInt(this.configService.get('DEFAULT_SEARCH_LIMIT') || '20', 10);
    const finalLimit = limit || defaultLimit;

    const personalProfiles = await this.prisma.$queryRaw`
      SELECT * FROM "PersonalProfile"
      WHERE to_tsvector('english', COALESCE("firstName", '') || ' ' || COALESCE("lastName", '') || ' ' || COALESCE("bio", '') || ' ' || COALESCE("location", '')) @@ plainto_tsquery('english', ${query})
      LIMIT ${finalLimit}
    `;

    const businessProfiles = await this.prisma.$queryRaw`
      SELECT * FROM "BusinessProfile"
      WHERE to_tsvector('english', COALESCE("businessName", '') || ' ' || COALESCE("industry", '') || ' ' || COALESCE("location", '')) @@ plainto_tsquery('english', ${query})
      LIMIT ${finalLimit}
    `;

    return {
      personalProfiles,
      businessProfiles,
    };
  }
}
