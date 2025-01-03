import { jsonb, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';

import { users } from './user';

export const files = pgTable('file', {
  id: varchar('id', { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description').notNull(),
  keys: jsonb('keys').$type<string[]>().notNull(),
  userId: varchar('user_id', { length: 255 })
    .notNull()
    .references(() => users.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdateFn(() => new Date()),
});
