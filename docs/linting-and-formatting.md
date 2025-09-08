# Linting and Formatting Standardization

This document explains the current linting and formatting setup in the monorepo and how to use it in daily development.

## Current Setup

The monorepo now has a consistent code style and quality standard across all applications:

- **Biome**: Centralized formatting and linting configuration at the root level
- **Ignore Files**: Properly configured ignore files to exclude generated files
- **Git Hooks**: Automatic linting and formatting on commit using husky and lint-staged

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

This command runs Biome with the `check --apply` flag to fix formatting and linting issues.

Note: The `pnpm lint:fix` command is not run automatically on commit. You should run it manually when you want to auto-fix issues.

### Automatic Linting on Commit

Every time you make a commit, lint-staged will automatically:

1. Run Biome on all staged files to check formatting and linting issues (without auto-fixing)

If any issues are found, the commit will be aborted, and you'll need to manually fix the issues before committing again. You can use `pnpm lint:fix` to help with this.

These commands will run across the entire monorepo, ensuring consistent code style and quality standards throughout all applications. All developers should run these commands regularly during development and before committing changes.
