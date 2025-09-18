import { Email } from '@domain/shared/value-object/email.value';
import { ulid } from 'ulid';

export interface UserProps {
  id?: string;
  name: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UpdateUserParams {
  name?: string;
  email?: string;
}

export class User {
  private readonly id: string;
  private name: string;
  private email: Email;
  private readonly createdAt: Date;
  private updatedAt: Date;

  constructor(props: UserProps) {
    this.id = props.id ?? ulid();
    this.name = props.name;
    this.email = new Email(props.email);
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
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
  } {
    return {
      name: this.name,
      email: this.email.getValue(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  // Business behavior methods that represent real domain operations
  // Business operation: Update user with validation
  update(params: UpdateUserParams): void {
    if (params.name !== undefined) {
      if (params.name.trim() === '') {
        throw new Error('Name cannot be empty');
      }
      this.name = params.name.trim();
    }

    if (params.email !== undefined) {
      this.email = new Email(params.email);
    }

    this.updatedAt = new Date();
  }

  // Method that represents a business capability rather than just property access
  getDisplayName(): string {
    return `${this.name} (${this.email.getValue()})`;
  }

  // Equality method for comparing users
  equals(other: User): boolean {
    return this.id === other.id;
  }

  // Factory method for creating from persistence layer
  static fromPersistence(props: UserProps): User {
    // Reconstruct user from persistence without validation
    // This pattern bypasses constructor validation for trusted data from storage
    const user = new User({ ...props, email: 'placeholder@example.com' });
    user.email = new Email(props.email);
    return user;
  }

  // Convert to persistence model - limited to infrastructure layer
  toPersistence(): Omit<UserProps, 'id'> & { id: string } {
    return {
      id: this.id,
      name: this.name,
      email: this.email.getValue(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
