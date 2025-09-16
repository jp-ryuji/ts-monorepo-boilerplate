import { db } from '@db';
import { users } from '@db/schema';
import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';

@Injectable()
export class UserService {
  async createUser(name: string, email: string) {
    const [user] = await db.insert(users).values({ name, email }).returning();
    return user;
  }

  async getUserById(id: number) {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getAllUsers() {
    return await db.select().from(users);
  }
}
