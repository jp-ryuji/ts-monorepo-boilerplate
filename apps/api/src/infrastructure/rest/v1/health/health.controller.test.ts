import type { HealthUsecase } from '@usecase/health/health.usecase';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { HealthController } from './health.controller';

describe('HealthController', () => {
  let healthController: HealthController;
  let mockHealthUsecase: HealthUsecase;

  beforeEach(() => {
    mockHealthUsecase = {
      shallowCheck: vi.fn(),
      detailedCheck: vi.fn(),
    } as unknown as HealthUsecase;

    healthController = new HealthController(mockHealthUsecase);
  });

  describe('shallowCheck', () => {
    it('should return health check result from usecase', () => {
      // Arrange
      const mockResult = {
        status: 'ok',
        timestamp: new Date().toISOString(),
        info: 'Shallow health check passed',
      };

      vi.mocked(mockHealthUsecase.shallowCheck).mockReturnValue(mockResult);

      // Act
      const result = healthController.shallowCheck();

      // Assert
      expect(result).toEqual(mockResult);
      expect(mockHealthUsecase.shallowCheck).toHaveBeenCalledTimes(1);
    });
  });

  describe('detailedCheck', () => {
    it('should return detailed health check result from usecase', async () => {
      // Arrange
      const mockResult = {
        status: 'ok',
        checks: {
          database: true,
          redis: true,
          timestamp: new Date().toISOString(),
        },
      };

      vi.mocked(mockHealthUsecase.detailedCheck).mockResolvedValue(mockResult);

      // Act
      const result = await healthController.detailedCheck();

      // Assert
      expect(result).toEqual(mockResult);
      expect(mockHealthUsecase.detailedCheck).toHaveBeenCalledTimes(1);
    });
  });
});
