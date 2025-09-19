# AI Collaboration Guide

This document provides essential context for AI models interacting with this project. Adhering to these guidelines will ensure consistency and maintain code quality.

## 1. Project Overview & Purpose

* **Primary Goal:** This is a full-stack monorepo boilerplate project. It consists of a NestJS backend API and a Next.js frontend application, designed to provide a modern, scalable, and maintainable starting point for TypeScript projects.
* **Business Domain:** This is a generic boilerplate and not tied to a specific business domain. It provides a foundation that can be adapted for various application types.

## 2. Core Technologies & Stack

* **Languages:** TypeScript
* **Frameworks & Runtimes:**
  * **Backend:** NestJS with Fastify, running on Node.js v24+
  * **Frontend:** Next.js 15, React 19
* **Databases:** PostgreSQL (primary), Redis (caching)
* **Key Libraries/Dependencies:**
  * **Backend:** Drizzle ORM (for database access), Zod (for validation)
  * **Frontend:** Tailwind CSS
  * **Testing:** Vitest, Testing Library, Testcontainers (for isolated DB testing)
* **Package Manager(s):** pnpm (v10.16.1+)

## 3. Architectural Patterns

* **Overall Architecture:** Monorepo architecture managed with pnpm workspaces. The project is structured as a full-stack application with a distinct backend (`api`) and frontend (`web`).
* **API Architecture:** The backend follows the **Onion Architecture** pattern, emphasizing a separation of concerns between the domain, application, and infrastructure layers.
  * **Domain Layer:** Contains core business logic, entities, and repository interfaces (ports). It is framework-agnostic.
  * **Application Layer:** Contains use cases that orchestrate the domain logic.
  * **Infrastructure Layer:** Contains technical implementations like database repositories (adapters), external service integrations, and framework-specific code (NestJS modules, controllers).
* **Directory Structure Philosophy:**
  * `/apps`: Contains the individual applications (services) of the monorepo.
    * `/apps/api`: The NestJS backend application, structured according to Onion Architecture.
    * `/apps/web`: The Next.js frontend application.
  * `/packages`: Intended for shared code, types, or components between the applications.
  * `/docker`: Contains Docker configurations for services like PostgreSQL and Redis.
  * `/docs`: Contains all project documentation.
  * `/.github/workflows`: CI/CD pipeline definitions for GitHub Actions.

## 4. Coding Conventions & Style Guide

* **Formatting & Linting:** Managed exclusively by **Biome**. The project has migrated away from ESLint and Prettier.
  * **Configuration:** `biome.json` in the root directory.
  * **Key Styles:** 2-space indentation, 80-char line width, single quotes, always semicolons, all trailing commas.
  * **Git Hooks:** `lefthook` is configured to run Biome on staged files before committing, ensuring all committed code is compliant.
* **Naming Conventions:**
  * `files`: kebab-case (e.g., `user.controller.ts`)
  * `classes`, `components`: PascalCase (e.g., `AppModule`, `CreateUserDto`)
  * `variables`, `functions`: camelCase (e.g., `setupSwagger`)
* **API Design:** RESTful principles. A global prefix of `/api` is applied to all backend routes. DTOs (Data Transfer Objects) are used for request/response validation. OpenAPI (Swagger) documentation is available at `/api-docs` in development.
* **Error Handling:** Standard NestJS exception filters are used.

## 5. Key Files & Entrypoints

* **Main Entrypoint(s):**
  * **API:** `apps/api/src/main.ts`
  * **Web:** Next.js pages under `apps/web/src/app/`
* **Configuration:**
  * **Environment:** `.env` (based on `.env.example`)
  * **Workspaces:** `pnpm-workspace.yaml`
  * **Formatting/Linting:** `biome.json`
  * **Git Hooks:** `lefthook.yml`
  * **Local Development:** `compose.dev.yml`
* **CI/CD Pipeline:**
  * `/.github/workflows/api-ci.yml`
  * `/.github/workflows/web-ci.yml`

## 6. Development & Testing Workflow

* **Local Development Environment:** The project can be run locally using `pnpm dev` or via Docker using `docker compose -f compose.dev.yml up`. The Docker setup is the recommended approach for a consistent environment.
* **Testing:**
  * **Framework:** Vitest is used for both the API and web applications.
  * **API Test Types:**
    * **Unit Tests:** For individual components in isolation.
    * **Integration Tests (`.integration.test.ts`):** Test interactions between modules with a real, isolated PostgreSQL database managed by **Testcontainers**.
    * **End-to-End (E2E) Tests:** Test the complete API endpoints.
  * **Test Data:** Use the provided test data factories in `apps/api/src/test-utils/factories` to create consistent and realistic test data. Use `build()` for unit tests and `create()` for integration tests.
  * **Commands:**
    * Run all tests: `pnpm test`
    * Run API integration tests: `pnpm test:api:integration`
    * Run API E2E tests: `pnpm test:e2e`
* **Database Migrations:** Drizzle ORM is used for migrations.
  * Generate migrations: `pnpm db:generate`
  * Apply migrations: `pnpm db:migrate`
* **CI/CD Process:** GitHub Actions are configured to run linting, building, and testing for the `api` and `web` applications independently on pushes and pull requests to the `main` branch.

## 7. Specific Instructions for AI Collaboration

* **Contribution Guidelines:** All code MUST be formatted and linted with Biome before committing. The pre-commit hook managed by `lefthook` will enforce this. You can manually run `pnpm lint:fix` to automatically fix most issues.
* **Infrastructure (IaC):** The project uses Docker for containerization. Modifications to `compose.dev.yml` or files in the `/docker` directory will affect the local development environment.
* **Security:** Do not hardcode secrets or keys. Use environment variables for all sensitive information.
* **Dependencies:**
  * Use `pnpm add <package> --filter <workspace>` to add a dependency to a specific app (e.g., `api` or `web`).
  * Use `pnpm add -w <package>` to add a dependency to the root, making it available to all workspaces.
  * After adding dependencies, run `pnpm docker:sync` if you are using the Docker environment to update the container's `node_modules`.
* **Commit Messages:** Aim for clear and descriptive commit messages. Following the [Conventional Commits](https://www.conventionalcommits.org/) specification is highly recommended.
* **Writing Tests:** When adding features, corresponding tests are required. For database-dependent logic in the API, prefer writing integration tests using the Testcontainers setup and the provided data factories.
