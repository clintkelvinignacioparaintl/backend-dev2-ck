"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheService = void 0;
const common_1 = require("@nestjs/common");
const ioredis_1 = require("ioredis");
let CacheService = class CacheService {
    constructor() {
        this.redisAvailable = false;
        this.redis = new ioredis_1.default({
            host: process.env.REDIS_HOST || 'localhost',
            port: parseInt(process.env.REDIS_PORT || '6379'),
            password: process.env.REDIS_PASSWORD || undefined,
            retryStrategy: (times) => {
                if (times > 3) {
                    console.log('Redis connection failed, running without caching');
                    return null;
                }
                return Math.min(times * 100, 3000);
            },
            maxRetriesPerRequest: 3,
        });
        this.redis.on('error', (err) => {
            console.error('Redis error:', err.message);
            this.redisAvailable = false;
        });
        this.redis.on('connect', () => {
            console.log('Redis connected successfully');
            this.redisAvailable = true;
        });
    }
    async onModuleInit() {
        try {
            await this.redis.ping();
            this.redisAvailable = true;
        }
        catch (error) {
            console.log('Redis not available, running without caching');
            this.redisAvailable = false;
        }
    }
    async onModuleDestroy() {
        if (this.redisAvailable) {
            await this.redis.quit();
        }
    }
    async get(key) {
        if (!this.redisAvailable)
            return null;
        try {
            return this.redis.get(key);
        }
        catch (error) {
            return null;
        }
    }
    async set(key, value, ttl) {
        if (!this.redisAvailable)
            return;
        try {
            if (ttl) {
                await this.redis.setex(key, ttl, value);
            }
            else {
                await this.redis.set(key, value);
            }
        }
        catch (error) {
        }
    }
    async del(key) {
        if (!this.redisAvailable)
            return;
        try {
            await this.redis.del(key);
        }
        catch (error) {
        }
    }
    async delPattern(pattern) {
        if (!this.redisAvailable)
            return;
        try {
            const keys = await this.redis.keys(pattern);
            if (keys.length > 0) {
                await this.redis.del(...keys);
            }
        }
        catch (error) {
        }
    }
    async exists(key) {
        if (!this.redisAvailable)
            return false;
        try {
            const result = await this.redis.exists(key);
            return result === 1;
        }
        catch (error) {
            return false;
        }
    }
    async expire(key, ttl) {
        if (!this.redisAvailable)
            return;
        try {
            await this.redis.expire(key, ttl);
        }
        catch (error) {
        }
    }
    async incr(key) {
        if (!this.redisAvailable)
            return 0;
        try {
            return this.redis.incr(key);
        }
        catch (error) {
            return 0;
        }
    }
    async decr(key) {
        if (!this.redisAvailable)
            return 0;
        try {
            return this.redis.decr(key);
        }
        catch (error) {
            return 0;
        }
    }
    async hget(hash, field) {
        if (!this.redisAvailable)
            return null;
        try {
            return this.redis.hget(hash, field);
        }
        catch (error) {
            return null;
        }
    }
    async hset(hash, field, value) {
        if (!this.redisAvailable)
            return;
        try {
            await this.redis.hset(hash, field, value);
        }
        catch (error) {
        }
    }
    async hgetall(hash) {
        if (!this.redisAvailable)
            return {};
        try {
            return this.redis.hgetall(hash);
        }
        catch (error) {
            return {};
        }
    }
    async hdel(hash, ...fields) {
        if (!this.redisAvailable)
            return;
        try {
            await this.redis.hdel(hash, ...fields);
        }
        catch (error) {
        }
    }
    getClient() {
        return this.redis;
    }
    isAvailable() {
        return this.redisAvailable;
    }
};
exports.CacheService = CacheService;
exports.CacheService = CacheService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], CacheService);
//# sourceMappingURL=cache.service.js.map