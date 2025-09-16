# Project Structure

## Root Directory Structure

```plaintext
/
├── apps/
│   ├── api/              # NestJS backend API
│   │   └── Dockerfile.dev # API development Dockerfile
│   └── web/              # Next.js frontend
│       └── Dockerfile.dev # Web development Dockerfile
├── docker/
│   ├── postgres/         # PostgreSQL initialization scripts
│   └── redis/            # Redis configuration
├── packages/             # Shared packages (currently empty)
├── compose.dev.yml       # Docker Compose for development
├── compose.prod.yml      # Docker Compose for production
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
│   │   ├── index.ts         # Database connection
│   │   ├── migrate.ts       # Programmatic migration script
│   │   └── schema/          # Schema definitions
│   │       └── index.ts     # All schemas
├── drizzle/                 # Generated migrations
└── drizzle.config.ts        # Drizzle configuration
```

The API uses Drizzle ORM for database operations with PostgreSQL.

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
