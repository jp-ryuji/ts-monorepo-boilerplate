# Development Workflow

## Prerequisites

Before starting development, ensure you have the following installed:

- Node.js >= 22.0.0
- pnpm >= 9.0.0
- Docker & Docker Compose
- Git

## Initial Setup

1. Clone the repository:

   ```bash
   git clone git@github.com:jp-ryuji/saas-monorepo-boilerplate.git
   cd saas-monorepo-boilerplate
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Set up environment variables:

   ```bash
   cp .env.example .env
   ```

   Update the `.env` file with your configuration values.

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
