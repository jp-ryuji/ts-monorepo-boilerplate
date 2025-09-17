# Project Structure

## Root Directory Structure

```plaintext
/
├── apps/
│   ├── api/              # NestJS backend API
│   └── web/              # Next.js frontend
├── docker/               # Docker configurations
├── packages/             # Shared packages (currently empty)
├── compose.dev.yml       # Docker Compose for development
├── package.json          # Root package.json with workspace scripts
├── pnpm-workspace.yaml   # pnpm workspace configuration
└── .env.example          # Environment variables template
```

## Apps Directory

### API Service (`apps/api/`)

- NestJS application

#### Database Layer (Drizzle ORM)

```plaintext
apps/api/
├── src/
│   ├── db/
│   │   ├── index.ts           # Database connection
│   │   ├── migrate.ts         # Programmatic migration script
│   │   ├── database.module.ts # Database module for NestJS
│   │   └── schema/            # Schema definitions
│   │       └── index.ts       # All schemas
├── drizzle/                   # Generated migrations
└── drizzle.config.ts          # Drizzle configuration
```

The API uses Drizzle ORM for database operations with PostgreSQL.

#### Testing

```plaintext
apps/api/
├── src/
│   ├── test-utils/
│   │   ├── database-test.setup.ts  # Database test setup
│   │   └── vitest.setup.ts         # Vitest setup file
│   └── user/
│       └── user.service.integration.test.ts  # Integration tests for user service
├── drizzle.test.config.ts          # Drizzle configuration for tests
└── vitest.config.mts               # Vitest configuration
```

The API includes integration tests that run against a real PostgreSQL database.

### Web Service (`apps/web/`)

- Next.js application
- React components

## Docker Directory

### PostgreSQL (`docker/postgres/`)

- Database initialization scripts
- Schema definitions
- Seed data

### Redis (`docker/redis/`)

- Redis configuration files
- Custom settings

## Packages Directory

Intended for shared packages across services:

- Common utilities
- Shared types and interfaces
- Business logic modules
