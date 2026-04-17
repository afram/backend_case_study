# Project Requirements Tracker API

A simple REST API for managing project requirements. Built with Node.js, TypeScript, Express, and Prisma.

## Prerequisites

- [Node.js](https://nodejs.org/) v24+
- [Docker](https://www.docker.com/) (for PostgreSQL)
- npm (included with Node.js)

## Getting Started

### 1. Clone the repository and install dependencies

```bash
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env
```

The default values in `.env.example` work with the Docker Compose setup.

### 3. Start the database

```bash
docker compose up -d
```

### 4. Run database migrations

```bash
npm run db:migrate
```

### 5. Seed the database

```bash
npm run db:seed
```

The seed script will print user IDs you can use for authentication.

### 6. Start the development server

```bash
npm run dev
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

# Add a requirement to a project (requires auth)
curl -X POST http://localhost:3000/api/requirements/project/<project-id> \
  -H "Content-Type: application/json" \
  -H "x-user-id: <user-id>" \
  -d '{"title": "New feature", "priority": "HIGH"}'
```

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Compile TypeScript to JavaScript |
| `npm start` | Run the compiled production build |
| `npm run db:migrate` | Run Prisma database migrations |
| `npm run db:seed` | Seed the database with sample data |
| `npm run db:reset` | Reset the database (drops all data and re-migrates) |

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
