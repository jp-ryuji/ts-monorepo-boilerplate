# pnpm Monorepo with Docker

This document explains how pnpm monorepo works with Docker in this project.

## How pnpm Works in Monorepo

Unlike npm or yarn, pnpm uses a unique approach to manage dependencies in monorepos:

### Single node_modules Directory

pnpm creates a single `node_modules` directory at the root of the project rather than separate ones for each workspace. This is achieved through:

1. **Content-Addressable Storage**: Packages are stored in a global store and linked to the project
2. **Symlinks**: Dependencies are linked to workspaces via symlinks
3. **Virtual Store**: A virtual file system that makes all dependencies appear as if they're installed locally

### Workspace Dependencies

In our monorepo:

- `apps/api` - NestJS backend application
- `apps/web` - NextJS frontend application

Each workspace has its own dependencies defined in their respective `package.json` files, but all packages are stored in the root `node_modules` directory.

## Docker Volume Configuration

Our Docker setup uses a combination of bind mounts and anonymous volumes for optimal cross-platform compatibility:

```yaml
volumes:
  - .:/app # Mount entire project
  - /app/node_modules # Anonymous volume for node_modules
```

This configuration:

1. Mounts the entire project directory to `/app` in the container
2. Uses an anonymous volume for `/app/node_modules` to isolate container dependencies
3. Prevents binary compatibility issues between macOS and Alpine Linux

### Important Note About Additional Volume Mounts

Avoid creating additional anonymous volumes for subdirectories like `/app/apps/api/dist` or `/app/apps/web/.next` as this can cause file system conflicts with the bind mount of the entire project directory. This can result in errors like:

```
Error EBUSY: resource busy or locked, rmdir '/app/apps/api/dist'
```

The single anonymous volume for `/app/node_modules` is sufficient for isolating dependencies while maintaining proper file system access for build artifacts and other generated files.

## Benefits of This Approach

1. **Cross-Platform Compatibility**: Works reliably between macOS development and Alpine Linux containers
2. **File System Isolation**: Prevents issues with binary modules
3. **Source Code Synchronization**: All source code changes are immediately reflected in containers

## Workflow

When adding new packages:

1. Install new packages locally: `pnpm add <package> --filter <workspace>`
2. Update containers by running install in the container:

   ```bash
   # For API service
   docker exec -it tsmono-api-dev pnpm install

   # For Web service
   docker exec -it tsmono-web-dev pnpm install
   ```

   Or use the convenience script:

   ```bash
   pnpm docker:sync
   ```

3. No need to rebuild containers for dependency changes

### Troubleshooting

If you encounter an `EBUSY: resource busy or locked` error, check your volume configuration in `compose.dev.yml`. Ensure you're not creating additional anonymous volumes for subdirectories like `/app/apps/api/dist` or `/app/apps/web/.next`. The configuration should only include:

```yaml
volumes:
  - .:/app
  - /app/node_modules
```

## Why Not Direct node_modules Mounting?

Directly mounting `./node_modules:/app/node_modules` can cause issues:

1. **Binary Incompatibility**: Native modules compiled on macOS won't work on Alpine Linux
2. **File System Differences**: Different file systems can cause permission and performance issues
3. **Path Issues**: Different operating systems handle paths differently

The anonymous volume approach provides better isolation while still allowing immediate source code synchronization.
