import { SearchService } from '../common/services/search.service';
export declare class SearchController {
    private readonly searchService;
    constructor(searchService: SearchService);
    searchPersonalProfiles(query: string, limit?: string): Promise<({
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
    searchBusinessProfiles(query: string, limit?: string): Promise<({
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
    searchUsers(query: string, limit?: string): Promise<{
        id: string;
        email: string;
        username: string;
        name: string | null;
        currentMode: string;
        profileImageUrl: string | null;
        logoUrl: string | null;
    }[]>;
    fullTextSearch(query: string, limit?: string): Promise<{
        personalProfiles: unknown;
        businessProfiles: unknown;
    }>;
}
