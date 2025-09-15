# Prisma Configuration

This project uses [Prisma](https://www.prisma.io/) as the ORM (Object-Relational Mapping) tool for database operations. Prisma provides type-safe database access and helps with database schema management through migrations.

## Database Setup

The project is configured to use PostgreSQL for both development and production. The database configuration can be found in `apps/api/prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

The database URL is loaded from the environment variable `DATABASE_URL` which is defined in `apps/api/.env`:

```bash
DATABASE_URL="postgresql://tsmono_user:tsmono_password@localhost:5433/tsmono_db?schema=public"
```

This URL matches the PostgreSQL service configured in `compose.dev.yml`:

## Prisma Schema

The Prisma schema defines the database models and their relationships. Currently, the schema includes two models for testing purpose:

1. **User** - Represents application users
2. **Post** - Represents blog posts authored by users

Each model has fields with appropriate types and constraints. For example, the User model has an auto-incrementing ID, unique email, optional name, and timestamps for creation and updates.

## Prisma Client

Prisma Client is an auto-generated type-safe query builder that's tailored to your schema. It's generated in `apps/api/generated/prisma` and can be imported and used in your services:

```typescript
import { PrismaService } from '../prisma/prisma.service';

// In your service
constructor(private prisma: PrismaService) {}

async createUser(data: { email: string; name?: string }) {
  return this.prisma.user.create({ data });
}
```

## Available Scripts

The project includes several convenient scripts for working with Prisma:

### Generate Prisma Client

```bash
pnpm prisma:generate
```

This command generates the Prisma Client based on your schema. It's automatically run after migrations.

### Development Migrations

```bash
pnpm prisma:migrate:dev
```

This command creates a new migration based on changes to your Prisma schema and applies it to your development database. You'll be prompted to give the migration a name.

### Deploy Migrations

```bash
pnpm prisma:migrate:deploy
```

This command applies pending migrations to the database. It's typically used in production or CI/CD environments.

### Prisma Studio

```bash
pnpm prisma:studio
```

Prisma Studio is a visual editor for your database. It opens in your browser and allows you to view and edit data directly.

## Adding New Models

To add new models to your database:

1. Update `apps/api/prisma/schema.prisma` with your new model definition
2. Run `pnpm prisma:migrate:dev` to create and apply a migration
3. The Prisma Client will be automatically regenerated

Example of adding a new model:

```prisma
model Category {
  id        Int      @id @default(autoincrement())
  name      String   @unique
  posts     Post[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## Working with Different Databases

While the project uses PostgreSQL for development, you can configure it to work with other databases like MySQL or SQLite:

1. Update the `provider` in the datasource block in `schema.prisma`
2. Update the `DATABASE_URL` in your `.env` file to point to your database
3. Create new migrations for the target database

Example for SQLite:

```prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```

And in your `.env`:

```bash
DATABASE_URL="file:./prisma/dev.db"
```

## Best Practices

1. **Always run migrations**: When changing the schema, always create migrations to track changes
2. **Use environment variables**: Keep database URLs in environment variables for security
3. **Regularly generate the client**: After schema changes, regenerate the Prisma Client
4. **Backup production data**: Always backup production data before running migrations
5. **Test migrations**: Test your migrations in a staging environment before production

For more information on Prisma, refer to the [official documentation](https://www.prisma.io/docs/).
