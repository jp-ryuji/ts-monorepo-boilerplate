import { User } from '@domain/user/user.entity';
import type { UserRepository } from '@domain/user/user.repository';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { UserService } from './user.service';

describe('UserService', () => {
  let userService: UserService;
  let mockUserRepository: UserRepository;

  beforeEach(() => {
    // Create mock repository
    mockUserRepository = {
      create: vi.fn(),
      update: vi.fn(),
      upsert: vi.fn(),
      createBulk: vi.fn(),
      findById: vi.fn(),
      findAll: vi.fn(),
      delete: vi.fn(),
    };

    userService = new UserService(mockUserRepository);
  });

  describe('createUser', () => {
    it('should create and return new user', async () => {
      // Arrange
      const name = 'John Doe';
      const email = 'john@example.com';

      const createdUser = new User({
        name,
        email,
      });

      vi.mocked(mockUserRepository.create).mockResolvedValue(createdUser);

      // Act
      const result = await userService.createUser(name, email);

      // Assert
      expect(result).toEqual(createdUser);
      expect(mockUserRepository.create).toHaveBeenCalledWith(expect.any(User));
      expect(mockUserRepository.create).toHaveBeenCalledTimes(1);

      // Verify the user was created with correct data
      const calledWithUser = vi.mocked(mockUserRepository.create).mock
        .calls[0][0];
      expect(calledWithUser.__getInternalState().name).toBe(name);
      expect(calledWithUser.__getInternalState().email).toBe(email);
    });
  });

  describe('getUserById', () => {
    it('should return user when found', async () => {
      // Arrange
      const userId = 'user123';
      const mockUser = new User({
        id: userId,
        name: 'John Doe',
        email: 'john@example.com',
      });

      vi.mocked(mockUserRepository.findById).mockResolvedValue(mockUser);

      // Act
      const result = await userService.getUserById(userId);

      // Assert
      expect(result).toEqual(mockUser);
      expect(mockUserRepository.findById).toHaveBeenCalledWith(userId);
      expect(mockUserRepository.findById).toHaveBeenCalledTimes(1);
    });

    it('should return null when user not found', async () => {
      // Arrange
      const userId = 'nonexistent';
      vi.mocked(mockUserRepository.findById).mockResolvedValue(null);

      // Act
      const result = await userService.getUserById(userId);

      // Assert
      expect(result).toBeNull();
      expect(mockUserRepository.findById).toHaveBeenCalledWith(userId);
    });
  });

  describe('getAllUsers', () => {
    it('should return all users', async () => {
      // Arrange
      const mockUsers = [
        new User({
          id: 'user1',
          name: 'John Doe',
          email: 'john@example.com',
        }),
        new User({
          id: 'user2',
          name: 'Jane Doe',
          email: 'jane@example.com',
        }),
      ];

      vi.mocked(mockUserRepository.findAll).mockResolvedValue(mockUsers);

      // Act
      const result = await userService.getAllUsers();

      // Assert
      expect(result).toEqual(mockUsers);
      expect(mockUserRepository.findAll).toHaveBeenCalledTimes(1);
    });
  });
});
