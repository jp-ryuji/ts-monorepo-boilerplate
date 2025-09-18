import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// For production, you should use a connection pool
// For development, we'll use a single connection
const client = postgres(
  process.env.DATABASE_URL ||
    'postgresql://tsmono_user:tsmono_password@localhost:5432/tsmono_db',
);
export const db = drizzle(client, { schema });
