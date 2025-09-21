import { PostServiceModule } from '@application/post/post.service.module';
import { Module } from '@nestjs/common';
import { PostController } from './post.controller';

@Module({
  imports: [PostServiceModule],
  controllers: [PostController],
})
export class PostRestModule {}
