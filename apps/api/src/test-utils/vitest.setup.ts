import { afterAll, beforeAll } from 'vitest';

beforeAll(async () => {
  console.log('Starting API test suite...');
});

afterAll(async () => {
  console.log('API test suite completed.');
});

process.env.NODE_ENV = 'test';
