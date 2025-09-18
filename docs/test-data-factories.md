# Test Data Factories

The repository contains factory classes for creating test data in a consistent and reusable way.

## Factory Methods

Each factory implements the `BaseFactory` interface with these core methods:

- `build(params?)` - Creates an entity in memory without saving to database
- `buildList(num, params?)` - Creates multiple entities in memory
- `create(params?)` - Creates and saves an entity to the database
- `createList(num, params?)` - Creates and saves multiple entities to the database

## Usage

See example implementations in:

- `src/test-utils/factories/example.test.ts` - Basic factory usage examples
- `src/test-utils/factory-provider.test.ts` - FactoryProvider usage examples
- `src/test-utils/factories/usage-example.ts` - Complete usage patterns

## Best Practices

1. Use `build()` for unit tests (no database persistence needed)
2. Use `create()` for integration tests (requires database records)
3. Use `FactoryProvider` for automatic dependency management
4. Customize data with params to override default values
5. Clean up test data using `DatabaseTestSetup.cleanup()` in test teardown

## Key Features

- **Realistic Data**: Faker.js for names, emails, and content
- **Unique IDs**: ULID generation for consistent identifiers
- **Auto Timestamps**: Automatic createdAt/updatedAt fields
- **Validation**: All data passes entity validation rules
