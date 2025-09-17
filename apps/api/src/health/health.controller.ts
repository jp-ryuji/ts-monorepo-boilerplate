import { Controller, Get } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import type { HealthService } from './health.service';

@ApiTags('health')
@Controller('api/health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @ApiOperation({ summary: 'Shallow health check' })
  @ApiOkResponse({ description: 'Shallow health check passed' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  shallowCheck() {
    return this.healthService.shallowCheck();
  }

  @Get('detailed')
  @ApiOperation({
    summary: 'Detailed health check including database and Redis',
  })
  @ApiOkResponse({ description: 'Detailed health check completed' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async detailedCheck() {
    return await this.healthService.detailedCheck();
  }
}
