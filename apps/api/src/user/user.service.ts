import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { ulid } from 'ulid';
import { DATABASE_CONNECTION } from '../db/database.module';
import type * as schema from '../db/schema';
import { users } from '../db/schema';

@Injectable()
export class UserService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: PostgresJsDatabase<typeof schema>,
  ) {}

  async createUser(name: string, email: string) {
    const [user] = await this.db
      .insert(users)
      .values({ id: ulid(), name, email })
      .returning();
    return user;
  }

  async getUserById(id: string) {
    const [user] = await this.db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getAllUsers() {
    return await this.db.select().from(users);
  }
}
