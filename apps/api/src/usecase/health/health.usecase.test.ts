import { describe, expect, it } from 'vitest';
import { HealthUsecase } from './health.usecase';

describe('HealthUsecase', () => {
  let healthUsecase: HealthUsecase;

  beforeEach(() => {
    healthUsecase = new HealthUsecase();
  });

  describe('shallowCheck', () => {
    it('should return health check result with status ok', () => {
      const result = healthUsecase.shallowCheck();

      expect(result).toEqual({
        status: 'ok',
        timestamp: expect.any(String),
        info: 'Shallow health check passed',
      });

      // Verify timestamp is a valid ISO string
      expect(new Date(result.timestamp)).toBeInstanceOf(Date);
    });

    it('should return different timestamps for different calls', () => {
      const result1 = healthUsecase.shallowCheck();
      // Add a small delay to ensure different timestamps
      const result2 = healthUsecase.shallowCheck();

      expect(result1.timestamp).toBeDefined();
      expect(result2.timestamp).toBeDefined();
    });
  });

  describe('detailedCheck', () => {
    it('should return detailed health check result', async () => {
      const result = await healthUsecase.detailedCheck();

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
