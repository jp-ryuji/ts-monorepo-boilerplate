// Example of how to use the factories in a real test
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { UserUsecase } from '../../usecase/user/user.usecase';
import { DatabaseTestSetup } from '../database-test.setup';
import { FactoryProvider } from '../factory-provider';

describe('User Service Tests', () => {
  let dbTestSetup: DatabaseTestSetup;
  let factoryProvider: FactoryProvider;
  let _userUsecase: UserUsecase;

  beforeEach(async () => {
    // Setup test database
    dbTestSetup = new DatabaseTestSetup();
    await dbTestSetup.setup();

    // Create factory provider
    factoryProvider = new FactoryProvider(dbTestSetup.db);

    // Create usecase instance (in a real test, you would inject this)
    // This is just for demonstration purposes
    _userUsecase = new UserUsecase(
      /* mock repository would be injected here in a real test */ {} as any,
    );
  });

  afterEach(async () => {
    // Cleanup test database
    await dbTestSetup.cleanup();
  });

  it('should create and get user by id', async () => {
    // Create a user using the factory
    const userFactory = factoryProvider.getUserFactory();
    const createdUser = await userFactory.create({
      name: 'John Doe',
      email: 'john@example.com',
    });

    // In a real test, you would test the actual usecase/repository methods
    // This is just to demonstrate the factory usage
    expect(createdUser.__getInternalState().name).toBe('John Doe');
    expect(createdUser.__getInternalState().email).toBe('john@example.com');
  });

  it('should create multiple users', async () => {
    // Create multiple users using the factory
    const userFactory = factoryProvider.getUserFactory();
    const users = await userFactory.createList(3);

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
      userId: user.getId(),
    });

    expect(post.__getInternalState().title).toBe('My First Post');
    expect(post.__getInternalState().userId).toBe(user.getId());
  });
});
