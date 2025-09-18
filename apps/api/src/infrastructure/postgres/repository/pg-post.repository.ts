import { Post, type PostProps } from '@domain/post/post.entity';
import type { PostRepository } from '@domain/post/post.repository';
import type * as schema from '@infrastructure/postgres/schema';
import { posts } from '@infrastructure/postgres/schema';
import { eq } from 'drizzle-orm';
import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js';

export class PgPostRepository implements PostRepository {
  constructor(private readonly db: PostgresJsDatabase<typeof schema>) {}

  async create(post: Post): Promise<Post> {
    const postData = post.toPersistence();
    const [createdPost] = await this.db
      .insert(posts)
      .values(postData)
      .returning();

    // Explicitly create PostProps to ensure correct typing
    const postProps: PostProps = {
      id: createdPost.id,
      title: createdPost.title,
      content: createdPost.content,
      userId: createdPost.userId,
      createdAt: createdPost.createdAt,
      updatedAt: createdPost.updatedAt,
    };

    return Post.fromPersistence(postProps);
  }

  async update(post: Post): Promise<Post> {
    const postData = post.toPersistence();
    const [updatedPost] = await this.db
      .update(posts)
      .set({
        title: postData.title,
        content: postData.content,
        updatedAt: postData.updatedAt,
      })
      .where(eq(posts.id, postData.id))
      .returning();

    if (!updatedPost) {
      throw new Error(`Post with id ${postData.id} not found`);
    }

    // Explicitly create PostProps to ensure correct typing
    const postProps: PostProps = {
      id: updatedPost.id,
      title: updatedPost.title,
      content: updatedPost.content,
      userId: updatedPost.userId,
      createdAt: updatedPost.createdAt,
      updatedAt: updatedPost.updatedAt,
    };

    return Post.fromPersistence(postProps);
  }

  async upsert(post: Post): Promise<Post> {
    const postData = post.toPersistence();
    const [savedPost] = await this.db
      .insert(posts)
      .values(postData)
      .onConflictDoUpdate({
        target: posts.id,
        set: {
          title: postData.title,
          content: postData.content,
          updatedAt: postData.updatedAt,
        },
      })
      .returning();

    // Explicitly create PostProps to ensure correct typing
    const postProps: PostProps = {
      id: savedPost.id,
      title: savedPost.title,
      content: savedPost.content,
      userId: savedPost.userId,
      createdAt: savedPost.createdAt,
      updatedAt: savedPost.updatedAt,
    };

    return Post.fromPersistence(postProps);
  }

  async createBulk(postsToCreate: Post[]): Promise<Post[]> {
    if (postsToCreate.length === 0) return [];

    const postData = postsToCreate.map((post) => post.toPersistence());
    const createdPosts = await this.db
      .insert(posts)
      .values(postData)
      .returning();

    return createdPosts.map((createdPost) => {
      // Explicitly create PostProps to ensure correct typing
      const postProps: PostProps = {
        id: createdPost.id,
        title: createdPost.title,
        content: createdPost.content,
        userId: createdPost.userId,
        createdAt: createdPost.createdAt,
        updatedAt: createdPost.updatedAt,
      };

      return Post.fromPersistence(postProps);
    });
  }

  async findById(id: string): Promise<Post | null> {
    const [post] = await this.db.select().from(posts).where(eq(posts.id, id));

    if (!post) return null;

    // Explicitly create PostProps to ensure correct typing
    const postProps: PostProps = {
      id: post.id,
      title: post.title,
      content: post.content,
      userId: post.userId,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    };

    return Post.fromPersistence(postProps);
  }

  async findAll(): Promise<Post[]> {
    const postsList = await this.db.select().from(posts);

    return postsList.map((post) => {
      // Explicitly create PostProps to ensure correct typing
      const postProps: PostProps = {
        id: post.id,
        title: post.title,
        content: post.content,
        userId: post.userId,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      };

      return Post.fromPersistence(postProps);
    });
  }

  async findByUserId(userId: string): Promise<Post[]> {
    const postsList = await this.db
      .select()
      .from(posts)
      .where(eq(posts.userId, userId));

    return postsList.map((post) => {
      // Explicitly create PostProps to ensure correct typing
      const postProps: PostProps = {
        id: post.id,
        title: post.title,
        content: post.content,
        userId: post.userId,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      };

      return Post.fromPersistence(postProps);
    });
  }

  async delete(id: string): Promise<void> {
    await this.db.delete(posts).where(eq(posts.id, id));
  }
}
