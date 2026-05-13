import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  // We'll throw an error in production, but during development it might be missing
  console.warn('DATABASE_URL is not set. Database connections will fail.');
}

const client = postgres(connectionString || '');
export const db = drizzle(client, { schema });
