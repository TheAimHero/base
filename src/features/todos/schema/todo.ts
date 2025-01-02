import { z } from 'zod';

import { todoSortArr, todoStatusArr, todoTypeArr } from '@/config/todo';
import {
  type TodoInsertType,
  type TodoSelectType,
} from '@/features/todos/types/todo';

export const baseTodoInsertSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(1).max(50),
  description: z.string().max(200).optional(),
  dueDate: z.coerce.date().superRefine((val, ctx) => {
    if (val < new Date()) {
      ctx.addIssue({
        code: z.ZodIssueCode.invalid_date,
        message: 'Due date cannot be in the past.',
      });
    }
  }),
  status: z.enum(todoStatusArr).default('active').optional(),
  type: z.enum(todoTypeArr).default('private').optional(),
  userId: z.string().uuid(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}) satisfies z.ZodType<TodoInsertType>;

export const baseTodoSelectSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).max(50),
  description: z.string().max(200),
  dueDate: z.coerce.date(),
  status: z.enum(todoStatusArr),
  type: z.enum(todoTypeArr),
  userId: z.string().uuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
}) satisfies z.ZodType<TodoSelectType>;

export const createTodoReqSchema = baseTodoInsertSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  userId: true,
});
export const createTodoResSchema = baseTodoSelectSchema;

export const userTodoResSchema = z.object({
  todos: z.array(baseTodoSelectSchema),
  todosCount: z.number(),
});

export const userTodoReqSchema = z.object({
  limit: z.coerce.number(),
  offset: z.coerce.number(),
  sort: z.enum(todoSortArr).default('updatedAt'),
  status: z.custom<TodoSelectType['status']>().optional(),
  type: z.custom<TodoSelectType['type']>().optional(),
  order: z.enum(['asc', 'desc']),
});

export const deleteTodoReqSchma = z.null();
export const deleteTodoResSchema = baseTodoSelectSchema;
