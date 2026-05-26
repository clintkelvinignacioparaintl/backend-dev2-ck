import { PrismaService } from '../prisma/prisma.service';
export declare class FilteringService {
    private prisma;
    constructor(prisma: PrismaService);
    filterUsers(filters: {
        accountType?: 'PERSONAL' | 'BUSINESS';
        location?: string;
        skills?: string[];
        interests?: string[];
        industry?: string;
        teamSizeMin?: number;
        teamSizeMax?: number;
        isActive?: boolean;
        isVerified?: boolean;
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
    filterMatches(userId: string, filters: {
        status?: 'ACTIVE' | 'BLOCKED' | 'UNMATCHED';
        page?: number;
        limit?: number;
    }): Promise<{
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
    filterMessages(conversationId: string, filters: {
        type?: 'TEXT' | 'IMAGE' | 'FILE';
        isSeen?: boolean;
        page?: number;
        limit?: number;
    }): Promise<{
        messages: ({
            sender: {
                id: string;
                username: string;
            };
        } & {
            id: string;
            createdAt: Date;
            content: string;
            type: string;
            isSeen: boolean;
            userId: string;
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
