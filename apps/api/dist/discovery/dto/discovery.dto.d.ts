export declare class DiscoverUsersDto {
    location?: string;
    skills?: string[];
    interests?: string[];
    accountType?: 'PERSONAL' | 'BUSINESS';
    page?: number;
    limit?: number;
}
export declare class GetRandomUsersDto {
    count?: number;
}
export declare class GetRecommendedUsersDto {
    limit?: number;
}
