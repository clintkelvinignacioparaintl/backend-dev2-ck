export declare class FilterUsersDto {
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
}
export declare class FilterMatchesDto {
    status?: 'ACTIVE' | 'BLOCKED' | 'UNMATCHED';
    page?: number;
    limit?: number;
}
export declare class FilterMessagesDto {
    type?: 'TEXT' | 'IMAGE' | 'FILE';
    isSeen?: boolean;
    page?: number;
    limit?: number;
}
