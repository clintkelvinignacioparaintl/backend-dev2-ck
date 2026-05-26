import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CacheService } from '../../cache/cache.service';

export interface RankingScore {
  userId: string;
  score: number;
  breakdown: {
    engagement: number;
    recency: number;
    relevance: number;
  };
}

@Injectable()
export class RankingService {
  constructor(
    private prisma: PrismaService,
    private cache: CacheService,
  ) {}

  async calculateScore(
    userId: string,
    targetId: string,
  ): Promise<RankingScore> {
    const cacheKey = `ranking:${userId}:${targetId}`;
    const cached = await this.cache.get(cacheKey);

    if (cached) {
      return JSON.parse(cached);
    }

    const engagement = await this.calculateEngagementScore(userId, targetId);
    const recency = await this.calculateRecencyScore(targetId);
    const relevance = await this.calculateRelevanceScore(userId, targetId);

    const score = engagement * 0.4 + recency * 0.3 + relevance * 0.3;

    const result: RankingScore = {
      userId: targetId,
      score,
      breakdown: {
        engagement,
        recency,
        relevance,
      },
    };

    await this.cache.set(cacheKey, JSON.stringify(result), 3600);

    return result;
  }

  private async calculateEngagementScore(
    userId: string,
    targetId: string,
  ): Promise<number> {
    const messages = await this.prisma.message.count({
      where: {
        OR: [
          { userId, conversation: { match: { userOneId: targetId } } },
          { userId, conversation: { match: { userTwoId: targetId } } },
        ],
      },
    });

    const swipe = await this.prisma.swipe.findFirst({
      where: { userId, targetId },
    });

    let score = 0;
    score += Math.min(messages * 10, 50);
    score += swipe?.isLike ? 20 : 0;

    return Math.min(score, 100);
  }

  private async calculateRecencyScore(targetId: string): Promise<number> {
    const user = await this.prisma.user.findUnique({
      where: { id: targetId },
      select: { createdAt: true },
    });

    if (!user) return 0;

    const daysSinceCreation =
      (Date.now() - user.createdAt.getTime()) / (1000 * 60 * 60 * 24);
    const score = Math.max(0, 100 - daysSinceCreation * 2);

    return score;
  }

  private async calculateRelevanceScore(
    userId: string,
    targetId: string,
  ): Promise<number> {
    const userProfiles = await this.prisma.personalProfile.findMany({
      where: { userId: { in: [userId, targetId] } },
      select: { skills: true, interests: true, location: true },
    });

    if (userProfiles.length < 2) return 50;

    const [user1, user2] = userProfiles;
    let score = 50;

    const commonSkills = user1.skills.filter((skill) =>
      user2.skills.includes(skill),
    );
    score += commonSkills.length * 5;

    const commonInterests = user1.interests.filter((interest) =>
      user2.interests.includes(interest),
    );
    score += commonInterests.length * 5;

    if (user1.location === user2.location) {
      score += 20;
    }

    return Math.min(score, 100);
  }

  async rankUsers(userId: string, candidateIds: string[]): Promise<RankingScore[]> {
    const scores = await Promise.all(
      candidateIds.map((id) => this.calculateScore(userId, id)),
    );

    return scores.sort((a, b) => b.score - a.score);
  }
}
