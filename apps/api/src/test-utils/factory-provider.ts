import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import type * as schema from '../db/schema';
import { PostFactory } from './factories/post.factory';
import { UserFactory } from './factories/user.factory';

export class FactoryProvider {
  private userFactory: UserFactory;
  private postFactory: PostFactory;

  constructor(db: PostgresJsDatabase<typeof schema>) {
    this.userFactory = new UserFactory(db);
    this.postFactory = new PostFactory(db, this.userFactory);
  }

  getUserFactory(): UserFactory {
    return this.userFactory;
  }

  getPostFactory(): PostFactory {
    return this.postFactory;
  }
}
