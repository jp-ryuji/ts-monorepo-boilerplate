import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { DatabaseTestSetup } from '../../test-utils/database-test.setup';
import { PostFactory } from './post.factory';
import { UserFactory } from './user.factory';
import { sequence } from './utils';

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

    // Reset sequences between tests
    sequence.reset('user');
    sequence.reset('post');
  });

  afterEach(async () => {
    await dbTestSetup.cleanup();
  });

  it('should create a user', async () => {
    const user = await userFactory.create({ name: 'John Doe' });

    expect(user).toBeDefined();
    expect(user.name).toBe('John Doe');
    expect(user.email).toContain('@');
    expect(user.id).toBeDefined();
    expect(typeof user.id).toBe('string');
  });

  it('should create multiple users', async () => {
    const users = await userFactory.createList(3);

    expect(users).toHaveLength(3);
    users.forEach((user) => {
      expect(user.id).toBeDefined();
      expect(typeof user.id).toBe('string');
      expect(user.name).toMatch(/Test User \d+/);
    });
  });

  it('should create a post with associated user', async () => {
    const post = await postFactory.create({ title: 'Test Post' });

    expect(post).toBeDefined();
    expect(post.title).toBe('Test Post');
    expect(post.userId).toBeDefined();
    expect(typeof post.userId).toBe('string');
    expect(post.id).toBeDefined();
    expect(typeof post.id).toBe('string');
  });

  it('should create multiple posts', async () => {
    const posts = await postFactory.createList(2);

    expect(posts).toHaveLength(2);
    // All posts should have the same user
    expect(posts[0].userId).toBe(posts[1].userId);

    posts.forEach((post) => {
      expect(post.id).toBeDefined();
      expect(typeof post.id).toBe('string');
      expect(post.title).toMatch(/Test Post \d+/);
    });
  });

  it('should create a post with a specific user', async () => {
    const user = await userFactory.create({ name: 'Jane Doe' });
    const post = await postFactory.create({
      userId: user.id,
      title: "Jane's Post",
    });

    expect(post.userId).toBe(user.id);
    expect(post.title).toBe("Jane's Post");
  });

  it('should build multiple users without saving to database', () => {
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
