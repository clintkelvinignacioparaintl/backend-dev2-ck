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
export declare class RankingService {
    private prisma;
    private cache;
    constructor(prisma: PrismaService, cache: CacheService);
    calculateScore(userId: string, targetId: string): Promise<RankingScore>;
    private calculateEngagementScore;
    private calculateRecencyScore;
    private calculateRelevanceScore;
    rankUsers(userId: string, candidateIds: string[]): Promise<RankingScore[]>;
}
