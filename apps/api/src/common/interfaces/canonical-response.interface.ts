export interface CanonicalResponse<T = any> {
  id: string;
  type: string;
  content: T;
  metadata: {
    timestamp: string;
    version: string;
    score?: number;
  };
}

export interface CanonicalListResponse<T = any> {
  items: CanonicalResponse<T>[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  metadata: {
    timestamp: string;
    version: string;
  };
}
