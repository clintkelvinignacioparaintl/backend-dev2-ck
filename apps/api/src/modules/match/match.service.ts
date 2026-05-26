import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class MatchService {
  constructor(private prisma: PrismaService) {}

  async checkAndCreateMatch(userAId: string, userBId: string) {
    // normalize order (VERY IMPORTANT)
    const [userOneId, userTwoId] = [userAId, userBId].sort();

    // check if match exists
    const existing = await this.prisma.match.findUnique({
      where: {
        userOneId_userTwoId: {
          userOneId,
          userTwoId,
        },
      },
    });

    if (existing) return existing;

    // check mutual RIGHT swipes
    const [aSwiped, bSwiped] = await Promise.all([
      this.prisma.swipe.findFirst({
        where: {
          userId: userAId,
          targetId: userBId,
          isLike: true,
        },
      }),
      this.prisma.swipe.findFirst({
        where: {
          userId: userBId,
          targetId: userAId,
          isLike: true,
        },
      }),
    ]);

    if (!aSwiped || !bSwiped) return null;

    // create match
    return this.prisma.match.create({
      data: {
        userOneId,
        userTwoId,
      },
    });
  }

  async getUserMatches(userId: string) {
    return this.prisma.match.findMany({
      where: {
        OR: [{ userOneId: userId }, { userTwoId: userId }],
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
    });
  }
}
