# Database Migrations

This project uses Drizzle ORM for database migrations.

## Migration Scripts

### Development Database

To run migrations for the development database:

```bash
pnpm --filter api db:migrate
```

This uses the default `drizzle.config.ts` configuration which connects to the development database running in Docker.

### Test Database

To run migrations for the test database:

```bash
pnpm db:test:migrate
```

This uses the `drizzle.test.config.ts` configuration which connects to the development database. Note that this is primarily used for local development and CI environments where you might want to test migrations.

## Configuration Files

- Development Configuration: `apps/api/drizzle.config.ts`
- Test Configuration: `apps/api/drizzle.test.config.ts`
