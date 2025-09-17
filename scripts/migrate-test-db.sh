#!/bin/bash

# Run database migrations for the test database
cd "$(dirname "$0")/../apps/api"
npx drizzle-kit migrate --config=drizzle.test.config.ts