import { Module } from '@nestjs/common';
import { HealthUsecase } from './health.usecase';

@Module({
  providers: [HealthUsecase],
  exports: [HealthUsecase],
})
export class HealthUsecaseModule {}
