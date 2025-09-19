# Linting and Formatting Standardization

This document explains the current linting and formatting setup in the monorepo and how to use it in daily development.

## Current Setup

The monorepo now has a consistent code style and quality standard across all applications:

- **Biome**: Centralized formatting and linting configuration at the root level
- **Ignore Files**: Properly configured ignore files to exclude generated files
- **Git Hooks**: Automatic linting and formatting on commit using lefthook

## Daily Usage

### Check Code Quality (Linting)

To check both formatting and linting issues across the entire monorepo:

```bash
pnpm lint
```

This command runs Biome with the `check` command to verify both formatting and linting issues.

### Fix Code Quality Issues (Linting with Auto-fix)

To automatically fix both formatting and linting issues:

```bash
pnpm lint:fix
```

This command runs Biome with the `check --write` flag to fix formatting and linting issues.

Note: The `pnpm lint:fix` command is not run automatically on commit. You should run it manually when you want to auto-fix issues.

### Automatic Linting on Commit

Every time you make a commit, lefthook will automatically:

1. Run Biome on all staged files to check formatting and linting issues (without auto-fixing)

If any issues are found, the commit will be aborted, and you'll need to manually fix the issues before committing again. You can use `pnpm lint:fix` to help with this.

These commands will run across the entire monorepo, ensuring consistent code style and quality standards throughout all applications. All developers should run these commands regularly during development and before committing changes.

## Migration from ESLint and Prettier

This project has been migrated from ESLint and Prettier to Biome for all linting and formatting needs. You might still see some references to ESLint-related packages in the `pnpm-lock.yaml` file, but these are only transitive dependencies (dependencies of other packages we use) and not direct dependencies of our project.

The presence of these transitive dependencies is completely normal and harmless:

- Many popular packages in the Node.js ecosystem still depend on ESLint-related packages
- `next` (Next.js) includes ESLint plugins for built-in linting
- `@nestjs/schematics` may include ESLint configurations for generated code
- Various TypeScript type definition packages (`@types/eslint`, `@types/eslint-scope`) are used by other tools

To confirm the migration is complete:

1. ✅ No direct ESLint or Prettier dependencies in any `package.json`
2. ✅ All scripts now use Biome commands
3. ✅ No ESLint or Prettier configuration files in source directories
4. ✅ Documentation has been updated to reference Biome

The only references to ESLint/Prettier that remain are in `pnpm-lock.yaml` as transitive dependencies and in `node_modules` as dependencies of other packages. This is the normal state for a modern Node.js project that has migrated away from ESLint/Prettier to Biome.
