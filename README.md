# SaaS Monorepo Boilerplate

A monorepo boilerplate for SaaS applications with NestJS API and Next.js frontend, using Docker for containerization and pnpm for package management.

## Table of Contents

- [SaaS Monorepo Boilerplate](#saas-monorepo-boilerplate)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Project Structure](#project-structure)
  - [Tech Stack](#tech-stack)
  - [Prerequisites](#prerequisites)
  - [Getting Started](#getting-started)
    - [Installation](#installation)
    - [Environment Setup](#environment-setup)
  - [Development](#development)
    - [Running Services Locally](#running-services-locally)
    - [Running Services with Docker](#running-services-with-docker)
  - [Docker Configuration](#docker-configuration)
    - [Development (`compose.dev.yml`)](#development-composedevyml)
    - [Production (`compose.prod.yml`)](#production-composeprodyml)
  - [Available Scripts](#available-scripts)
    - [Root Scripts (`package.json`)](#root-scripts-packagejson)
    - [API Scripts (`apps/api/package.json`)](#api-scripts-appsapipackagejson)
    - [Web Scripts (`apps/web/package.json`)](#web-scripts-appswebpackagejson)
  - [Project Structure Details](#project-structure-details)
    - [API Service (`apps/api/`)](#api-service-appsapi)
    - [Web Service (`apps/web/`)](#web-service-appsweb)
  - [Testing](#testing)
  - [Deployment](#deployment)
    - [Production Deployment with Docker](#production-deployment-with-docker)
    - [Manual Deployment](#manual-deployment)

## Overview

This boilerplate provides a complete starting point for building SaaS applications with a modern tech stack. It includes a NestJS backend API, Next.js frontend, PostgreSQL database, and Redis for caching, all containerized with Docker for easy development and deployment.

## Project Structure

```plaintext
/
├── apps/
│   ├── api/              # NestJS backend API
│   └── web/              # Next.js frontend
├── docker/
│   ├── postgres/         # PostgreSQL initialization scripts
│   └── redis/            # Redis configuration
├── packages/             # Shared packages (currently empty)
├── docker/Dockerfile.dev # Development Dockerfile
├── compose.dev.yml       # Docker Compose for development
├── compose.prod.yml      # Docker Compose for production
├── package.json          # Root package.json with workspace scripts
├── pnpm-workspace.yaml   # pnpm workspace configuration
└── .env.example          # Environment variables template
```

## Tech Stack

- **Monorepo**: pnpm workspaces
- **Backend**: NestJS (Node.js/TypeScript)
- **Frontend**: Next.js (React/TypeScript)
- **Database**: PostgreSQL
- **Caching**: Redis
- **Containerization**: Docker & Docker Compose
- **Package Manager**: pnpm
- **Deployment**: Docker-based deployment ready

## Prerequisites

- Node.js >= 22.0.0
- pnpm >= 9.0.0
- Docker & Docker Compose
- Git

## Getting Started

### Installation

1. Clone the repository:

   ```bash
   git clone git@github.com:jp-ryuji/saas-monorepo-boilerplate.git
   cd saas-monorepo-boilerplate
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

### Environment Setup

1. Copy the example environment file:

   ```bash
   cp .env.example .env
   ```

2. Update the `.env` file with your configuration values.

## Development

### Running Services Locally

For local development without Docker:

1. Start the API:

   ```bash
   pnpm dev:api
   ```

2. In another terminal, start the web frontend:

   ```bash
   pnpm dev:web
   ```

3. Or start both services simultaneously:

   ```bash
   pnpm dev
   ```

### Running Services with Docker

For Docker-based development:

1. Start all services:

   ```bash
   docker compose -f compose.dev.yml up -d
   ```

2. View logs:

   ```bash
   docker compose -f compose.dev.yml logs -f
   ```

3. Stop services:

   ```bash
   docker compose -f compose.dev.yml down
   ```

## Docker Configuration

### Development (`compose.dev.yml`)

- Uses `docker/Dockerfile.dev` with build arguments
- Runs services in development mode with hot-reloading

### Production (`compose.prod.yml`)

- Uses individual service Dockerfiles (`apps/*/Dockerfile`)
- Optimized production builds
- Multi-stage builds for smaller images
- Production environment settings

## Available Scripts

### Root Scripts (`package.json`)

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start both API and web in development mode |
| `pnpm dev:api` | Start only the API service |
| `pnpm dev:web` | Start only the web service |
| `pnpm build` | Build both services |
| `pnpm build:api` | Build only the API service |
| `pnpm build:web` | Build only the web service |
| `pnpm start` | Start both services in production mode |
| `pnpm test` | Run tests for both services |
| `pnpm lint` | Lint both services |
| `pnpm docker:up` | Start Docker services |
| `pnpm docker:down` | Stop Docker services |
| `pnpm docker:build` | Build Docker images |
| `pnpm docker:logs` | View Docker logs |

### API Scripts (`apps/api/package.json`)

| Script | Description |
|--------|-------------|
| `pnpm start:dev` | Start API in development mode with hot-reloading |
| `pnpm build` | Build the API for production |
| `pnpm start` | Start the built API |
| `pnpm test` | Run API tests |

### Web Scripts (`apps/web/package.json`)

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start web frontend in development mode |
| `pnpm build` | Build the web frontend for production |
| `pnpm start` | Start the built web frontend |

## Project Structure Details

### API Service (`apps/api/`)

- NestJS application
- TypeScript

### Web Service (`apps/web/`)

- Next.js application
- React with TypeScript
- Tailwind CSS for styling

## Testing

Run tests for both services:

```bash
pnpm test
```

Or run tests for individual services:

```bash
pnpm test:api
pnpm test:web
```

Watch mode for development:

```bash
pnpm test:watch
```

## Deployment

### Production Deployment with Docker

1. Build production images:

   ```bash
   docker compose -f compose.prod.yml build
   ```

2. Start production services:

   ```bash
   docker compose -f compose.prod.yml up -d
   ```

### Manual Deployment

1. Build both services:

   ```bash
   pnpm build
   ```

2. Start services:

   ```bash
   pnpm start
   ```
