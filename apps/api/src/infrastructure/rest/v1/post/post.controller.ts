import { Body, Controller, Get, Post as HttpPost, Param } from '@nestjs/common';
import type { PostUsecase } from '@usecase/post/post.usecase';
import type { CreatePostDto } from './dto/create-post.dto';

@Controller('v1/posts')
export class PostController {
  constructor(private readonly postUsecase: PostUsecase) {}

  @HttpPost()
  async createPost(@Body() createPostDto: CreatePostDto) {
    return await this.postUsecase.createPost(
      createPostDto.title,
      createPostDto.content,
      createPostDto.userId,
    );
  }

  @Get(':id')
  async getPost(@Param('id') id: string) {
    return await this.postUsecase.getPostById(id);
  }

  @Get()
  async getAllPosts() {
    return await this.postUsecase.getAllPosts();
  }

  @Get('user/:userId')
  async getPostsByUser(@Param('userId') userId: string) {
    return await this.postUsecase.getPostsByUserId(userId);
  }
}
