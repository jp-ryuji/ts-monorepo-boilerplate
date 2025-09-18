import { Post } from '@domain/post/post.entity';
import type { PostRepository } from '@domain/post/post.repository';
import { POST_REPOSITORY } from '@domain/post/post.repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class PostUsecase {
  constructor(
    @Inject(POST_REPOSITORY)
    private readonly postRepository: PostRepository,
  ) {}

  async createPost(title: string, content: string | null, userId: string) {
    const post = new Post({ title, content, userId });
    return await this.postRepository.create(post);
  }

  async getPostById(id: string) {
    return await this.postRepository.findById(id);
  }

  async getAllPosts() {
    return await this.postRepository.findAll();
  }

  async getPostsByUserId(userId: string) {
    return await this.postRepository.findByUserId(userId);
  }
}
