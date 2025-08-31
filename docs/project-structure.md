# Project Structure

## Root Directory Structure

```plaintext
/
├── apps/
│   ├── api/              # NestJS backend API
│   └── web/              # Next.js frontend
├── docker/
│   ├── postgres/         # PostgreSQL initialization scripts
│   └── redis/            # Redis configuration
├── packages/             # Shared packages (currently empty)
├── docker/Dockerfile.dev # Development Dockerfile
├── compose.dev.yml       # Docker Compose for development
├── compose.prod.yml      # Docker Compose for production
├── package.json          # Root package.json with workspace scripts
├── pnpm-workspace.yaml   # pnpm workspace configuration
└── .env.example          # Environment variables template
```

## Apps Directory

### API Service (`apps/api/`)

- NestJS application
- REST API endpoints

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

## Configuration Files

- `package.json`: Root package configuration with workspace scripts
- `pnpm-workspace.yaml`: Defines workspace packages
- `compose.dev.yml`: Development Docker Compose configuration
- `compose.prod.yml`: Production Docker Compose configuration
- `.env.example`: Template for environment variables
