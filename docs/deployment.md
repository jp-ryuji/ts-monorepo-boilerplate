# Deployment

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

## Environment Configuration

Ensure all environment variables are properly configured for production:

- Database connection strings
- API keys and secrets
- Port configurations
- Redis connection settings

## Scaling Considerations

For production deployments, consider:

1. Load balancing for the web service
2. Database connection pooling
3. Redis clustering for caching
4. Health checks and monitoring
5. Backup and recovery procedures
