#!/bin/bash

# Script to sync dependencies between local and container environments

echo "Syncing dependencies to Docker containers..."

# Sync API dependencies
echo "Syncing API dependencies..."
docker exec -it tsmono-api-dev pnpm install

# Sync Web dependencies
echo "Syncing Web dependencies..."
docker exec -it tsmono-web-dev pnpm install

echo "Dependency sync completed!"
