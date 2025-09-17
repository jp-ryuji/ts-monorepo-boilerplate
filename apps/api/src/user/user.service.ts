import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DATABASE_CONNECTION } from '../db/database.module';
import { users } from '../db/schema';

@Injectable()
export class UserService {
  constructor(@Inject(DATABASE_CONNECTION) private readonly db: any) {}

  async createUser(name: string, email: string) {
    const [user] = await this.db
      .insert(users)
      .values({ name, email })
      .returning();
    return user;
  }

  async getUserById(id: number) {
    const [user] = await this.db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getAllUsers() {
    return await this.db.select().from(users);
  }
}
