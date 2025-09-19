import type { HealthService } from '@application/health/health.service';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { HealthController } from './health.controller';

describe('HealthController', () => {
  let healthController: HealthController;
  let mockHealthService: HealthService;

  beforeEach(() => {
    mockHealthService = {
      shallowCheck: vi.fn(),
      detailedCheck: vi.fn(),
    } as unknown as HealthService;

    healthController = new HealthController(mockHealthService);
  });

  describe('shallowCheck', () => {
    it('should return health check result from service', () => {
      // Arrange
      const mockResult = {
        status: 'ok',
        timestamp: new Date().toISOString(),
        info: 'Shallow health check passed',
      };

      vi.mocked(mockHealthService.shallowCheck).mockReturnValue(mockResult);

      // Act
      const result = healthController.shallowCheck();

      // Assert
      expect(result).toEqual(mockResult);
      expect(mockHealthService.shallowCheck).toHaveBeenCalledTimes(1);
    });
  });

  describe('detailedCheck', () => {
    it('should return detailed health check result from service', async () => {
      // Arrange
      const mockResult = {
        status: 'ok',
        checks: {
          database: true,
          redis: true,
          timestamp: new Date().toISOString(),
        },
      };

      vi.mocked(mockHealthService.detailedCheck).mockResolvedValue(mockResult);

      // Act
      const result = await healthController.detailedCheck();

      // Assert
      expect(result).toEqual(mockResult);
      expect(mockHealthService.detailedCheck).toHaveBeenCalledTimes(1);
    });
  });
});
