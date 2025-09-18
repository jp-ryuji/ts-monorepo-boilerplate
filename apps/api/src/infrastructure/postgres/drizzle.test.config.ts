import type { Config } from 'drizzle-kit';

export default {
  schema: './src/infrastructure/postgres/schema/index.ts',
  out: './src/infrastructure/postgres/drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    host: process.env.TEST_DB_HOST || 'localhost',
    port: Number(process.env.TEST_DB_PORT) || 5432,
    user: 'tsmono_user',
    password: 'tsmono_password',
    database: 'tsmono_db',
  },
} satisfies Config;
