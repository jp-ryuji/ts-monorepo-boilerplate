import type { Post } from './post.entity';

export const POST_REPOSITORY = 'POST_REPOSITORY';

export interface PostRepository {
  create(post: Post): Promise<Post>;
  update(post: Post): Promise<Post>;
  upsert(post: Post): Promise<Post>;
  createBulk(posts: Post[]): Promise<Post[]>;
  findById(id: string): Promise<Post | null>;
  findAll(): Promise<Post[]>;
  findByUserId(userId: string): Promise<Post[]>;
  delete(id: string): Promise<void>;
}
