import { POST_REPOSITORY } from '@domain/post/post.repository';
import { USER_REPOSITORY } from '@domain/user/user.repository';
import { Global, Module } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { PgPostRepository } from './repository/pg-post.repository';
import { PgUserRepository } from './repository/pg-user.repository';
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
    {
      provide: USER_REPOSITORY,
      useFactory: (db: any) => {
        return new PgUserRepository(db);
      },
      inject: [DATABASE_CONNECTION],
    },
    {
      provide: POST_REPOSITORY,
      useFactory: (db: any) => {
        return new PgPostRepository(db);
      },
      inject: [DATABASE_CONNECTION],
    },
  ],
  exports: [DATABASE_CONNECTION, USER_REPOSITORY, POST_REPOSITORY],
})
export class DatabaseModule {}
