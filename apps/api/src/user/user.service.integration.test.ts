import { Test, type TestingModule } from '@nestjs/testing';
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { DATABASE_CONNECTION } from '../db/database.module';
import { DatabaseTestSetup } from '../test-utils/database-test.setup';
import { UserService } from './user.service';

describe('UserService Integration Tests', () => {
  let service: UserService;
  let module: TestingModule;
  let dbSetup: DatabaseTestSetup;

  beforeAll(async () => {
    // Use DatabaseTestSetup to create a PostgreSQL container for integration tests
    dbSetup = new DatabaseTestSetup();
    await dbSetup.setup();

    module = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: DATABASE_CONNECTION,
          useValue: dbSetup.db,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  }, 120000); // Increase timeout to 2 minutes for container startup

  afterAll(async () => {
    if (module) {
      await module.close();
    }
    if (dbSetup) {
      await dbSetup.cleanup();
    }
  });

  beforeEach(async () => {
    // Clear tables before each test
    if (dbSetup) {
      await dbSetup.clearTables();
    }
  });

  describe('createUser and getUserById', () => {
    it('should create a user and find it by id', async () => {
      const userData = {
        email: 'test@example.com',
        name: 'Test User',
      };

      const createdUser = await service.createUser(
        userData.name,
        userData.email,
      );

      expect(createdUser).toBeDefined();
      expect(createdUser.id).toBeDefined();
      expect(createdUser.email).toBe(userData.email);
      expect(createdUser.name).toBe(userData.name);

      const foundUser = await service.getUserById(createdUser.id);

      expect(foundUser).toBeDefined();
      expect(foundUser?.id).toBe(createdUser.id);
      expect(foundUser?.email).toBe(userData.email);
      expect(foundUser?.name).toBe(userData.name);
    });

    it('should return undefined when user not found', async () => {
      const foundUser = await service.getUserById(999);
      expect(foundUser).toBeUndefined();
    });
  });
});
