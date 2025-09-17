import { execSync } from 'node:child_process';
import {
  PostgreSqlContainer,
  type StartedPostgreSqlContainer,
} from '@testcontainers/postgresql';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '../db/schema';

export class DatabaseTestSetup {
  private container: StartedPostgreSqlContainer;
  private client: postgres.Sql;
  public db: ReturnType<typeof drizzle>;

  async setup(): Promise<void> {
    this.container = await new PostgreSqlContainer('postgres:17')
      .withDatabase('tsmono_db')
      .withUsername('tsmono_user')
      .withPassword('tsmono_password')
      .start();

    // Create database connection
    const connectionString = this.container.getConnectionUri();
    this.client = postgres(connectionString);
    this.db = drizzle(this.client, { schema });

    // Sync schema using drizzle-kit
    await this.syncSchema(connectionString);
  }

  private async syncSchema(connectionString: string): Promise<void> {
    // Set only the environment variables that the config file actually uses
    const url = new URL(connectionString);
    process.env.TEST_DB_HOST = url.hostname;
    process.env.TEST_DB_PORT = url.port;
    // Note: We don't need to set TEST_DB_USER, TEST_DB_PASSWORD, TEST_DB_NAME
    // because the config file uses fixed values for these

    // Run drizzle-kit push command with the existing config file
    execSync('npx drizzle-kit push --config=drizzle.test.config.ts', {
      cwd: process.cwd(),
      stdio: 'inherit',
    });
  }

  async cleanup(): Promise<void> {
    if (this.client) {
      await this.client.end();
    }
    if (this.container) {
      await this.container.stop();
    }
  }

  async clearTables(): Promise<void> {
    await this.db.delete(schema.users);
  }

  getConnectionString(): string {
    return this.container.getConnectionUri();
  }
}
