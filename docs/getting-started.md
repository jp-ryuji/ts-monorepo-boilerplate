# Getting Started

## Prerequisites

Before you begin development with this boilerplate, ensure you have the following installed on your system:

- **Node.js** >= 22.0.0
- **pnpm** >= 9.0.0
- **Docker** & **Docker Compose**
- **Git**

### Installing Node.js

We recommend using a Node.js version manager like `nvm` or `fnm` to manage your Node.js versions:

Using nvm:

```bash
# Install nvm if you haven't already
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Install and use the required Node.js version
nvm install 22
nvm use 22
```

### Installing pnpm

pnpm is a fast, disk space efficient package manager. Install it globally using npm:

```bash
npm install -g pnpm@9.0.0
```

Or using the standalone script:

```bash
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

### Installing Docker

Download and install Docker Desktop for your platform:

- [Docker Desktop for macOS](https://docs.docker.com/docker-for-mac/install/)
- [Docker Desktop for Windows](https://docs.docker.com/docker-for-windows/install/)
- [Docker Engine for Linux](https://docs.docker.com/engine/install/)

## Installation

1. Clone the repository:

   ```bash
   git clone git@github.com:jp-ryuji/saas-monorepo-boilerplate.git
   cd saas-monorepo-boilerplate
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

   This command will install all dependencies for all workspaces in the monorepo.

## Environment Setup

The project uses environment variables for configuration. To set up your environment:

1. Copy the example environment file:

   ```bash
   cp .env.example .env
   ```

2. Update the `.env` file according to your local setup.

## Verification

After completing the installation and environment setup, you can verify everything is working correctly:

1. Check that all dependencies are installed:

   ```bash
   pnpm list
   ```

2. Verify Docker is running:

   ```bash
   docker --version
   docker compose version
   ```

3. Test the database connection (if running):

   ```bash
   # This will work if you've started the development containers
   docker compose -f compose.dev.yml exec postgres pg_isready -U saas_user -d saas_db
   ```

You're now ready to start development with the SaaS monorepo boilerplate!
