import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class CacheService implements OnModuleInit, OnModuleDestroy {
  private redis: Redis;
  private redisAvailable = false;

  constructor() {
    this.redis = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
      password: process.env.REDIS_PASSWORD || undefined,
      retryStrategy: (times) => {
        // Stop retrying after 3 attempts
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
    } catch (error) {
      console.log('Redis not available, running without caching');
      this.redisAvailable = false;
    }
  }

  async onModuleDestroy() {
    if (this.redisAvailable) {
      await this.redis.quit();
    }
  }

  async get(key: string): Promise<string | null> {
    if (!this.redisAvailable) return null;
    try {
      return this.redis.get(key);
    } catch (error) {
      return null;
    }
  }

  async set(key: string, value: string, ttl?: number): Promise<void> {
    if (!this.redisAvailable) return;
    try {
      if (ttl) {
        await this.redis.setex(key, ttl, value);
      } else {
        await this.redis.set(key, value);
      }
    } catch (error) {
      // Silently fail if Redis is not available
    }
  }

  async del(key: string): Promise<void> {
    if (!this.redisAvailable) return;
    try {
      await this.redis.del(key);
    } catch (error) {
      // Silently fail if Redis is not available
    }
  }

  async delPattern(pattern: string): Promise<void> {
    if (!this.redisAvailable) return;
    try {
      const keys = await this.redis.keys(pattern);
      if (keys.length > 0) {
        await this.redis.del(...keys);
      }
    } catch (error) {
      // Silently fail if Redis is not available
    }
  }

  async exists(key: string): Promise<boolean> {
    if (!this.redisAvailable) return false;
    try {
      const result = await this.redis.exists(key);
      return result === 1;
    } catch (error) {
      return false;
    }
  }

  async expire(key: string, ttl: number): Promise<void> {
    if (!this.redisAvailable) return;
    try {
      await this.redis.expire(key, ttl);
    } catch (error) {
      // Silently fail if Redis is not available
    }
  }

  async incr(key: string): Promise<number> {
    if (!this.redisAvailable) return 0;
    try {
      return this.redis.incr(key);
    } catch (error) {
      return 0;
    }
  }

  async decr(key: string): Promise<number> {
    if (!this.redisAvailable) return 0;
    try {
      return this.redis.decr(key);
    } catch (error) {
      return 0;
    }
  }

  async hget(hash: string, field: string): Promise<string | null> {
    if (!this.redisAvailable) return null;
    try {
      return this.redis.hget(hash, field);
    } catch (error) {
      return null;
    }
  }

  async hset(hash: string, field: string, value: string): Promise<void> {
    if (!this.redisAvailable) return;
    try {
      await this.redis.hset(hash, field, value);
    } catch (error) {
      // Silently fail if Redis is not available
    }
  }

  async hgetall(hash: string): Promise<Record<string, string>> {
    if (!this.redisAvailable) return {};
    try {
      return this.redis.hgetall(hash);
    } catch (error) {
      return {};
    }
  }

  async hdel(hash: string, ...fields: string[]): Promise<void> {
    if (!this.redisAvailable) return;
    try {
      await this.redis.hdel(hash, ...fields);
    } catch (error) {
      // Silently fail if Redis is not available
    }
  }

  getClient(): Redis {
    return this.redis;
  }

  isAvailable(): boolean {
    return this.redisAvailable;
  }
}
