import type { Post } from '@domain/post/post.entity';
import { Body, Controller, Get, Post as HttpPost, Param } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import type { PostUsecase } from '@usecase/post/post.usecase';
import type { CreatePostDto } from './dto/create-post.dto';

@ApiTags('posts')
@Controller('v1/posts')
export class PostController {
  constructor(private readonly postUsecase: PostUsecase) {}

  @HttpPost()
  @ApiOperation({ summary: 'Create a new post' })
  @ApiCreatedResponse({
    description: 'The post has been successfully created.',
  })
  async createPost(@Body() createPostDto: CreatePostDto) {
    return await this.postUsecase.createPost(
      createPostDto.title,
      createPostDto.content,
      createPostDto.userId,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a post by ID' })
  @ApiOkResponse({ description: 'Return the post with the specified ID.' })
  async getPost(@Param('id') id: string): Promise<Post | null> {
    return await this.postUsecase.getPostById(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all posts' })
  @ApiOkResponse({ description: 'Return all posts.' })
  async getAllPosts(): Promise<Post[]> {
    return await this.postUsecase.getAllPosts();
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get all posts by user ID' })
  @ApiOkResponse({
    description: 'Return all posts created by the specified user.',
  })
  async getPostsByUser(@Param('userId') userId: string): Promise<Post[]> {
    return await this.postUsecase.getPostsByUserId(userId);
  }
}
