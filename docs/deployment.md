# Deployment

*This doc is not complete*

## Production Deployment with Docker

### Building Production Images

Build production images:

```bash
docker compose -f compose.prod.yml build
```

### Starting Production Services

Start production services:

```bash
docker compose -f compose.prod.yml up -d
```

### Stopping Production Services

Stop production services:

```bash
docker compose -f compose.prod.yml down
```

## Manual Deployment

For manual deployment without Docker:

1. Build both services:

   ```bash
   pnpm build
   ```

2. Start services:

   ```bash
   pnpm start
   ```
