import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { RankingService } from '../services/ranking.service';
import { CacheService } from '../../cache/cache.service';

@Injectable()
export class FeedGeneratorWorker {
  constructor(
    private prisma: PrismaService,
    private ranking: RankingService,
    private cache: CacheService,
  ) {}

  async generateUserFeed(userId: string): Promise<void> {
    const cacheKey = `feed:generated:${userId}`;
    const cached = await this.cache.get(cacheKey);

    if (cached) {
      return;
    }

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { personalProfile: true },
    });

    if (!user) return;

    const candidates = await this.prisma.user.findMany({
      where: {
        id: { not: userId },
        isActive: true,
        isBanned: false,
      },
      take: 100,
      select: { id: true },
    });

    const candidateIds = candidates.map((c) => c.id);
    const ranked = await this.ranking.rankUsers(userId, candidateIds);

    const topCandidates = ranked.slice(0, 20);

    await this.cache.set(cacheKey, JSON.stringify(topCandidates), 600);
  }

  async updateRankings(): Promise<void> {
    const users = await this.prisma.user.findMany({
      where: { isActive: true },
      select: { id: true },
      take: 100,
    });

    for (const user of users) {
      await this.generateUserFeed(user.id);
    }
  }
}
