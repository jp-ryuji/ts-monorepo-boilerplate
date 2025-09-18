import { db } from '@infrastructure/postgres';
import { Injectable } from '@nestjs/common';
import { createClient } from 'redis';

@Injectable()
export class HealthUsecase {
  /**
   * Shallow health check - just returns 200, minimal dependencies
   * @returns Health check result
   */
  shallowCheck() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      info: 'Shallow health check passed',
    };
  }

  /**
   * Deep health check - tests database, Redis, and other services
   * @returns Detailed health check result
   */
  async detailedCheck() {
    const checks: {
      database: boolean;
      redis: boolean;
      timestamp: string;
    } = {
      database: false,
      redis: false,
      timestamp: new Date().toISOString(),
    };

    try {
      // Check database connection
      await db.execute('SELECT 1');
      checks.database = true;
    } catch (error) {
      // Database connection failed
      checks.database = false;
      // In a real application, you might want to log this error
      console.error('Database health check failed:', error);
    }

    try {
      // Check Redis connection
      const redisClient = createClient({
        url: process.env.REDIS_URL || 'redis://localhost:6379',
      });
      await redisClient.connect();
      await redisClient.ping();
      await redisClient.quit();
      checks.redis = true;
    } catch (error) {
      // Redis connection failed
      checks.redis = false;
      // In a real application, you might want to log this error
      console.error('Redis health check failed:', error);
    }

    return {
      status: checks.database && checks.redis ? 'ok' : 'error',
      checks,
    };
  }
}
