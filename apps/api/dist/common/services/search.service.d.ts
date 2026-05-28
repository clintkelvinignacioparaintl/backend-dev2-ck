import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';
export declare class SearchService {
    private prisma;
    private configService;
    constructor(prisma: PrismaService, configService: ConfigService);
    searchPersonalProfiles(query: string, limit?: number): Promise<({
        user: {
            id: string;
            email: string;
            username: string;
            profileImageUrl: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        firstName: string | null;
        lastName: string | null;
        bio: string | null;
        skills: string[];
        interests: string[];
        location: string | null;
        resumeUrl: string | null;
    })[]>;
    searchBusinessProfiles(query: string, limit?: number): Promise<({
        user: {
            id: string;
            email: string;
            username: string;
            logoUrl: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        location: string | null;
        businessName: string;
        industry: string | null;
        services: string[];
        lookingFor: string[];
        teamSize: number | null;
    })[]>;
    searchUsers(query: string, limit?: number): Promise<{
        id: string;
        email: string;
        username: string;
        name: string | null;
        currentMode: string;
        profileImageUrl: string | null;
        logoUrl: string | null;
    }[]>;
    fullTextSearch(query: string, limit?: number): Promise<{
        personalProfiles: unknown;
        businessProfiles: unknown;
    }>;
}
