export declare class CreateMatchDto {
    userOneId: string;
    userTwoId: string;
}
export declare class UpdateMatchDto {
    status?: 'ACTIVE' | 'BLOCKED' | 'UNMATCHED';
}
export declare class GetMatchesDto {
    status?: 'ACTIVE' | 'BLOCKED' | 'UNMATCHED';
    page?: number;
    limit?: number;
}
