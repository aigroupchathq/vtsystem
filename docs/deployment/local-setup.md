# VEDIC TREE OS — Local Development Setup

> Status: PLACEHOLDER — complete when monorepo and Docker Compose are ready

## Prerequisites

- Node.js 20+
- pnpm 9+
- Docker Desktop
- Google Cloud CLI (for secret access)

## Quick Start

`ash
# 1. Clone the repository
git clone https://github.com/aigroupchathq/bramha.git vedic-tree-os
cd vedic-tree-os

# 2. Install dependencies
pnpm install

# 3. Copy environment file
cp .env.example .env.local
# Fill in values from team secrets vault

# 4. Start Docker services (PostgreSQL, Redis)
docker compose up -d

# 5. Run database migrations and seed
cd apps/api
pnpm prisma migrate dev
pnpm prisma db seed

# 6. Start development servers
cd ../..
pnpm turbo run dev
`

Web app: http://localhost:3000
API: http://localhost:4000
API docs: http://localhost:4000/api/docs
