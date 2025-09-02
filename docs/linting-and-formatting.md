# Linting and Formatting Standardization

This document explains the current linting and formatting setup in the monorepo and how to use it in daily development.

## Current Setup

The monorepo now has a consistent code style and quality standard across all applications:

- **Prettier**: Centralized formatting configuration at the root level
- **ESLint**: Standardized linting rules for both Web and API applications with Prettier integration
- **Ignore Files**: Properly configured ignore files to exclude generated files

## Daily Usage

### Format Code

To automatically format all files in the monorepo according to our standards:

```bash
pnpm format
```

### Check Formatting

To check if files are properly formatted without making changes:

```bash
pnpm format:check
```

### Run Linting

To run linting checks across all applications:

```bash
pnpm lint
```

These commands will run across the entire monorepo, ensuring consistent code style and quality standards throughout all applications. All developers should run these commands regularly during development and before committing changes.
