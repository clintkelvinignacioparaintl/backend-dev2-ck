export declare class CreateBusinessProfileDto {
    companyName: string;
    description?: string;
    industry?: string;
    location?: string;
    teamSize?: number;
    website?: string;
    services?: string[];
    companyLogoUrl?: string;
}
export declare class UpdateBusinessProfileDto {
    companyName?: string;
    description?: string;
    industry?: string;
    location?: string;
    teamSize?: number;
    website?: string;
    services?: string[];
    companyLogoUrl?: string;
}
export declare class SearchBusinessProfilesDto {
    query: string;
    page?: number;
    limit?: number;
}
export declare class GetBusinessProfilesByIndustryDto {
    industry: string;
    page?: number;
    limit?: number;
}
export declare class GetBusinessProfilesByLocationDto {
    location: string;
    page?: number;
    limit?: number;
}
export declare class GetBusinessProfilesByTeamSizeDto {
    minSize: number;
    maxSize: number;
    page?: number;
    limit?: number;
}
