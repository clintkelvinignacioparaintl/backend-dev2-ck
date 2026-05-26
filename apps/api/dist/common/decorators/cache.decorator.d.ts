export declare const CACHE_TTL_KEY = "cache_ttl";
export declare const CACHE_KEY_PREFIX = "cache_key_prefix";
export declare const Cache: (ttl?: number, keyPrefix?: string) => void;
export declare const CacheTTL: (ttl: number) => import("@nestjs/common").CustomDecorator<string>;
export declare const CacheKeyPrefix: (prefix: string) => import("@nestjs/common").CustomDecorator<string>;
