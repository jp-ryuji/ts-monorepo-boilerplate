# Testing

## API Testing

The API service uses Vitest as the testing framework with the following configuration:

### Test Types

1. **Unit Tests**: Test individual functions and classes in isolation
2. **Integration Tests**: Test the interaction between different modules
3. **End-to-End (E2E) Tests**: Test the complete API endpoints

### Test Structure

```plaintext
apps/api/
├── src/
│   └── *.ts              # Source code
├── test/
│   ├── unit/             # Unit tests
│   ├── integration/      # Integration tests
│   └── e2e/              # End-to-end tests
└── vitest.config.mts     # Vitest configuration
```

### Running API Tests

```bash
# Run all API tests
pnpm test:api

# Run tests in watch mode
pnpm test:api:watch

# Run tests with coverage
pnpm --filter api test:cov

# Run end-to-end tests
pnpm test:e2e

# Run tests in debug mode
pnpm --filter api test:debug
```

## Web Testing

The web service uses Vitest with React Testing Library for testing React components.

### Test Structure

```plaintext
apps/web/
├── src/
│   └── *.tsx             # Source code
├── __tests__/            # Test files
└── vitest.config.mts     # Vitest configuration
```

### Running Web Tests

```bash
# Run all web tests
pnpm test:web

# Run tests in watch mode
pnpm --filter web test --watch

# Run tests with coverage
pnpm --filter web test --coverage
```

## Running Tests for Both Services

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests for specific service
pnpm test:api
pnpm test:web
```

## Test Best Practices

### API Tests

1. **Use describe blocks** to group related tests
2. **Use beforeEach/afterEach** for test setup and teardown
3. **Mock external dependencies** like databases and HTTP requests
4. **Test edge cases** and error conditions
5. **Use meaningful test descriptions**

Example:

```typescript
describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(() => {
    service = new UsersService();
    controller = new UsersController(service);
  });

  describe('findOne', () => {
    it('should return a user object', async () => {
      const result = { id: 1, name: 'John Doe' };
      vi.spyOn(service, 'findOne').mockImplementation(() => result);

      expect(await controller.findOne(1)).toBe(result);
    });
  });
});
```

### Web Tests

1. **Test user interactions** rather than implementation details
2. **Use React Testing Library** queries to find elements
3. **Mock API calls** to avoid external dependencies
4. **Test different user scenarios**
5. **Use data-testid attributes** when necessary for testing

Example:

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from './LoginForm';

test('submits login form', async () => {
  const user = userEvent.setup();
  const mockLogin = vi.fn();

  render(<LoginForm onLogin={mockLogin} />);

  await user.type(screen.getByLabelText(/email/i), 'test@example.com');
  await user.type(screen.getByLabelText(/password/i), 'password123');
  await user.click(screen.getByRole('button', { name: /log in/i }));

  expect(mockLogin).toHaveBeenCalledWith({
    email: 'test@example.com',
    password: 'password123'
  });
});
```

## Coverage

To check test coverage:

```bash
# API coverage
pnpm --filter api test:cov

# Web coverage
pnpm --filter web test --coverage
```

The coverage reports will be generated in the `coverage/` directory for each service.

## Continuous Integration

In a CI environment, you might want to run tests with specific options:

```bash
# Run tests in CI mode
pnpm test --ci --coverage

# Run tests with maximum threads for faster execution
pnpm test --threads=false
```

## Debugging Tests

To debug tests:

1. **Add console.log statements** for quick debugging
2. **Use debugger statements** to pause execution
3. **Run tests in debug mode**:

```bash
# Debug API tests
pnpm --filter api test:debug

# Debug web tests (in Chrome DevTools)
node --inspect-brk node_modules/.bin/vitest --inspect-brk
```

## Writing Effective Tests

1. **Follow the AAA pattern**: Arrange, Act, Assert
2. **Keep tests independent** - each test should be able to run alone
3. **Use descriptive test names** - clearly state what is being tested
4. **Test one thing per test** - keep tests focused
5. **Use appropriate assertions** - check what matters for the test
6. **Clean up after tests** - restore any state changed during tests

## Dependency Notes

### Jest Dependencies in Lockfile

You may notice that there are still Jest-related dependencies in the `pnpm-lock.yaml` file, even though this project uses Vitest. This is expected and not a problem:

1. **Transitive Dependencies**: These Jest dependencies are pulled in as transitive dependencies by NestJS tooling (`@nestjs/testing`, `@nestjs/cli`, etc.)
2. **Not Actively Used**: While present in the lockfile, these dependencies are not actively used since the project uses Vitest for testing
3. **No Runtime Impact**: These are development dependencies that don't affect runtime performance
4. **Tooling Requirements**: The NestJS CLI and related tooling may still require these dependencies for their internal functionality

These dependencies include:
- `jest` and related packages
- `@types/jest` for TypeScript type definitions
- `ts-jest` for TypeScript support in Jest

Since these are not directly used in the project and the tests are working correctly with Vitest, there's no need to remove them. Attempting to remove them might break the NestJS tooling or cause issues with future updates.
