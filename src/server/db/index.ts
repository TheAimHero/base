import { env } from '@/env';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import * as auth from './schema/auth';
import * as file from './schema/files';
import * as todo from './schema/todo';
import * as user from './schema/user';

const schema = {
  ...auth,
  ...user,
  ...todo,
  ...file,
};

const globalForDb = globalThis as unknown as {
  conn: postgres.Sql | undefined;
};

const conn = globalForDb.conn ?? postgres(env.DATABASE_URL);
if (env.NODE_ENV !== 'production') globalForDb.conn = conn;

export const db = drizzle(conn, { schema });
