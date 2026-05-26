import { MatchService } from './match.service';
export declare class MatchController {
    private readonly matchService;
    constructor(matchService: MatchService);
    checkAndCreateMatch(body: {
        userAId: string;
        userBId: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        userOneId: string;
        userTwoId: string;
        status: string;
    } | null>;
    getUserMatches(userId: string): Promise<({
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
    })[]>;
}
