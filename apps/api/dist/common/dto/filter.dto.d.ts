export declare class FilterDto {
    filters?: Record<string, any>;
    sort?: {
        field: string;
        order: 'asc' | 'desc';
    }[];
    pagination?: {
        page: number;
        limit: number;
    };
}
export declare class AdvancedFilterDto {
    accountType?: 'PERSONAL' | 'BUSINESS';
    location?: string;
    skills?: string;
    interests?: string;
    industry?: string;
    teamSizeMin?: number;
    teamSizeMax?: number;
    isActive?: boolean;
    isVerified?: boolean;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}
