import type { UserService } from '@application/user/user.service';
import { Email } from '@domain/shared/value-object/email.value';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { UserController } from './user.controller';

describe('UserController', () => {
  let userController: UserController;
  let mockUserService: any;

  beforeEach(() => {
    mockUserService = {
      createUser: vi.fn(),
      getUserById: vi.fn(),
      getAllUsers: vi.fn(),
    };

    userController = new UserController(mockUserService as UserService);
  });

  it('should create a user', async () => {
    const user = {
      id: '1',
      name: 'John Doe',
      email: new Email('john@example.com'),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    mockUserService.createUser.mockResolvedValue(user);

    const result = await userController.createUser({
      name: 'John Doe',
      email: 'john@example.com',
    });

    expect(result).toEqual(user);
    expect(mockUserService.createUser).toHaveBeenCalledWith(
      'John Doe',
      'john@example.com',
    );
  });

  it('should get a user by ID', async () => {
    const user = {
      id: '1',
      name: 'John Doe',
      email: new Email('john@example.com'),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    mockUserService.getUserById.mockResolvedValue(user);

    const result = await userController.getUser('1');

    expect(result).toEqual(user);
    expect(mockUserService.getUserById).toHaveBeenCalledWith('1');
  });

  it('should get all users', async () => {
    const users = [
      {
        id: '1',
        name: 'John Doe',
        email: new Email('john@example.com'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        name: 'Jane Doe',
        email: new Email('jane@example.com'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    mockUserService.getAllUsers.mockResolvedValue(users);

    const result = await userController.getAllUsers();

    expect(result).toEqual(users);
    expect(mockUserService.getAllUsers).toHaveBeenCalled();
  });
});
