import { UserProfileService } from './user-profile.service';
export declare class UserProfileController {
    private readonly userProfileService;
    constructor(userProfileService: UserProfileService);
    getUserProfile(userId: string): Promise<any>;
    createUserProfile(body: any): Promise<{
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
    updateUserProfile(userId: string, body: any): Promise<{
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
    searchProfiles(query: string, page?: string, limit?: string): Promise<{
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
    getProfilesByLocation(location: string, page?: string, limit?: string): Promise<{
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
    getProfilesBySkill(skill: string, page?: string, limit?: string): Promise<{
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
