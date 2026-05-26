export declare class CreateUserProfileDto {
    firstName: string;
    lastName: string;
    bio?: string;
    location?: string;
    skills?: string[];
    interests?: string[];
    dateOfBirth?: string;
    profileImageUrl?: string;
}
export declare class UpdateUserProfileDto {
    firstName?: string;
    lastName?: string;
    bio?: string;
    location?: string;
    skills?: string[];
    interests?: string[];
    dateOfBirth?: string;
    profileImageUrl?: string;
}
export declare class SearchProfilesDto {
    query: string;
    page?: number;
    limit?: number;
}
export declare class GetProfilesByLocationDto {
    location: string;
    page?: number;
    limit?: number;
}
export declare class GetProfilesBySkillDto {
    skill: string;
    page?: number;
    limit?: number;
}
