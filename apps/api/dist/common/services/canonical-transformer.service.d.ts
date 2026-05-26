import { CanonicalResponse, CanonicalListResponse } from '../interfaces/canonical-response.interface';
export declare class CanonicalTransformerService {
    transform<T>(id: string, type: string, content: T, score?: number): CanonicalResponse<T>;
    transformList<T>(items: Array<{
        id: string;
        type: string;
        content: T;
        score?: number;
    }>, pagination: {
        page: number;
        limit: number;
        total: number;
    }): CanonicalListResponse<T>;
    adaptUserProfile(profile: any): CanonicalResponse;
    adaptBusinessProfile(profile: any): CanonicalResponse;
    adaptMatch(match: any): CanonicalResponse;
    adaptMessage(message: any): CanonicalResponse;
}
