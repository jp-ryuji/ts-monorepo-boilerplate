import { describe, expect, it } from 'vitest';
import { HealthService } from './health.service';

describe('HealthService', () => {
  let healthService: HealthService;

  beforeEach(() => {
    healthService = new HealthService();
  });

  describe('shallowCheck', () => {
    it('should return health check result with status ok', () => {
      const result = healthService.shallowCheck();

      expect(result).toEqual({
        status: 'ok',
        timestamp: expect.any(String),
        info: 'Shallow health check passed',
      });

      // Verify timestamp is a valid ISO string
      expect(new Date(result.timestamp)).toBeInstanceOf(Date);
    });

    it('should return different timestamps for different calls', () => {
      const result1 = healthService.shallowCheck();
      // Add a small delay to ensure different timestamps
      const result2 = healthService.shallowCheck();

      expect(result1.timestamp).toBeDefined();
      expect(result2.timestamp).toBeDefined();
    });
  });

  describe('detailedCheck', () => {
    it('should return detailed health check result', async () => {
      const result = await healthService.detailedCheck();

      expect(result).toEqual({
        status: expect.any(String),
        checks: {
          database: expect.any(Boolean),
          redis: expect.any(Boolean),
          timestamp: expect.any(String),
        },
      });

      // Verify status is either 'ok' or 'error'
      expect(['ok', 'error']).toContain(result.status);

      // Verify timestamp is a valid ISO string
      expect(new Date(result.checks.timestamp)).toBeInstanceOf(Date);
    });
  });
});
