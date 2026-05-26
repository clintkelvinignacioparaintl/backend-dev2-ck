import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FilteringService {
  constructor(private prisma: PrismaService) {}

  async filterUsers(filters: {
    accountType?: 'PERSONAL' | 'BUSINESS';
    location?: string;
    skills?: string[];
    interests?: string[];
    industry?: string;
    teamSizeMin?: number;
    teamSizeMax?: number;
    isActive?: boolean;
    isVerified?: boolean;
    page?: number;
    limit?: number;
  }) {
    const {
      accountType,
      location,
      skills,
      interests,
      industry,
      teamSizeMin,
      teamSizeMax,
      isActive,
      isVerified,
      page = 1,
      limit = 20,
    } = filters;
    const skip = (page - 1) * limit;

    const where: any = {
      isActive: isActive !== undefined ? isActive : true,
      isBanned: false,
    };

    if (accountType) {
      where.currentMode = accountType;
    }

    if (isVerified !== undefined) {
      where.isVerified = isVerified;
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

    if (industry) {
      filteredUsers = filteredUsers.filter((user) =>
        user.businessProfile?.industry
          ?.toLowerCase()
          .includes(industry.toLowerCase()),
      );
    }

    if (teamSizeMin !== undefined || teamSizeMax !== undefined) {
      filteredUsers = filteredUsers.filter((user) => {
        const teamSize = user.businessProfile?.teamSize;
        if (teamSize === null || teamSize === undefined) return false;
        if (teamSizeMin !== undefined && teamSize < teamSizeMin) return false;
        if (teamSizeMax !== undefined && teamSize > teamSizeMax) return false;
        return true;
      });
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

  async filterMatches(
    userId: string,
    filters: {
      status?: 'ACTIVE' | 'BLOCKED' | 'UNMATCHED';
      page?: number;
      limit?: number;
    },
  ) {
    const { status, page = 1, limit = 20 } = filters;
    const skip = (page - 1) * limit;

    const where: any = {
      OR: [{ userOneId: userId }, { userTwoId: userId }],
    };

    if (status) {
      where.status = status;
    }

    const matches = await this.prisma.match.findMany({
      where,
      skip,
      take: limit,
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
    });

    const total = await this.prisma.match.count({ where });

    return {
      matches,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async filterMessages(
    conversationId: string,
    filters: {
      type?: 'TEXT' | 'IMAGE' | 'FILE';
      isSeen?: boolean;
      page?: number;
      limit?: number;
    },
  ) {
    const { type, isSeen, page = 1, limit = 20 } = filters;
    const skip = (page - 1) * limit;

    const where: any = { conversationId };

    if (type) {
      where.type = type;
    }

    if (isSeen !== undefined) {
      where.isSeen = isSeen;
    }

    const messages = await this.prisma.message.findMany({
      where,
      skip,
      take: limit,
      include: {
        sender: {
          select: {
            id: true,
            username: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    const total = await this.prisma.message.count({ where });

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
