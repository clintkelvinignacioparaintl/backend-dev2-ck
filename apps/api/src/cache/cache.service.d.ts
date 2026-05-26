import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';
export declare class CacheService implements OnModuleInit, OnModuleDestroy {
    private redis;
    private redisAvailable;
    constructor();
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
    get(key: string): Promise<string | null>;
    set(key: string, value: string, ttl?: number): Promise<void>;
    del(key: string): Promise<void>;
    delPattern(pattern: string): Promise<void>;
    exists(key: string): Promise<boolean>;
    expire(key: string, ttl: number): Promise<void>;
    incr(key: string): Promise<number>;
    decr(key: string): Promise<number>;
    hget(hash: string, field: string): Promise<string | null>;
    hset(hash: string, field: string, value: string): Promise<void>;
    hgetall(hash: string): Promise<Record<string, string>>;
    hdel(hash: string, ...fields: string[]): Promise<void>;
    getClient(): Redis;
    isAvailable(): boolean;
}
