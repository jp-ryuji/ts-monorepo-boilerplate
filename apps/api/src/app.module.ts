import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthRestModule } from './infrastructure/rest/v1/health/health.rest.module';
import { PostRestModule } from './infrastructure/rest/v1/post/post.rest.module';
import { UserRestModule } from './infrastructure/rest/v1/user/user.rest.module';
import { HealthUsecaseModule } from './usecase/health/health.usecase.module';
import { PostUsecaseModule } from './usecase/post/post.usecase.module';
import { UserUsecaseModule } from './usecase/user/user.usecase.module';

@Module({
  imports: [
    HealthUsecaseModule,
    UserUsecaseModule,
    PostUsecaseModule,
    UserRestModule,
    PostRestModule,
    HealthRestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
