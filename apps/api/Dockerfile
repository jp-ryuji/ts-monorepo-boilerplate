# ---- Base ----
FROM node:24-alpine AS base
RUN apk add --no-cache curl
RUN corepack enable && corepack prepare pnpm@10.16.1 --activate
WORKDIR /app

# ---- Dependencies ----
FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api/package.json apps/api/
RUN pnpm install --frozen-lockfile --filter-prod api...

# ---- Development ----
FROM deps AS development
COPY . .
WORKDIR /app/apps/api

EXPOSE 3000
CMD ["pnpm", "run", "start:dev"]

# ---- Build ----
FROM base AS build
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api ./apps/api
WORKDIR /app
RUN pnpm install --frozen-lockfile
WORKDIR /app/apps/api
RUN pnpm install --frozen-lockfile
RUN ls -la
ENV NODE_ENV=production
RUN npx tsc -p ./tsconfig.build.json

# ---- Production ----
FROM node:24-alpine AS production
WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S -u 1001 -G nodejs nodejs

# Copy only production node_modules
COPY --from=deps --chown=nodejs:nodejs /app/node_modules ./node_modules
# Copy dist from build
COPY --from=build --chown=nodejs:nodejs /app/apps/api/dist ./dist
COPY --chown=nodejs:nodejs apps/api/package.json ./

USER nodejs

EXPOSE 3000
CMD ["node", "dist/main"]
