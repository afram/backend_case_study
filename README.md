# Project Requirements Tracker API

A simple REST API for managing project requirements. Built with Node.js, TypeScript, Express, and Prisma.

## Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [Docker](https://www.docker.com/) (for PostgreSQL)
- [pnpm](https://pnpm.io/) or npm

## Getting Started

### 1. Start the database

```bash
docker compose up -d
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Run database migrations

```bash
pnpm db:migrate
```

### 4. Seed the database

```bash
pnpm db:seed
```

The seed script will print user IDs you can use for authentication.

### 5. Start the development server

```bash
pnpm dev
```

The API will be available at `http://localhost:3000`.

## Authentication

Requests are authenticated by passing a user ID in the `x-user-id` header:

```bash
curl http://localhost:3000/api/projects \
  -H "x-user-id: <user-id-from-seed>"
```

## Example Requests

```bash
# Health check
curl http://localhost:3000/health

# List all users
curl http://localhost:3000/api/users

# Create a project (requires auth)
curl -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -H "x-user-id: <user-id>" \
  -d '{"name": "My Project", "description": "A new project"}'

# Add a requirement to a project
curl -X POST http://localhost:3000/api/requirements/project/<project-id> \
  -H "Content-Type: application/json" \
  -H "x-user-id: <user-id>" \
  -d '{"title": "New feature", "priority": "HIGH"}'
```

## Project Structure

```
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.ts             # Seed data
├── src/
│   ├── index.ts            # App entry point
│   ├── lib/
│   │   └── db.ts           # Database client
│   ├── middleware/
│   │   └── auth.ts         # Authentication middleware
│   └── routes/
│       ├── users.ts        # User endpoints
│       ├── projects.ts     # Project endpoints
│       └── requirements.ts # Requirement endpoints
├── docker-compose.yml
├── package.json
└── tsconfig.json
```
