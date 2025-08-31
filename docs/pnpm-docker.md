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

Our Docker setup uses bind mounts to ensure immediate reflection of package changes:

```yaml
volumes:
  - .:/app                  # Mount entire project
  - ./node_modules:/app/node_modules  # Mount local node_modules directly
```

This configuration:
1. Mounts the entire project directory to `/app` in the container
2. Directly mounts the local `node_modules` to the container's `node_modules`
3. Ensures any package installations or updates are immediately available in the container

## Benefits of This Approach

1. **No Rebuilds Needed**: Adding new packages locally immediately makes them available in containers
2. **No Manual Installation**: No need to run `pnpm install` in containers after local installs
3. **Efficient Storage**: pnpm's approach reduces disk space usage
4. **Consistent Dependencies**: All workspaces share the same dependency resolution

## Workflow

1. Install new packages locally: `pnpm add <package> --filter <workspace>`
2. Changes are immediately reflected in running containers
3. No need to restart containers or rebuild images for dependency changes

## Important Notes

- This setup works best when your local environment matches the container environment
- Initial package installation should be done in the container to ensure proper binary compilation
- pnpm's approach ensures each workspace gets the correct dependencies despite sharing a single node_modules directory