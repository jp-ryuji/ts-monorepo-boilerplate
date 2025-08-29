# ---- Base ----
FROM node:22-alpine AS base
RUN apk add --no-cache curl
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate
WORKDIR /app

# ---- Dependencies ----
FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/web/package.json apps/web/
RUN pnpm install --frozen-lockfile --filter-prod web...

# ---- Build ----
FROM deps AS build
COPY . .
RUN pnpm --filter web build

# ---- Production ----
FROM node:22-alpine AS production
WORKDIR /app

# Copy standalone Next.js output
COPY --from=build /app/apps/web/.next/standalone ./
COPY --from=build /app/apps/web/.next/static ./apps/web/.next/static
COPY apps/web/public ./apps/web/public

EXPOSE 3001
CMD ["node", "apps/web/server.js"]
