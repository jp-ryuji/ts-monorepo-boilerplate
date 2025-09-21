import { beforeEach, describe, expect, it } from 'vitest';
import { HealthService } from './health.service';

describe('HealthService', () => {
  let healthService: HealthService;

  beforeEach(() => {
    healthService = new HealthService();
  });

  describe('shallowCheck', () => {
    it('should return health check result with status ok', () => {
      const result = healthService.shallowCheck();
      expect(result.status).toBe('ok');
      expect(result.timestamp).toBeDefined();
      expect(result.info).toBe('Shallow health check passed');
    });

    it('should return different timestamps for different calls', () => {
      const result1 = healthService.shallowCheck();
      // Add a small delay to ensure different timestamps
      const result2 = healthService.shallowCheck();
      expect(result1.timestamp).not.toBe(result2.timestamp);
    });
  });

  describe('detailedCheck', () => {
    it('should return detailed health check result', async () => {
      const result = await healthService.detailedCheck();
      expect(result.status).toBe('error'); // Will be error because we're not connected to a real database/redis
      expect(result.checks).toEqual({
        database: false,
        redis: false,
        timestamp: expect.any(String),
      });
    });
  });
});
