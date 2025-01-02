import { relations, sql } from 'drizzle-orm';
import { pgEnum, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';

import { todoStatusArr, todoTypeArr } from '@/config/todo';

import { users } from './user';

export const todoStatus = pgEnum('todo_status', todoStatusArr);

export const todoType = pgEnum('todo_type', todoTypeArr);

export const todos = pgTable('todo', {
  id: varchar('id', { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: text('title').notNull(),
  description: text('description').default('').notNull(),
  status: todoStatus('status').default('active').notNull(),
  type: todoType('type').default('private').notNull(),
  dueDate: timestamp('due_date').notNull(),
  userId: varchar('user_id', { length: 255 })
    .notNull()
    .references(() => users.id),
  createdAt: timestamp('created_at')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`)
    .$onUpdateFn(() => new Date()),
});

export const todosRelations = relations(todos, ({ one }) => ({
  user: one(users, { fields: [todos.userId], references: [users.id] }),
}));
