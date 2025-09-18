import { Module } from '@nestjs/common';
import { PostUsecase } from './post.usecase';

@Module({
  providers: [PostUsecase],
  exports: [PostUsecase],
})
export class PostUsecaseModule {}
