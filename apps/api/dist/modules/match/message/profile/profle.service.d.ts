import { PrismaService } from '../../prisma/prisma.service';
export declare class ProfileService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    saveInterests(userId: string, interests: string[]): Promise<void>;
}
