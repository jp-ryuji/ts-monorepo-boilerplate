import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { DatabaseTestSetup } from '../../test-utils/database-test.setup';
import { PostFactory } from './post.factory';
import { UserFactory } from './user.factory';

describe('User and Post Factories', () => {
  let dbTestSetup: DatabaseTestSetup;
  let userFactory: UserFactory;
  let postFactory: PostFactory;

  beforeEach(async () => {
    // Setup test database
    dbTestSetup = new DatabaseTestSetup();
    await dbTestSetup.setup();

    // Create factories
    const db = dbTestSetup.db;
    userFactory = new UserFactory(db);
    postFactory = new PostFactory(db, userFactory);
  });

  afterEach(async () => {
    // Cleanup test database
    await dbTestSetup.cleanup();
  });

  it('should create a user', async () => {
    const user = await userFactory.create({
      name: 'John Doe',
      email: 'john@example.com',
    });

    expect(user).toBeDefined();
    expect(user.getId()).toBeDefined();
    expect(typeof user.getId()).toBe('string');
  });

  it('should create multiple users', async () => {
    const users = await userFactory.createList(3);

    expect(users).toHaveLength(3);
    users.forEach((user) => {
      expect(user.getId()).toBeDefined();
      expect(typeof user.getId()).toBe('string');
    });
  });

  it('should create a post with associated user', async () => {
    const post = await postFactory.create({ title: 'Test Post' });

    expect(post).toBeDefined();
    expect(post.getId()).toBeDefined();
    expect(typeof post.getId()).toBe('string');
    expect(post.__getInternalState().userId).toBeDefined();
    expect(typeof post.__getInternalState().userId).toBe('string');
  });

  it('should create multiple posts', async () => {
    const posts = await postFactory.createList(2);

    expect(posts).toHaveLength(2);
    // All posts should have the same user
    expect(posts[0].__getInternalState().userId).toBe(
      posts[1].__getInternalState().userId,
    );

    posts.forEach((post) => {
      expect(post.getId()).toBeDefined();
      expect(typeof post.getId()).toBe('string');
    });
  });

  it('should create a post with a specific user', async () => {
    const user = await userFactory.create({
      name: 'Jane Doe',
      email: 'jane@example.com',
    });
    const post = await postFactory.create({
      userId: user.getId(),
      title: "Jane's Post",
    });

    expect(post.__getInternalState().userId).toBe(user.getId());
  });

  it('should build multiple users without saving to database', () => {
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
    const posts = postFactory.buildList(2, { title: 'Built Post' });

    expect(posts).toHaveLength(2);
    posts.forEach((post) => {
      expect(post.getId()).toBeDefined();
      expect(typeof post.getId()).toBe('string');
      expect(post.__getInternalState().userId).toBeDefined(); // Will be set to empty string or created user ID
    });
  });
});
