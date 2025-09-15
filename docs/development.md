# Development Workflow

## Running Services

### Local Development (without Docker)

Start the API:

```bash
pnpm dev:api
```

In another terminal, start the web frontend:

```bash
pnpm dev:web
```

Or start both services simultaneously:

```bash
pnpm dev
```

Note: When running locally without Docker, you'll need to have PostgreSQL running externally or update the DATABASE_URL in `apps/api/.env` to point to your external database.

### Docker-based Development

Start all services:

```bash
docker compose -f compose.dev.yml up -d
```

View logs:

```bash
docker compose -f compose.dev.yml logs -f
```

Stop services:

```bash
docker compose -f compose.dev.yml down
```

## Database Management

This project uses Prisma as the ORM with PostgreSQL for local development. Here's how to work with the database:

### Initial Setup

When setting up the project for the first time, start the Docker services and run the initial migration:

```bash
# Start Docker services
pnpm docker:up

# Run initial migration (after services are healthy)
pnpm prisma:migrate:dev
```

This will:

1. Connect to the PostgreSQL database running in Docker
2. Apply the initial migration
3. Generate the Prisma Client

### Database Seeding

To seed the database with sample data:

```bash
pnpm prisma:seed
```

This will create sample users and posts for testing purposes.

### Making Schema Changes

When you need to modify the database schema:

1. Update the Prisma schema in `apps/api/prisma/schema.prisma`
2. Create and apply a new migration:

   ```bash
   pnpm prisma:migrate:dev
   ```

3. The Prisma Client will be automatically regenerated

### Database Management Tools

Open Prisma Studio to visually manage your database:

```bash
pnpm prisma:studio
```

This opens a web interface where you can:

- View and edit data
- Create and delete records
- Understand relationships between tables

Note: Prisma Studio will connect to the PostgreSQL database as configured in your environment variables.

## Package Management

This project uses pnpm for package management in a monorepo structure.

When adding new dependencies:

```bash
# Add a dependency to a specific workspace
pnpm add <package> --filter <workspace>

# Add a development dependency
pnpm add -D <package> --filter <workspace>

# Examples:
pnpm add lodash --filter api
pnpm add -D @types/lodash --filter web
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
