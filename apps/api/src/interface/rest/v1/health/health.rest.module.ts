import { HealthServiceModule } from '@application/health/health.service.module';
import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';

@Module({
  imports: [HealthServiceModule],
  controllers: [HealthController],
})
export class HealthRestModule {}
