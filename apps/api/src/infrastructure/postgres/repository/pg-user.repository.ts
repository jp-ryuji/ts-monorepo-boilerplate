import { User } from '@domain/user/user.entity';
import type { UserRepository } from '@domain/user/user.repository';
import type * as schema from '@infrastructure/postgres/schema';
import { users } from '@infrastructure/postgres/schema';
import { eq } from 'drizzle-orm';
import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js';

export class PgUserRepository implements UserRepository {
  constructor(private readonly db: PostgresJsDatabase<typeof schema>) {}

  async create(user: User): Promise<User> {
    const userData = user.toPersistence();
    const [createdUser] = await this.db
      .insert(users)
      .values(userData)
      .returning();

    return User.fromPersistence({
      id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
      createdAt: createdUser.createdAt,
      updatedAt: createdUser.updatedAt,
    });
  }

  async update(user: User): Promise<User> {
    const userData = user.toPersistence();
    const [updatedUser] = await this.db
      .update(users)
      .set({
        name: userData.name,
        email: userData.email,
        updatedAt: userData.updatedAt,
      })
      .where(eq(users.id, userData.id))
      .returning();

    if (!updatedUser) {
      throw new Error(`User with id ${userData.id} not found`);
    }

    return User.fromPersistence({
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt,
    });
  }

  async upsert(user: User): Promise<User> {
    const userData = user.toPersistence();
    const [savedUser] = await this.db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          name: userData.name,
          email: userData.email,
          updatedAt: userData.updatedAt,
        },
      })
      .returning();

    return User.fromPersistence({
      id: savedUser.id,
      name: savedUser.name,
      email: savedUser.email,
      createdAt: savedUser.createdAt,
      updatedAt: savedUser.updatedAt,
    });
  }

  async createBulk(usersToCreate: User[]): Promise<User[]> {
    if (usersToCreate.length === 0) return [];

    const userData = usersToCreate.map((user) => user.toPersistence());
    const createdUsers = await this.db
      .insert(users)
      .values(userData)
      .returning();

    return createdUsers.map((createdUser) =>
      User.fromPersistence({
        id: createdUser.id,
        name: createdUser.name,
        email: createdUser.email,
        createdAt: createdUser.createdAt,
        updatedAt: createdUser.updatedAt,
      }),
    );
  }

  async findById(id: string): Promise<User | null> {
    const [user] = await this.db.select().from(users).where(eq(users.id, id));

    if (!user) return null;

    return User.fromPersistence({
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  }

  async findAll(): Promise<User[]> {
    const usersList = await this.db.select().from(users);

    return usersList.map((user) =>
      User.fromPersistence({
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      }),
    );
  }

  async delete(id: string): Promise<void> {
    await this.db.delete(users).where(eq(users.id, id));
  }
}
