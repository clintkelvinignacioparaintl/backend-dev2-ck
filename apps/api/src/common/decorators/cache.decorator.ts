import { SetMetadata } from '@nestjs/common';

export const CACHE_TTL_KEY = 'cache_ttl';
export const CACHE_KEY_PREFIX = 'cache_key_prefix';

export const Cache = (ttl: number = 300, keyPrefix?: string) => {
  SetMetadata(CACHE_TTL_KEY, ttl);
  if (keyPrefix) {
    SetMetadata(CACHE_KEY_PREFIX, keyPrefix);
  }
};

export const CacheTTL = (ttl: number) => SetMetadata(CACHE_TTL_KEY, ttl);
export const CacheKeyPrefix = (prefix: string) =>
  SetMetadata(CACHE_KEY_PREFIX, prefix);

