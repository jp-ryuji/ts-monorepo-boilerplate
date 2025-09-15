import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    root: './src',
    include: ['**/*.spec.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['**/*.(t|j)s'],
      exclude: ['node_modules/', 'dist/'],
    },
    environment: 'node',
  },
});
