import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { DatabaseTestSetup } from './database-test.setup';
import { sequence } from './factories/utils';
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

    // Reset sequences between tests
    sequence.reset('user');
    sequence.reset('post');
  });

  afterEach(async () => {
    // Cleanup test database
    await dbTestSetup.cleanup();
  });

  it('should create users using factory provider', async () => {
    const userFactory = factoryProvider.getUserFactory();
    const user = await userFactory.create({ name: 'John Doe' });

    expect(user).toBeDefined();
    expect(user.name).toBe('John Doe');
    expect(user.email).toContain('@');
    expect(user.id).toBeDefined();
    expect(typeof user.id).toBe('string');
  });

  it('should create posts using factory provider', async () => {
    const postFactory = factoryProvider.getPostFactory();
    const post = await postFactory.create({ title: 'Test Post' });

    expect(post).toBeDefined();
    expect(post.title).toBe('Test Post');
    expect(post.userId).toBeDefined();
    expect(typeof post.userId).toBe('string');
    expect(post.id).toBeDefined();
    expect(typeof post.id).toBe('string');
  });

  it('should create multiple entities', async () => {
    const userFactory = factoryProvider.getUserFactory();
    const postFactory = factoryProvider.getPostFactory();

    // Create multiple users
    const users = await userFactory.createList(3);
    expect(users).toHaveLength(3);

    // Create multiple posts
    const posts = await postFactory.createList(2);
    expect(posts).toHaveLength(2);

    // Verify all entities have proper IDs
    for (const user of users) {
      expect(user.id).toBeDefined();
      expect(typeof user.id).toBe('string');
    }
    for (const post of posts) {
      expect(post.id).toBeDefined();
      expect(typeof post.id).toBe('string');
      expect(post.userId).toBeDefined();
      expect(typeof post.userId).toBe('string');
    }
  });

  it('should build multiple users without saving to database', () => {
    const userFactory = factoryProvider.getUserFactory();
    const users = userFactory.buildList(3, { name: 'Built User' });

    expect(users).toHaveLength(3);
    users.forEach((user) => {
      expect(user.id).toBeDefined();
      expect(typeof user.id).toBe('string');
      expect(user.name).toBe('Built User');
      expect(user.email).toContain('@');
      expect(user.createdAt).toBeDefined();
      expect(user.updatedAt).toBeDefined();
    });
  });

  it('should build multiple posts without saving to database', () => {
    const postFactory = factoryProvider.getPostFactory();
    const posts = postFactory.buildList(2, { title: 'Built Post' });

    expect(posts).toHaveLength(2);
    posts.forEach((post) => {
      expect(post.id).toBeDefined();
      expect(typeof post.id).toBe('string');
      expect(post.title).toBe('Built Post');
      expect(post.content).toBeDefined();
      expect(post.userId).toBe(''); // Default value, will be set when created
      expect(post.createdAt).toBeDefined();
      expect(post.updatedAt).toBeDefined();
    });
  });
});
