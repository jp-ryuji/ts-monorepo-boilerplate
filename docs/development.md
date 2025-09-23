# Development Workflow

## Running Services

### Local Development (without Docker)

For local development, you need to have PostgreSQL and Redis running on your local machine. You can start them using Docker Compose:

```bash
# Start only PostgreSQL and Redis (not the app containers)
docker compose up -d
```

Create a `.env` file based on `.env.example` and adjust the values for local development:

```bash
cp .env.example .env
```

Then start the API:

```bash
pnpm dev:api:local
```

In another terminal, start the web frontend:

```bash
pnpm dev:web:local
```

Or start both services simultaneously:

```bash
pnpm dev:local
```

### Docker-based Development

Start database services:

```bash
docker compose up -d
```

View logs:

```bash
docker compose logs -f
```

Stop services:

```bash
docker compose down
```

## Package Management

This project uses pnpm for package management in a monorepo structure.

When adding new dependencies:

```bash
# Add a dependency to a specific workspace
pnpm add <package> --filter <workspace>

# Add a development dependency
pnpm add -D <package> --filter <workspace>

# Add a dependency shared across all workspaces
pnpm add -w <package>

# Examples:
pnpm add lodash --filter api
pnpm add -D @types/lodash --filter web
pnpm add -w zod  # Shared dependency
```

After adding new dependencies, synchronize them with Docker containers:

```bash
pnpm docker:sync
```

## Testing

Run tests for both services:

```bash
pnpm test
```

Or run tests for individual services:

```bash
pnpm test:api
pnpm test:web
```

Watch mode for development:

```bash
pnpm test:watch
```

## Code Quality

Lint the codebase:

```bash
pnpm lint
```

Format the codebase:

```bash
pnpm format
```

## Building for Production

Build both services:

```bash
pnpm build
```

Or build individual services:

```bash
pnpm build:api
pnpm build:web
```

## Database Management

This project uses Drizzle ORM for database management. The following scripts are available for database operations:

Define your database schema in: `src/db/schema/index.ts`

Generate new migration files based on schema changes:

```bash
pnpm db:generate
```

Apply migrations using Drizzle Kit:

```bash
pnpm db:migrate
```

Apply migrations programmatically:

```bash
pnpm db:migrate:programmatic
```

Open Drizzle Studio to inspect the database:

```bash
pnpm db:studio
```
