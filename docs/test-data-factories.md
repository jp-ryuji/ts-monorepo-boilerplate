# Test Data Factories

This directory contains factory classes for creating test data in a consistent and reusable way. The factories follow the factory pattern and provide methods for building and creating entities.

## Usage

### Basic Factory Usage

```typescript
import { UserFactory } from './test-utils/factories/user.factory';
import { PostFactory } from './test-utils/factories/post.factory';

// Create a user factory
const userFactory = new UserFactory(db);

// Create a single user
const user = await userFactory.create({ name: 'John Doe' });

// Create multiple users
const users = await userFactory.createList(3);

// Build a user object without saving to database
const user = userFactory.build({ name: 'Jane Doe' });

// Build multiple user objects without saving to database
const users = userFactory.buildList(3, { name: 'Jane Doe' });
```

### Using FactoryProvider

For easier management of multiple factories, you can use the FactoryProvider:

```typescript
import { FactoryProvider } from './test-utils/factory-provider';

const factoryProvider = new FactoryProvider(db);
const userFactory = factoryProvider.getUserFactory();
const postFactory = factoryProvider.getPostFactory();

// Build multiple user objects without saving to database
const users = userFactory.buildList(3, { name: 'Jane Doe' });

// Build multiple post objects without saving to database
const posts = postFactory.buildList(2, { title: 'Test Post' });
```

### Available Methods

Each factory implements the BaseFactory interface with the following methods:

- `build(params?: Partial<T>)`: Creates an entity object without saving to the database
- `buildList(num: number, params?: Partial<T>)`: Creates multiple entity objects without saving to the database
- `create(params?: Partial<T>)`: Creates and saves an entity to the database
- `createList(num: number, params?: Partial<T>)`: Creates and saves multiple entities to the database

### Sequences

Factories use sequences to generate unique values for fields like names and titles:

```typescript
import { sequence } from './test-utils/factories/utils';

// Reset sequences between tests
beforeEach(() => {
  sequence.reset('user');
  sequence.reset('post');
});
```