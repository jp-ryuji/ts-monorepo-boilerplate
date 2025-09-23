import { DatabaseModule } from '@infrastructure/postgres/database.module';
import { Module } from '@nestjs/common';
import { PostService } from './post.service';

@Module({
  imports: [DatabaseModule],
  providers: [PostService],
  exports: [PostService],
})
export class PostServiceModule {}
