import { z } from 'zod';

import { todoSortArr } from '@/config/todo';

import { type TodoInsertType, type TodoSelectType } from '../types/todo';

export const createTodoReqSchema = z
  .custom<TodoInsertType>()
  .default({
    title: 'trial',
    type: 'private',
    dueDate: new Date(),
    description: '',
    status: 'active',
  })
  .superRefine((data, ctx) => {
    const { dueDate, title, description } = data;
    if (dueDate < new Date()) {
      ctx.addIssue({
        code: 'invalid_date',
        message: 'Due date must be in the future.',
        path: ['dueDate'],
      });
    }
    if (title.length > 50 || title.length < 1) {
      ctx.addIssue({
        code: 'custom',
        message: 'Title must be between 1 and 50 characters.',
        path: ['title'],
      });
    }
    if (description && description.length > 100) {
      ctx.addIssue({
        code: 'custom',
        message: 'Description must be less than 100 characters.',
        path: ['description'],
      });
    }
  });

export const createTodoResSchema = z.custom<TodoSelectType>();

export const userTodoResSchema = z.object({
  todos: z.array(z.custom<TodoSelectType>()),
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
