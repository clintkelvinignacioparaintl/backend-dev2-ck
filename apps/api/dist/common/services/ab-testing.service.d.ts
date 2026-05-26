import { PrismaService } from '../../prisma/prisma.service';
export declare class AbTestingService {
    private prisma;
    constructor(prisma: PrismaService);
    assignVariant(userId: string, experimentKey: string): Promise<string>;
    getExperimentVariants(experimentKey: string): Promise<string[]>;
    recordAssignment(userId: string, experimentKey: string, variant: string): Promise<void>;
    trackConversion(userId: string, experimentKey: string, variant: string): Promise<void>;
    getExperimentStats(experimentKey: string): Promise<any>;
    private hashString;
}
