# Project Structure

## Root Directory Structure

```plaintext
/
├── apps/
│   ├── api/              # NestJS backend API
│   └── web/              # Next.js frontend
├── docs/                 # Project documentation
├── docker/
│   ├── postgres/         # PostgreSQL initialization scripts
│   └── redis/            # Redis configuration
├── packages/             # Shared packages (currently empty)
├── compose.dev.yml       # Docker Compose for development
├── compose.prod.yml      # Docker Compose for production
├── docker/Dockerfile.dev # Development Dockerfile
├── package.json          # Root package.json with workspace scripts
├── pnpm-workspace.yaml   # pnpm workspace configuration
└── .env.example          # Environment variables template
```

## Apps Directory

### API Service (`apps/api/`)

The API service is a NestJS application with the following structure:

```plaintext
apps/api/
├── prisma/              # Prisma schema and migrations
│   ├── migrations/      # Database migration files
│   └── schema.prisma    # Prisma schema definition
├── generated/           # Generated Prisma Client
├── src/                 # Source code
│   ├── prisma/          # Prisma module and service
│   ├── users/           # Users module, controller, and service
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   └── main.ts
├── test/                # Test files
├── .env                 # Environment variables
├── package.json         # API-specific dependencies and scripts
└── tsconfig.json        # TypeScript configuration
```

Key components:

- **Prisma integration**: Database schema, migrations, and generated client
- **Modular architecture**: Feature modules like `users/`
- **NestJS patterns**: Controllers, services, and modules

### Web Service (`apps/web/`)

The web service is a Next.js application:

```plaintext
apps/web/
├── public/              # Static assets
├── src/                 # Source code
│   ├── components/      # React components
│   ├── pages/           # Page components
│   ├── app/             # App router components
│   └── styles/          # CSS styles
├── next.config.ts       # Next.js configuration
├── package.json         # Web-specific dependencies and scripts
└── tsconfig.json        # TypeScript configuration
```

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
