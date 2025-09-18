import { Post } from '@domain/post/post.entity';
import type { PostRepository } from '@domain/post/post.repository';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { PostUsecase } from './post.usecase';

describe('PostUsecase', () => {
  let postUsecase: PostUsecase;
  let mockPostRepository: PostRepository;

  beforeEach(() => {
    // Create mock repository
    mockPostRepository = {
      create: vi.fn(),
      update: vi.fn(),
      upsert: vi.fn(),
      createBulk: vi.fn(),
      findById: vi.fn(),
      findAll: vi.fn(),
      findByUserId: vi.fn(),
      delete: vi.fn(),
    };

    postUsecase = new PostUsecase(mockPostRepository);
  });

  describe('createPost', () => {
    it('should create and return new post', async () => {
      // Arrange
      const title = 'New Post';
      const content = 'New content';
      const userId = 'user123';

      const createdPost = new Post({
        title,
        content,
        userId,
      });

      vi.mocked(mockPostRepository.create).mockResolvedValue(createdPost);

      // Act
      const result = await postUsecase.createPost(title, content, userId);

      // Assert
      expect(result).toEqual(createdPost);
      expect(mockPostRepository.create).toHaveBeenCalledWith(expect.any(Post));
      expect(mockPostRepository.create).toHaveBeenCalledTimes(1);

      // Verify the post was created with correct data
      const calledWithPost = vi.mocked(mockPostRepository.create).mock
        .calls[0][0];
      expect(calledWithPost.__getInternalState().title).toBe(title);
      expect(calledWithPost.__getInternalState().content).toBe(content);
      expect(calledWithPost.__getInternalState().userId).toBe(userId);
    });
  });

  describe('getPostById', () => {
    it('should return post when found', async () => {
      // Arrange
      const postId = 'post123';
      const mockPost = new Post({
        id: postId,
        title: 'Test Post',
        content: 'Test content',
        userId: 'user123',
      });

      vi.mocked(mockPostRepository.findById).mockResolvedValue(mockPost);

      // Act
      const result = await postUsecase.getPostById(postId);

      // Assert
      expect(result).toEqual(mockPost);
      expect(mockPostRepository.findById).toHaveBeenCalledWith(postId);
      expect(mockPostRepository.findById).toHaveBeenCalledTimes(1);
    });

    it('should return null when post not found', async () => {
      // Arrange
      const postId = 'nonexistent';
      vi.mocked(mockPostRepository.findById).mockResolvedValue(null);

      // Act
      const result = await postUsecase.getPostById(postId);

      // Assert
      expect(result).toBeNull();
      expect(mockPostRepository.findById).toHaveBeenCalledWith(postId);
    });
  });

  describe('getAllPosts', () => {
    it('should return all posts', async () => {
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

      vi.mocked(mockPostRepository.findAll).mockResolvedValue(mockPosts);

      // Act
      const result = await postUsecase.getAllPosts();

      // Assert
      expect(result).toEqual(mockPosts);
      expect(mockPostRepository.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('getPostsByUserId', () => {
    it('should return user posts', async () => {
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

      vi.mocked(mockPostRepository.findByUserId).mockResolvedValue(mockPosts);

      // Act
      const result = await postUsecase.getPostsByUserId(userId);

      // Assert
      expect(result).toEqual(mockPosts);
      expect(mockPostRepository.findByUserId).toHaveBeenCalledWith(userId);
      expect(mockPostRepository.findByUserId).toHaveBeenCalledTimes(1);
    });
  });
});
