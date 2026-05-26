import { PrismaService } from '../prisma/prisma.service';
import { CacheService } from '../cache/cache.service';
export declare class UserProfileService {
    private prisma;
    private cache;
    constructor(prisma: PrismaService, cache: CacheService);
    getUserProfile(userId: string): Promise<any>;
    createUserProfile(userId: string, data: any): Promise<{
        user: {
            id: string;
            email: string;
            username: string;
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
    }>;
    updateUserProfile(userId: string, data: any): Promise<{
        user: {
            id: string;
            email: string;
            username: string;
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
    }>;
    deleteUserProfile(userId: string): Promise<void>;
    searchProfiles(query: string, page?: number, limit?: number): Promise<{
        profiles: ({
            user: {
                id: string;
                username: string;
                currentMode: string;
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
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    getProfilesByLocation(location: string, page?: number, limit?: number): Promise<{
        profiles: ({
            user: {
                id: string;
                username: string;
                currentMode: string;
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
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    getProfilesBySkill(skill: string, page?: number, limit?: number): Promise<{
        profiles: ({
            user: {
                id: string;
                username: string;
                currentMode: string;
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
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
}
