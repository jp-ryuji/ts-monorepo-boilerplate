// Example of how to use the factories in a real test
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { DatabaseTestSetup } from '../database-test.setup';
import { FactoryProvider } from '../factory-provider';

describe('User Service Tests', () => {
  let dbTestSetup: DatabaseTestSetup;
  let factoryProvider: FactoryProvider;

  beforeEach(async () => {
    // Setup test database
    dbTestSetup = new DatabaseTestSetup();
    await dbTestSetup.setup();

    // Create factory provider
    factoryProvider = new FactoryProvider(dbTestSetup.db);
  });

  afterEach(async () => {
    // Cleanup test database
    await dbTestSetup.cleanup();
  });

  it('should get user by id', async () => {
    // Create a user using the factory
    const userFactory = factoryProvider.getUserFactory();
    const createdUser = await userFactory.create({
      name: 'John Doe',
      email: 'john@example.com',
    });

    // Test the service method
    const user = await userService.getUserById(createdUser.id);

    expect(user).toBeDefined();
    expect(user.name).toBe('John Doe');
    expect(user.email).toBe('john@example.com');
  });

  it('should get all users', async () => {
    // Create multiple users using the factory
    const userFactory = factoryProvider.getUserFactory();
    await userFactory.createList(3);

    // Test the service method
    const users = await userService.getAllUsers();

    expect(users).toHaveLength(3);
  });

  it('should create a post for a user', async () => {
    // Create a user and post using the factories
    const userFactory = factoryProvider.getUserFactory();
    const postFactory = factoryProvider.getPostFactory();

    const user = await userFactory.create({ name: 'John Doe' });
    const post = await postFactory.create({
      title: 'My First Post',
      content: 'This is the content of my first post',
      userId: user.id,
    });

    expect(post.title).toBe('My First Post');
    expect(post.userId).toBe(user.id);
  });
});
