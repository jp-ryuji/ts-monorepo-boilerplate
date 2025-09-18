import { ulid } from 'ulid';

export interface PostProps {
  id?: string;
  title: string;
  content: string | null;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UpdatePostParams {
  title?: string;
  content?: string | null;
}

export class Post {
  private readonly id: string;
  private title: string;
  private content: string | null;
  private readonly userId: string;
  private readonly createdAt: Date;
  private updatedAt: Date;

  constructor(props: PostProps) {
    this.id = props.id ?? ulid();
    this.title = props.title;
    this.content = props.content;
    this.userId = props.userId;
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
  }

  // Minimal getters - only what's needed for identification and relationships
  getId(): string {
    return this.id;
  }

  // Method for testing - allows access to internal state without exposing it in regular API
  // This should only be used in test code
  __getInternalState(): {
    title: string;
    content: string | null;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
  } {
    return {
      title: this.title,
      content: this.content,
      userId: this.userId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  // Business behavior methods that represent real domain operations
  // Business operation: Publish a post with validation
  publish(title: string, content: string): void {
    if (!title.trim()) {
      throw new Error('Title cannot be empty');
    }
    this.title = title.trim();
    this.content = content;
    this.updatedAt = new Date();
  }

  // Business operation: Update post fields with validation
  update(params: UpdatePostParams): void {
    if (params.title !== undefined) {
      if (!params.title.trim()) {
        throw new Error('Title cannot be empty');
      }
      this.title = params.title.trim();
    }

    if (params.content !== undefined) {
      this.content = params.content;
    }

    this.updatedAt = new Date();
  }

  // Method that provides business value rather than just property access
  getSummary(maxLength: number = 100): string {
    if (!this.content) return '';
    return this.content.length > maxLength
      ? `${this.content.substring(0, maxLength)}...`
      : this.content;
  }

  // Equality method for comparing posts
  equals(other: Post): boolean {
    return this.id === other.id;
  }

  // Factory method for creating from persistence layer
  static fromPersistence(props: PostProps): Post {
    return new Post(props);
  }

  // Convert to persistence model - limited to infrastructure layer
  toPersistence(): Omit<PostProps, 'id'> & { id: string } {
    return {
      id: this.id,
      title: this.title,
      content: this.content,
      userId: this.userId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
