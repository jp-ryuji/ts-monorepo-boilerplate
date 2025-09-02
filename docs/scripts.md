# Available Scripts

## Root Scripts (`package.json`)

The root `package.json` file contains scripts for managing the entire monorepo:

| Script                | Description                                   | Command                                                                      |
| --------------------- | --------------------------------------------- | ---------------------------------------------------------------------------- |
| `pnpm dev`            | Start both API and web in development mode    | `concurrently "pnpm --filter api start:dev" "pnpm --filter web dev"`         |
| `pnpm dev:api`        | Start only the API service                    | `pnpm --filter api start:dev`                                                |
| `pnpm dev:web`        | Start only the web service                    | `pnpm --filter web dev`                                                      |
| `pnpm build`          | Build both services                           | `pnpm --filter api build && pnpm --filter web build`                         |
| `pnpm build:api`      | Build only the API service                    | `pnpm --filter api build`                                                    |
| `pnpm build:web`      | Build only the web service                    | `pnpm --filter web build`                                                    |
| `pnpm start`          | Start both services in production mode        | `concurrently "pnpm --filter api start:prod" "pnpm --filter web start"`      |
| `pnpm start:api`      | Start only the API service in production mode | `pnpm --filter api start:prod`                                               |
| `pnpm start:web`      | Start only the web service in production mode | `pnpm --filter web start`                                                    |
| `pnpm test`           | Run tests for both services                   | `pnpm --filter api test && pnpm --filter web test`                           |
| `pnpm test:api`       | Run tests for the API service                 | `pnpm --filter api test`                                                     |
| `pnpm test:web`       | Run tests for the web service                 | `pnpm --filter web test`                                                     |
| `pnpm test:watch`     | Run tests in watch mode for both services     | `concurrently "pnpm --filter api test:watch" "pnpm --filter web test:watch"` |
| `pnpm test:api:watch` | Run API tests in watch mode                   | `pnpm --filter api test:watch`                                               |
| `pnpm test:e2e`       | Run end-to-end tests for the API              | `pnpm --filter api test:e2e`                                                 |
| `pnpm lint`           | Lint both services                            | `pnpm --filter api lint && pnpm --filter web lint`                           |
| `pnpm lint:api`       | Lint the API service                          | `pnpm --filter api lint`                                                     |
| `pnpm lint:web`       | Lint the web service                          | `pnpm --filter web lint`                                                     |
| `pnpm format`         | Format code in both services                  | `pnpm --filter api format && prettier --write .`                             |
| `pnpm format:api`     | Format code in the API service                | `pnpm --filter api format`                                                   |
| `pnpm clean`          | Clean build artifacts from all services       | `rimraf apps/*/dist apps/*/node_modules node_modules`                        |
| `pnpm clean:api`      | Clean build artifacts from the API service    | `rimraf apps/api/dist apps/api/node_modules`                                 |
| `pnpm clean:web`      | Clean build artifacts from the web service    | `rimraf apps/web/.next apps/web/node_modules`                                |
| `pnpm docker:up`      | Start Docker services in development mode     | `docker compose up -d`                                                       |
| `pnpm docker:down`    | Stop Docker services                          | `docker compose down`                                                        |
| `pnpm docker:build`   | Build Docker images                           | `docker compose build`                                                       |
| `pnpm docker:logs`    | View Docker logs                              | `docker compose logs -f`                                                     |
| `pnpm docker:sync`    | Sync dependencies to Docker containers        | `sh ./scripts/sync-deps.sh`                                                  |

## API Scripts (`apps/api/package.json`)

The API service has its own set of scripts in `apps/api/package.json`:

| Script             | Description                                      | Command                                                                                                |
| ------------------ | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `pnpm start:dev`   | Start API in development mode with hot-reloading | `nest start --watch`                                                                                   |
| `pnpm start:debug` | Start API in debug mode                          | `nest start --debug --watch`                                                                           |
| `pnpm start:prod`  | Start the built API                              | `node dist/main`                                                                                       |
| `pnpm build`       | Build the API for production                     | `nest build`                                                                                           |
| `pnpm format`      | Format code                                      | `prettier --write "src/**/*.ts" "test/**/*.ts"`                                                        |
| `pnpm start`       | Start the built API (alias for start:prod)       | `node dist/main`                                                                                       |
| `pnpm test`        | Run API tests                                    | `jest`                                                                                                 |
| `pnpm test:watch`  | Run API tests in watch mode                      | `jest --watch`                                                                                         |
| `pnpm test:cov`    | Run API tests with coverage                      | `jest --coverage`                                                                                      |
| `pnpm test:debug`  | Run API tests in debug mode                      | `node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand` |
| `pnpm test:e2e`    | Run end-to-end tests                             | `jest --config ./test/jest-e2e.json`                                                                   |
| `pnpm lint`        | Lint the API service                             | `eslint "{src,apps,libs,test}/**/*.ts" --fix`                                                          |

## Web Scripts (`apps/web/package.json`)

The web service has its own set of scripts in `apps/web/package.json`:

| Script       | Description                            | Command      |
| ------------ | -------------------------------------- | ------------ |
| `pnpm dev`   | Start web frontend in development mode | `next dev`   |
| `pnpm build` | Build the web frontend for production  | `next build` |
| `pnpm start` | Start the built web frontend           | `next start` |
| `pnpm lint`  | Lint the web service                   | `next lint`  |

## Using Scripts

### Development Workflow

1. **Start development servers**:

   ```bash
   # Start both services
   pnpm dev

   # Or start individually
   pnpm dev:api
   pnpm dev:web
   ```

2. **Run tests**:

   ```bash
   # Run all tests
   pnpm test

   # Run tests in watch mode
   pnpm test:watch

   # Run tests for specific service
   pnpm test:api
   pnpm test:web
   ```

3. **Lint and format code**:

   ```bash
   # Lint entire project
   pnpm lint

   # Format code
   pnpm format
   ```

### Docker Workflow

1. **Start Docker services**:

   ```bash
   pnpm docker:up
   ```

2. **View logs**:

   ```bash
   pnpm docker:logs
   ```

3. **Stop Docker services**:

   ```bash
   pnpm docker:down
   ```

4. **Sync dependencies** (after adding new packages):

   ```bash
   pnpm docker:sync
   ```

### Production Workflow

1. **Build for production**:

   ```bash
   pnpm build
   ```

2. **Start in production mode**:

   ```bash
   pnpm start
   ```

### Cleaning Up

To clean build artifacts and dependencies:

```bash
# Clean all services
pnpm clean

# Clean specific service
pnpm clean:api
pnpm clean:web
```

## Filtering Packages

You can also run pnpm commands directly with filters:

```bash
# Add a package to API service
pnpm add lodash --filter api

# Add a dev dependency to web service
pnpm add -D @types/react --filter web

# Run a command in a specific service
pnpm --filter api build
```
