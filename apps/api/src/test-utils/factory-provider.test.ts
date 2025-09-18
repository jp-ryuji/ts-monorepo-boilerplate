import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { DatabaseTestSetup } from './database-test.setup';
import { FactoryProvider } from './factory-provider';

describe('Factory Provider Integration', () => {
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

  it('should create users using factory provider', async () => {
    const userFactory = factoryProvider.getUserFactory();
    const user = await userFactory.create({
      name: 'John Doe',
      email: 'john@example.com',
    });

    expect(user).toBeDefined();
    expect(user.getId()).toBeDefined();
    expect(typeof user.getId()).toBe('string');
  });

  it('should create posts using factory provider', async () => {
    const postFactory = factoryProvider.getPostFactory();
    const post = await postFactory.create({ title: 'Test Post' });

    expect(post).toBeDefined();
    expect(post.getId()).toBeDefined();
    expect(typeof post.getId()).toBe('string');
    expect(post.__getInternalState().userId).toBeDefined();
    expect(typeof post.__getInternalState().userId).toBe('string');
  });

  it('should create multiple entities', async () => {
    const userFactory = factoryProvider.getUserFactory();
    const postFactory = factoryProvider.getPostFactory();

    const users = await userFactory.createList(2);
    const posts = await postFactory.createList(2);

    expect(users).toHaveLength(2);
    expect(posts).toHaveLength(2);

    users.forEach((user) => {
      expect(user.getId()).toBeDefined();
    });

    posts.forEach((post) => {
      expect(post.getId()).toBeDefined();
    });
  });

  it('should build multiple users without saving to database', () => {
    const userFactory = factoryProvider.getUserFactory();
    const users = userFactory.buildList(3, {
      name: 'Built User',
      email: 'built@example.com',
    });

    expect(users).toHaveLength(3);
    users.forEach((user) => {
      expect(user.getId()).toBeDefined();
      expect(typeof user.getId()).toBe('string');
    });
  });

  it('should build multiple posts without saving to database', () => {
    const postFactory = factoryProvider.getPostFactory();
    const posts = postFactory.buildList(2, { title: 'Built Post' });

    expect(posts).toHaveLength(2);
    posts.forEach((post) => {
      expect(post.getId()).toBeDefined();
      expect(typeof post.getId()).toBe('string');
      expect(post.__getInternalState().userId).toBeDefined(); // Will be set to empty string or created user ID
    });
  });
});
