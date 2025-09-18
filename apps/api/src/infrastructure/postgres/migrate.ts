import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

const runMigrations = async () => {
  // For migrations, we need to create a non-transactional client
  const migrationClient = postgres(
    process.env.DATABASE_URL ||
      'postgresql://tsmono_user:tsmono_password@localhost:5432/tsmono_db',
    { max: 1 },
  );

  const db = drizzle(migrationClient);

  console.log('Running migrations...');

  try {
    await migrate(db, { migrationsFolder: './drizzle' });
    console.log('Migrations completed successfully!');
  } catch (error) {
    console.error('Error running migrations:', error);
  } finally {
    await migrationClient.end();
  }
};

runMigrations();
