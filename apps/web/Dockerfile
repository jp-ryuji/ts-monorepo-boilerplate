# ---- Base ----
FROM node:24-alpine AS base
RUN apk add --no-cache curl
RUN corepack enable && corepack prepare pnpm@10.16.1 --activate
WORKDIR /app

# ---- Dependencies ----
FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/web/package.json apps/web/
RUN pnpm install --frozen-lockfile --filter-prod web...

# ---- Build ----
FROM base AS build
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/web ./apps/web
WORKDIR /app
RUN pnpm install --frozen-lockfile
WORKDIR /app/apps/web
RUN pnpm install --frozen-lockfile
RUN npx next build

# ---- Production ----
FROM node:24-alpine AS production
WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Copy necessary files for production
COPY --from=build --chown=nextjs:nodejs /app/apps/web/.next ./.next
COPY --from=build --chown=nextjs:nodejs /app/apps/web/node_modules ./node_modules
COPY --from=build --chown=nextjs:nodejs /app/apps/web/package.json ./package.json
COPY --chown=nextjs:nodejs apps/web/public ./public

USER nextjs

EXPOSE 3001
CMD ["npx", "next", "start"]
