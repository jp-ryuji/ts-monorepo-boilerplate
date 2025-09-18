import { Post } from '@domain/post/post.entity';
import type { PostUsecase } from '@usecase/post/post.usecase';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { CreatePostDto } from './dto/create-post.dto';
import { PostController } from './post.controller';

describe('PostController', () => {
  let postController: PostController;
  let mockPostUsecase: PostUsecase;

  beforeEach(() => {
    // Create mock usecase
    mockPostUsecase = {
      createPost: vi.fn(),
      getPostById: vi.fn(),
      getAllPosts: vi.fn(),
      getPostsByUserId: vi.fn(),
    } as unknown as PostUsecase;

    postController = new PostController(mockPostUsecase);
  });

  describe('createPost', () => {
    it('should create and return post from usecase', async () => {
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

      vi.mocked(mockPostUsecase.createPost).mockResolvedValue(createdPost);

      // Act
      const result = await postController.createPost(createPostDto);

      // Assert
      expect(result).toEqual(createdPost);
      expect(mockPostUsecase.createPost).toHaveBeenCalledWith(
        createPostDto.title,
        createPostDto.content,
        createPostDto.userId,
      );
    });
  });

  describe('getPost', () => {
    it('should return post from usecase', async () => {
      // Arrange
      const postId = 'post123';
      const mockPost = new Post({
        id: postId,
        title: 'Test Post',
        content: 'Test content',
        userId: 'user123',
      });

      vi.mocked(mockPostUsecase.getPostById).mockResolvedValue(mockPost);

      // Act
      const result = await postController.getPost(postId);

      // Assert
      expect(result).toEqual(mockPost);
      expect(mockPostUsecase.getPostById).toHaveBeenCalledWith(postId);
    });
  });

  describe('getAllPosts', () => {
    it('should return all posts from usecase', async () => {
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

      vi.mocked(mockPostUsecase.getAllPosts).mockResolvedValue(mockPosts);

      // Act
      const result = await postController.getAllPosts();

      // Assert
      expect(result).toEqual(mockPosts);
      expect(mockPostUsecase.getAllPosts).toHaveBeenCalledTimes(1);
    });
  });

  describe('getPostsByUser', () => {
    it('should return user posts from usecase', async () => {
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

      vi.mocked(mockPostUsecase.getPostsByUserId).mockResolvedValue(mockPosts);

      // Act
      const result = await postController.getPostsByUser(userId);

      // Assert
      expect(result).toEqual(mockPosts);
      expect(mockPostUsecase.getPostsByUserId).toHaveBeenCalledWith(userId);
    });
  });
});
