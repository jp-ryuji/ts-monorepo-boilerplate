import { Global, Module } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

export const DATABASE_CONNECTION = 'DATABASE_CONNECTION';

@Global()
@Module({
  providers: [
    {
      provide: DATABASE_CONNECTION,
      useFactory: async () => {
        const connectionString =
          process.env.DATABASE_URL ||
          'postgresql://tsmono_user:tsmono_password@localhost:5432/tsmono_db';
        const client = postgres(connectionString);
        return drizzle(client, { schema });
      },
    },
  ],
  exports: [DATABASE_CONNECTION],
})
export class DatabaseModule {}
