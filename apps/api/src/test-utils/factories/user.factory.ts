import { faker } from '@faker-js/faker';
import type * as schema from '@infrastructure/postgres/schema';
import { users } from '@infrastructure/postgres/schema';
import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { ulid } from 'ulid';
import { User } from '../../domain/user/user.entity';
import type { BaseFactory } from './base.factory';

export class UserFactory implements BaseFactory<User> {
  constructor(private readonly db: PostgresJsDatabase<typeof schema>) {}

  build(params?: Partial<Record<string, any>>): User {
    const now = new Date();
    // Create default user props
    const defaultProps = {
      id: ulid(), // Use ULID instead of sequence for proper ID format
      name: faker.person.fullName(),
      email: faker.internet.email(),
      createdAt: now,
      updatedAt: now,
    };

    // Merge with provided params
    const mergedProps = { ...defaultProps, ...params };

    // Create user from merged props
    return new User(mergedProps as any);
  }

  buildList(num: number, params?: Partial<Record<string, any>>): User[] {
    if (num <= 0) return [];
    return Array.from({ length: num }, () => this.build(params));
  }

  async create(params?: Partial<Record<string, any>>): Promise<User> {
    const user = this.build(params);
    // Save to database using raw query for factory purposes
    const userData = user.toPersistence();
    const [createdUser] = await this.db
      .insert(users)
      .values(userData)
      .returning();
    return new User({
      id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
      createdAt: createdUser.createdAt,
      updatedAt: createdUser.updatedAt,
    });
  }

  async createList(
    num: number,
    params?: Partial<Record<string, any>>,
  ): Promise<User[]> {
    if (num <= 0) return [];

    const usersToCreate = Array.from({ length: num }, () => {
      return this.build(params);
    });

    const userData = usersToCreate.map((user) => user.toPersistence());
    const createdUsers = await this.db
      .insert(users)
      .values(userData)
      .returning();

    return createdUsers.map(
      (createdUser) =>
        new User({
          id: createdUser.id,
          name: createdUser.name,
          email: createdUser.email,
          createdAt: createdUser.createdAt,
          updatedAt: createdUser.updatedAt,
        }),
    );
  }
}
