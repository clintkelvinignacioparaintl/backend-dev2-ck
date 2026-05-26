import { Injectable } from '@nestjs/common';
import {
  CanonicalResponse,
  CanonicalListResponse,
} from '../interfaces/canonical-response.interface';

@Injectable()
export class CanonicalTransformerService {
  transform<T>(
    id: string,
    type: string,
    content: T,
    score?: number,
  ): CanonicalResponse<T> {
    return {
      id,
      type,
      content,
      metadata: {
        timestamp: new Date().toISOString(),
        version: '1.0',
        score,
      },
    };
  }

  transformList<T>(
    items: Array<{ id: string; type: string; content: T; score?: number }>,
    pagination: { page: number; limit: number; total: number },
  ): CanonicalListResponse<T> {
    return {
      items: items.map((item) =>
        this.transform(item.id, item.type, item.content, item.score),
      ),
      pagination: {
        ...pagination,
        totalPages: Math.ceil(pagination.total / pagination.limit),
      },
      metadata: {
        timestamp: new Date().toISOString(),
        version: '1.0',
      },
    };
  }

  adaptUserProfile(profile: any): CanonicalResponse {
    return this.transform(profile.id as string, 'user_profile', profile);
  }

  adaptBusinessProfile(profile: any): CanonicalResponse {
    return this.transform(profile.id as string, 'business_profile', profile);
  }

  adaptMatch(match: any): CanonicalResponse {
    return this.transform(match.id as string, 'match', match);
  }

  adaptMessage(message: any): CanonicalResponse {
    return this.transform(message.id as string, 'message', message);
  }
}
