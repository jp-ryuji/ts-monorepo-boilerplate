import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthServiceModule } from './application/health/health.service.module';
import { PostServiceModule } from './application/post/post.service.module';
import { UserServiceModule } from './application/user/user.service.module';
import { HealthRestModule } from './interface/rest/v1/health/health.rest.module';
import { PostRestModule } from './interface/rest/v1/post/post.rest.module';
import { UserRestModule } from './interface/rest/v1/user/user.rest.module';

@Module({
  imports: [
    HealthServiceModule,
    UserServiceModule,
    PostServiceModule,
    UserRestModule,
    PostRestModule,
    HealthRestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
