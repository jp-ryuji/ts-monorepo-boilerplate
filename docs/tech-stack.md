# Tech Stack

## Core Technologies

- **Monorepo**: [pnpm workspaces](https://pnpm.io/workspaces)
- **Backend**: [NestJS](https://nestjs.com/) (Node.js/TypeScript)
- **Frontend**: [Next.js](https://nextjs.org/) (React/TypeScript)
- **Database**: [PostgreSQL](https://www.postgresql.org/) with [Prisma](https://www.prisma.io/) ORM
- **Caching**: [Redis](https://redis.io/)
- **Containerization**: [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)
- **Package Manager**: [pnpm](https://pnpm.io/)

## Development Tools

- **Language**: TypeScript
- **Code Quality**: Biome (Linting and Formatting)
- **Testing**: Vitest
- **Build Tools**: pnpm scripts

## Why This Stack?

### pnpm Workspaces

- Efficient disk space usage through content-addressable storage
- Fast installation times
- Strict dependency resolution preventing conflicts

### NestJS

- Progressive Node.js framework with TypeScript support
- Modular architecture promoting code organization
- Built-in support for dependency injection
- Excellent TypeScript integration

### Next.js

- React-based framework with hybrid static & server rendering
- File-based routing system
- API routes for backend functionality
- Built-in optimization features

### PostgreSQL with Prisma

- Robust relational database for production workloads
- Type-safe database client with Prisma ORM
- Easy database migrations and schema management
- Consistent development and production environments

### Redis

- In-memory data structure store for caching
- High performance for frequently accessed data
- Session storage and pub/sub capabilities
