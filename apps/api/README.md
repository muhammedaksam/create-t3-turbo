# API Server

This is a dedicated API server for handling tRPC API routes and authentication. It's separated from the web frontend to allow for better scalability and independent deployment.

## Purpose

- Serves tRPC API endpoints at `/api/trpc`
- Handles Better Auth authentication at `/api/auth`
- Shared by both Next.js web app and Expo mobile app
- Runs on port `3002` by default (configurable via `API_PORT` env variable)

## Development

```bash
# From the workspace root
pnpm --filter @acme/api-server dev
```

## Environment Variables

The server uses these environment variables from `../../.env`:

- `API_PORT` - Port for the API server (default: 3002)
- `DATABASE_URL` - PostgreSQL database connection string
- `AUTH_SECRET` - Secret key for authentication

## Architecture

### Clients

- **Next.js Web** (`apps/nextjs`) - Connects to this API server via tRPC
- **Expo Mobile** (`apps/expo`) - Connects to this API server via tRPC

### Endpoints

- `GET/POST /api/trpc/*` - tRPC procedures
- `GET/POST /api/auth/*` - Better Auth endpoints

## Key Files

- `src/app/api/trpc/[trpc]/route.ts` - tRPC request handler
- `src/app/api/auth/[...all]/route.ts` - Better Auth handler

## Deployment

For production, you can:

1. Deploy this API server separately from the web frontend
2. Update `API_URL` and `NEXT_PUBLIC_API_URL` in client apps to point to your deployed API server
3. Ensure CORS is properly configured in the tRPC handler

## Notes

- This server doesn't need UI dependencies or i18n
- It's essentially a minimal Next.js app that only serves API routes
- You can strip out unnecessary dependencies from `package.json` for a leaner deployment
