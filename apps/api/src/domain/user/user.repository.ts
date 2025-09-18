import type { User } from './user.entity';

export const USER_REPOSITORY = 'USER_REPOSITORY';

export interface UserRepository {
  create(user: User): Promise<User>;
  update(user: User): Promise<User>;
  upsert(user: User): Promise<User>;
  createBulk(users: User[]): Promise<User[]>;
  findById(id: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  delete(id: string): Promise<void>;
}
