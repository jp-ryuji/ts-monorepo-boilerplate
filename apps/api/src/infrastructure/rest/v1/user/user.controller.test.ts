import { User } from '@domain/user/user.entity';
import type { UserUsecase } from '@usecase/user/user.usecase';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { CreateUserDto } from './dto/create-user.dto';
import { UserController } from './user.controller';

describe('UserController', () => {
  let userController: UserController;
  let mockUserUsecase: UserUsecase;

  beforeEach(() => {
    // Create mock usecase
    mockUserUsecase = {
      createUser: vi.fn(),
      getUserById: vi.fn(),
      getAllUsers: vi.fn(),
    } as unknown as UserUsecase;

    userController = new UserController(mockUserUsecase);
  });

  describe('createUser', () => {
    it('should create and return user from usecase', async () => {
      // Arrange
      const createUserDto: CreateUserDto = {
        name: 'Jane Doe',
        email: 'jane@example.com',
      };

      const createdUser = new User({
        name: createUserDto.name,
        email: createUserDto.email,
      });

      vi.mocked(mockUserUsecase.createUser).mockResolvedValue(createdUser);

      // Act
      const result = await userController.createUser(createUserDto);

      // Assert
      expect(result).toEqual(createdUser);
      expect(mockUserUsecase.createUser).toHaveBeenCalledWith(
        createUserDto.name,
        createUserDto.email,
      );
    });
  });

  describe('getUser', () => {
    it('should return user from usecase', async () => {
      // Arrange
      const userId = 'user123';
      const mockUser = new User({
        id: userId,
        name: 'John Doe',
        email: 'john@example.com',
      });

      vi.mocked(mockUserUsecase.getUserById).mockResolvedValue(mockUser);

      // Act
      const result = await userController.getUser(userId);

      // Assert
      expect(result).toEqual(mockUser);
      expect(mockUserUsecase.getUserById).toHaveBeenCalledWith(userId);
    });
  });

  describe('getAllUsers', () => {
    it('should return all users from usecase', async () => {
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

      vi.mocked(mockUserUsecase.getAllUsers).mockResolvedValue(mockUsers);

      // Act
      const result = await userController.getAllUsers();

      // Assert
      expect(result).toEqual(mockUsers);
      expect(mockUserUsecase.getAllUsers).toHaveBeenCalledTimes(1);
    });
  });
});
