# Integration Testing

This project includes integration tests that run against a dedicated PostgreSQL database instance using Testcontainers. Each test run starts a fresh PostgreSQL container, ensuring complete isolation and reproducibility.

## Prerequisites

1. Docker must be running
2. Sufficient system resources to run Docker containers

## Running Integration Tests

To run the integration tests:

```bash
# Run all integration tests
pnpm --filter api test:integration

# Run tests in watch mode
pnpm --filter api test:watch

# Run tests with coverage
pnpm --filter api test:cov

# Run tests with UI
pnpm --filter api test:ui
```

## How It Works

Integration tests use Testcontainers to automatically:

1. Start a fresh PostgreSQL container for each test run
2. Create the necessary database schema using drizzle-kit
3. Run tests against the isolated database
4. Clean up the container after tests complete

This approach ensures that:

- Tests are isolated from the development database
- Tests are reproducible across different environments
- No manual database setup is required
- Tests don't interfere with each other

## Test Structure

Integration tests are located in files with the `.integration.test.ts` extension and are run with the `test:integration` script.

The test utilities are located in the `apps/api/src/test-utils/` directory:

- [database-test.setup.ts](../apps/api/src/test-utils/database-test.setup.ts) - Database test setup using Testcontainers and drizzle-kit
- [vitest.setup.ts](../apps/api/src/test-utils/vitest.setup.ts) - Vitest setup file

## Writing Integration Tests

When writing new integration tests:

1. Use the DatabaseTestSetup class to create isolated PostgreSQL instances
2. Clear tables in the `beforeEach` hook to ensure test isolation
3. Use the `Test.createTestingModule` function to set up the NestJS testing module
4. Import the database connection using the `DATABASE_CONNECTION` token
