import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// Prevent multiple connections in development (Hot Reloading fix)
const globalQueryClient = global as unknown as { queryClient: postgres.Sql };

// Connect to Supabase via the Transaction Pooler (port 6543) or Session Pooler (port 5432)
// Use the connection string from Supabase Settings -> Database -> Connection String -> Node.js
const connectionString = process.env.DATABASE_URL!;

const client = globalQueryClient.queryClient || postgres(connectionString);

if (process.env.NODE_ENV !== 'production') {
  globalQueryClient.queryClient = client;
}

export const db = drizzle(client, { schema });
