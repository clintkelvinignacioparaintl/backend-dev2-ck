import { PrismaService } from '../prisma/prisma.service';
export declare class BusinessProfileService {
    private prisma;
    constructor(prisma: PrismaService);
    getBusinessProfile(userId: string): Promise<({
        user: {
            id: string;
            email: string;
            username: string;
            isActive: boolean;
            isVerified: boolean;
            currentMode: string;
            createdAt: Date;
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
    }) | null>;
    createBusinessProfile(userId: string, data: any): Promise<{
        user: {
            id: string;
            email: string;
            username: string;
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
    }>;
    updateBusinessProfile(userId: string, data: any): Promise<{
        user: {
            id: string;
            email: string;
            username: string;
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
    }>;
    deleteBusinessProfile(userId: string): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        location: string | null;
        businessName: string;
        industry: string | null;
        services: string[];
        lookingFor: string[];
        teamSize: number | null;
    }>;
    searchBusinessProfiles(query: string, page?: number, limit?: number): Promise<{
        profiles: ({
            user: {
                id: string;
                username: string;
                currentMode: string;
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
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    getBusinessProfilesByIndustry(industry: string, page?: number, limit?: number): Promise<{
        profiles: ({
            user: {
                id: string;
                username: string;
                currentMode: string;
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
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    getBusinessProfilesByLocation(location: string, page?: number, limit?: number): Promise<{
        profiles: ({
            user: {
                id: string;
                username: string;
                currentMode: string;
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
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    getBusinessProfilesByTeamSize(minSize: number, maxSize: number, page?: number, limit?: number): Promise<{
        profiles: ({
            user: {
                id: string;
                username: string;
                currentMode: string;
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
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
}
