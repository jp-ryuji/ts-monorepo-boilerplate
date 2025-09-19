import type { PostService } from '@application/post/post.service';
import type { Post } from '@domain/post/post.entity';
import { Body, Controller, Get, Post as HttpPost, Param } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import type { CreatePostDto } from './dto/create-post.dto';

@ApiTags('posts')
@Controller('v1/posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @HttpPost()
  @ApiOperation({ summary: 'Create a new post' })
  @ApiCreatedResponse({
    description: 'The post has been successfully created.',
  })
  async createPost(@Body() createPostDto: CreatePostDto) {
    return await this.postService.createPost(
      createPostDto.title,
      createPostDto.content,
      createPostDto.userId,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a post by ID' })
  @ApiOkResponse({ description: 'Return the post with the specified ID.' })
  async getPost(@Param('id') id: string): Promise<Post | null> {
    return await this.postService.getPostById(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all posts' })
  @ApiOkResponse({ description: 'Return all posts.' })
  async getAllPosts(): Promise<Post[]> {
    return await this.postService.getAllPosts();
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get all posts by user ID' })
  @ApiOkResponse({
    description: 'Return all posts created by the specified user.',
  })
  async getPostsByUser(@Param('userId') userId: string): Promise<Post[]> {
    return await this.postService.getPostsByUserId(userId);
  }
}
