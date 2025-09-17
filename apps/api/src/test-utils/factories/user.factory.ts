import { faker } from '@faker-js/faker';
import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { ulid } from 'ulid';
import type * as schema from '../../db/schema';
import { users } from '../../db/schema';
import type { BaseFactory } from './base.factory';
import { sequence } from './utils';

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export class UserFactory implements BaseFactory<User> {
  constructor(private readonly db: PostgresJsDatabase<typeof schema>) {}

  build(params?: Partial<User>): User {
    const now = new Date();
    const defaults: User = {
      id: ulid(),
      name: `Test User ${sequence.next('user')}`,
      email: faker.internet.email(),
      createdAt: now,
      updatedAt: now,
    };
    return { ...defaults, ...params };
  }

  buildList(num: number, params?: Partial<User>): User[] {
    if (num <= 0) return [];
    return Array.from({ length: num }, () => this.build(params));
  }

  async create(params?: Partial<User>): Promise<User> {
    const user = this.build(params);
    // Include the id in the insert since we're generating ULIDs in the factory
    const [createdUser] = await this.db.insert(users).values(user).returning();
    return createdUser;
  }

  async createList(num: number, params?: Partial<User>): Promise<User[]> {
    if (num <= 0) return [];

    const usersToCreate = Array.from({ length: num }, () => {
      return this.build(params);
    });

    return await this.db.insert(users).values(usersToCreate).returning();
  }
}
