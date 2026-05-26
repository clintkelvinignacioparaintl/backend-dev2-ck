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
            name: string | null;
            id: string;
            email: string;
            username: string;
            password: string;
            isActive: boolean;
            isBanned: boolean;
            isVerified: boolean;
            verificationToken: string | null;
            verificationTokenExpiresAt: Date | null;
            resetPasswordToken: string | null;
            resetPasswordTokenExpiresAt: Date | null;
            twoFactorEnabled: boolean;
            twoFactorSecret: string | null;
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
        name: string | null;
        id: string;
        email: string;
        username: string;
        password: string;
        isActive: boolean;
        isBanned: boolean;
        isVerified: boolean;
        verificationToken: string | null;
        verificationTokenExpiresAt: Date | null;
        resetPasswordToken: string | null;
        resetPasswordTokenExpiresAt: Date | null;
        twoFactorEnabled: boolean;
        twoFactorSecret: string | null;
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
        name: string | null;
        id: string;
        email: string;
        username: string;
        password: string;
        isActive: boolean;
        isBanned: boolean;
        isVerified: boolean;
        verificationToken: string | null;
        verificationTokenExpiresAt: Date | null;
        resetPasswordToken: string | null;
        resetPasswordTokenExpiresAt: Date | null;
        twoFactorEnabled: boolean;
        twoFactorSecret: string | null;
        currentMode: string;
        profileImageUrl: string | null;
        logoUrl: string | null;
        createdAt: Date;
    })[]>;
}
