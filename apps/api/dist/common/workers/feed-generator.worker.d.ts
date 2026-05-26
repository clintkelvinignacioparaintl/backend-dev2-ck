import { PrismaService } from '../../prisma/prisma.service';
import { RankingService } from '../services/ranking.service';
import { CacheService } from '../../cache/cache.service';
export declare class FeedGeneratorWorker {
    private prisma;
    private ranking;
    private cache;
    constructor(prisma: PrismaService, ranking: RankingService, cache: CacheService);
    generateUserFeed(userId: string): Promise<void>;
    updateRankings(): Promise<void>;
}
