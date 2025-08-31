# ---- Base ----
FROM node:22-alpine AS base
RUN apk add --no-cache curl
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate
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
FROM deps AS build
COPY . .
RUN pnpm --filter api build

# ---- Production ----
FROM node:22-alpine AS production
WORKDIR /app

# Copy only production node_modules
COPY --from=deps /app/node_modules ./node_modules
# Copy dist from build
COPY --from=build /app/apps/api/dist ./dist
COPY apps/api/package.json ./

EXPOSE 3000
CMD ["node", "dist/main"]
