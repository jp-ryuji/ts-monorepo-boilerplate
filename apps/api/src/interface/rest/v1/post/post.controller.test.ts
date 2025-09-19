import type { PostService } from '@application/post/post.service';
import { Post } from '@domain/post/post.entity';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { CreatePostDto } from './dto/create-post.dto';
import { PostController } from './post.controller';

describe('PostController', () => {
  let postController: PostController;
  let mockPostService: PostService;

  beforeEach(() => {
    // Create mock service
    mockPostService = {
      createPost: vi.fn(),
      getPostById: vi.fn(),
      getAllPosts: vi.fn(),
      getPostsByUserId: vi.fn(),
    } as unknown as PostService;

    postController = new PostController(mockPostService);
  });

  describe('createPost', () => {
    it('should create and return post from service', async () => {
      // Arrange
      const createPostDto: CreatePostDto = {
        title: 'New Post',
        content: 'New content',
        userId: 'user123',
      };

      const createdPost = new Post({
        title: createPostDto.title,
        content: createPostDto.content,
        userId: createPostDto.userId,
      });

      vi.mocked(mockPostService.createPost).mockResolvedValue(createdPost);

      // Act
      const result = await postController.createPost(createPostDto);

      // Assert
      expect(result).toEqual(createdPost);
      expect(mockPostService.createPost).toHaveBeenCalledWith(
        createPostDto.title,
        createPostDto.content,
        createPostDto.userId,
      );
    });
  });

  describe('getPost', () => {
    it('should return post from service', async () => {
      // Arrange
      const postId = 'post123';
      const mockPost = new Post({
        id: postId,
        title: 'Test Post',
        content: 'Test content',
        userId: 'user123',
      });

      vi.mocked(mockPostService.getPostById).mockResolvedValue(mockPost);

      // Act
      const result = await postController.getPost(postId);

      // Assert
      expect(result).toEqual(mockPost);
      expect(mockPostService.getPostById).toHaveBeenCalledWith(postId);
    });
  });

  describe('getAllPosts', () => {
    it('should return all posts from service', async () => {
      // Arrange
      const mockPosts = [
        new Post({
          id: 'post1',
          title: 'Post 1',
          content: 'Content 1',
          userId: 'user1',
        }),
        new Post({
          id: 'post2',
          title: 'Post 2',
          content: 'Content 2',
          userId: 'user2',
        }),
      ];

      vi.mocked(mockPostService.getAllPosts).mockResolvedValue(mockPosts);

      // Act
      const result = await postController.getAllPosts();

      // Assert
      expect(result).toEqual(mockPosts);
      expect(mockPostService.getAllPosts).toHaveBeenCalledTimes(1);
    });
  });

  describe('getPostsByUser', () => {
    it('should return user posts from service', async () => {
      // Arrange
      const userId = 'user123';
      const mockPosts = [
        new Post({
          id: 'post1',
          title: 'Post 1',
          content: 'Content 1',
          userId,
        }),
        new Post({
          id: 'post2',
          title: 'Post 2',
          content: 'Content 2',
          userId,
        }),
      ];

      vi.mocked(mockPostService.getPostsByUserId).mockResolvedValue(mockPosts);

      // Act
      const result = await postController.getPostsByUser(userId);

      // Assert
      expect(result).toEqual(mockPosts);
      expect(mockPostService.getPostsByUserId).toHaveBeenCalledWith(userId);
    });
  });
});
