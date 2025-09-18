import { faker } from '@faker-js/faker';
import type * as schema from '@infrastructure/postgres/schema';
import { posts } from '@infrastructure/postgres/schema';
import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { ulid } from 'ulid';
import { Post } from '../../domain/post/post.entity';
import type { BaseFactory } from './base.factory';
import type { UserFactory } from './user.factory';

export class PostFactory implements BaseFactory<Post> {
  constructor(
    private readonly db: PostgresJsDatabase<typeof schema>,
    private readonly userFactory: UserFactory,
  ) {}

  build(params?: Partial<Record<string, any>>): Post {
    const now = new Date();
    // Create default post props
    const defaultProps = {
      id: ulid(),
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraph(),
      userId: '', // Will be set when creating or passed in params
      createdAt: now,
      updatedAt: now,
    };

    // Merge with provided params
    const mergedProps = { ...defaultProps, ...params };

    // Create post from merged props
    return new Post(mergedProps as any);
  }

  buildList(num: number, params?: Partial<Record<string, any>>): Post[] {
    if (num <= 0) return [];
    return Array.from({ length: num }, () => this.build(params));
  }

  async create(params?: Partial<Record<string, any>>): Promise<Post> {
    let userId = params?.userId;

    // If no userId provided, create a user first
    if (!userId) {
      const user = await this.userFactory.create();
      userId = user.getId();
    }

    const post = this.build({ ...params, userId });

    // Save to database using raw query for factory purposes
    const postData = post.toPersistence();
    const [createdPost] = await this.db
      .insert(posts)
      .values(postData)
      .returning();
    return new Post({
      id: createdPost.id,
      title: createdPost.title,
      content: createdPost.content,
      userId: createdPost.userId,
      createdAt: createdPost.createdAt,
      updatedAt: createdPost.updatedAt,
    });
  }

  async createList(
    num: number,
    params?: Partial<Record<string, any>>,
  ): Promise<Post[]> {
    if (num <= 0) return [];

    // If no userId provided, create a user first for all posts
    let userId = params?.userId;
    if (!userId) {
      const user = await this.userFactory.create();
      userId = user.getId();
    }

    const postsToCreate = Array.from({ length: num }, () => {
      return this.build({ ...params, userId });
    });

    const postData = postsToCreate.map((post) => post.toPersistence());
    const createdPosts = await this.db
      .insert(posts)
      .values(postData)
      .returning();

    return createdPosts.map(
      (createdPost) =>
        new Post({
          id: createdPost.id,
          title: createdPost.title,
          content: createdPost.content,
          userId: createdPost.userId,
          createdAt: createdPost.createdAt,
          updatedAt: createdPost.updatedAt,
        }),
    );
  }
}
