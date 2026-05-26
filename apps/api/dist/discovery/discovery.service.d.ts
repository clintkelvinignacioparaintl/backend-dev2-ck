import { PrismaService } from '../prisma/prisma.service';
export declare class DiscoveryService {
    private prisma;
    constructor(prisma: PrismaService);
    discoverUsers(userId: string, filters: {
        location?: string;
        skills?: string[];
        interests?: string[];
        accountType?: 'PERSONAL' | 'BUSINESS';
        page?: number;
        limit?: number;
    }): Promise<{
        users: ({
            personalProfile: {
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
            } | null;
            businessProfile: {
                id: string;
                createdAt: Date;
                userId: string;
                location: string | null;
                businessName: string;
                industry: string | null;
                services: string[];
                lookingFor: string[];
                teamSize: number | null;
            } | null;
        } & {
            id: string;
            email: string;
            username: string;
            password: string;
            name: string | null;
            isActive: boolean;
            isBanned: boolean;
            isVerified: boolean;
            currentMode: string;
            profileImageUrl: string | null;
            logoUrl: string | null;
            createdAt: Date;
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    getRandomUsers(userId: string, count?: number): Promise<({
        personalProfile: {
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
        } | null;
        businessProfile: {
            id: string;
            createdAt: Date;
            userId: string;
            location: string | null;
            businessName: string;
            industry: string | null;
            services: string[];
            lookingFor: string[];
            teamSize: number | null;
        } | null;
    } & {
        id: string;
        email: string;
        username: string;
        password: string;
        name: string | null;
        isActive: boolean;
        isBanned: boolean;
        isVerified: boolean;
        currentMode: string;
        profileImageUrl: string | null;
        logoUrl: string | null;
        createdAt: Date;
    })[]>;
    getRecommendedUsers(userId: string, limit?: number): Promise<({
        personalProfile: {
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
        } | null;
        businessProfile: {
            id: string;
            createdAt: Date;
            userId: string;
            location: string | null;
            businessName: string;
            industry: string | null;
            services: string[];
            lookingFor: string[];
            teamSize: number | null;
        } | null;
    } & {
        id: string;
        email: string;
        username: string;
        password: string;
        name: string | null;
        isActive: boolean;
        isBanned: boolean;
        isVerified: boolean;
        currentMode: string;
        profileImageUrl: string | null;
        logoUrl: string | null;
        createdAt: Date;
    })[]>;
}
