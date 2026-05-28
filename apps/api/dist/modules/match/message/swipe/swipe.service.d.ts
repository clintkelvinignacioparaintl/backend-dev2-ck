import { PrismaService } from '../../prisma/prisma.service';
export declare class SwipeService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getFeed(userId: string): Promise<any>;
    swipe(senderId: string, receiverId: string, type: 'LEFT' | 'RIGHT'): Promise<{
        matched: boolean;
        match?: undefined;
    } | {
        matched: boolean;
        match: any;
    }>;
}
