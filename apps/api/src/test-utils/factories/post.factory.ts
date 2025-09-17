import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { ulid } from 'ulid';
import type * as schema from '../../db/schema';
import { posts } from '../../db/schema';
import type { BaseFactory } from './base.factory';
import type { UserFactory } from './user.factory';
import { sequence } from './utils';

export interface Post {
  id: string;
  title: string;
  content: string | null;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export class PostFactory implements BaseFactory<Post> {
  constructor(
    private readonly db: PostgresJsDatabase<typeof schema>,
    private readonly userFactory: UserFactory,
  ) {}

  build(params?: Partial<Post>): Post {
    const now = new Date();
    const defaults: Post = {
      id: ulid(),
      title: `Test Post ${sequence.next('post')}`,
      content: `This is the content for test post ${sequence.next('post')}`,
      userId: '', // Will be set when creating or passed in params
      createdAt: now,
      updatedAt: now,
    };
    return { ...defaults, ...params };
  }

  buildList(num: number, params?: Partial<Post>): Post[] {
    if (num <= 0) return [];
    return Array.from({ length: num }, () => this.build(params));
  }

  async create(params?: Partial<Post>): Promise<Post> {
    let userId = params?.userId;

    // If no userId provided, create a user first
    if (!userId) {
      const user = await this.userFactory.create();
      userId = user.id;
    }

    const post = this.build({ ...params, userId });

    // Include the id in the insert since we're generating ULIDs in the factory
    const [createdPost] = await this.db.insert(posts).values(post).returning();
    return { ...createdPost, userId: createdPost.userId || userId };
  }

  async createList(num: number, params?: Partial<Post>): Promise<Post[]> {
    if (num <= 0) return [];

    // If no userId provided, create a user first for all posts
    let userId = params?.userId;
    if (!userId) {
      const user = await this.userFactory.create();
      userId = user.id;
    }

    const postsToCreate = Array.from({ length: num }, () => {
      return this.build({ ...params, userId });
    });

    const createdPosts = await this.db
      .insert(posts)
      .values(postsToCreate)
      .returning();
    return createdPosts.map((post) => ({
      ...post,
      userId: post.userId || userId,
    }));
  }
}
