import { PrismaService } from '../../../prisma/prisma.service';
import { RealtimeGateway } from '../../realtime/realtime.gateway';
export declare class MatchService {
    private readonly prisma;
    private readonly realtime;
    constructor(prisma: PrismaService, realtime: RealtimeGateway);
    checkAndCreateMatch(userAId: string, userBId: string): Promise<any>;
}
