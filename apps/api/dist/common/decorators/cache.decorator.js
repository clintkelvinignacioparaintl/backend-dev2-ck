"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheKeyPrefix = exports.CacheTTL = exports.Cache = exports.CACHE_KEY_PREFIX = exports.CACHE_TTL_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.CACHE_TTL_KEY = 'cache_ttl';
exports.CACHE_KEY_PREFIX = 'cache_key_prefix';
const Cache = (ttl = 300, keyPrefix) => {
    (0, common_1.SetMetadata)(exports.CACHE_TTL_KEY, ttl);
    if (keyPrefix) {
        (0, common_1.SetMetadata)(exports.CACHE_KEY_PREFIX, keyPrefix);
    }
};
exports.Cache = Cache;
const CacheTTL = (ttl) => (0, common_1.SetMetadata)(exports.CACHE_TTL_KEY, ttl);
exports.CacheTTL = CacheTTL;
const CacheKeyPrefix = (prefix) => (0, common_1.SetMetadata)(exports.CACHE_KEY_PREFIX, prefix);
exports.CacheKeyPrefix = CacheKeyPrefix;
//# sourceMappingURL=cache.decorator.js.map