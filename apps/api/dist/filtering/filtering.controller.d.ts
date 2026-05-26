import { FilteringService } from './filtering.service';
export declare class FilteringController {
    private readonly filteringService;
    constructor(filteringService: FilteringService);
    filterUsers(accountType?: 'PERSONAL' | 'BUSINESS', location?: string, skills?: string, interests?: string, industry?: string, teamSizeMin?: string, teamSizeMax?: string, isActive?: string, isVerified?: string, page?: string, limit?: string): Promise<{
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
    filterMatches(userId: string, status?: 'ACTIVE' | 'BLOCKED' | 'UNMATCHED', page?: string, limit?: string): Promise<{
        matches: ({
            userOne: {
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
            };
            userTwo: {
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
            };
            conversations: {
                id: string;
                createdAt: Date;
                matchId: string;
            }[];
        } & {
            id: string;
            createdAt: Date;
            userOneId: string;
            userTwoId: string;
            status: string;
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    filterMessages(conversationId: string, type?: 'TEXT' | 'IMAGE' | 'FILE', isSeen?: string, page?: string, limit?: string): Promise<{
        messages: ({
            sender: {
                id: string;
                username: string;
            };
        } & {
            id: string;
            createdAt: Date;
            userId: string;
            content: string;
            type: string;
            isSeen: boolean;
            conversationId: string;
            senderId: string;
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
}
