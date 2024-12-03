import { type todos } from '@/server/db/schema/todo';
import { type z } from 'zod';

import { type todoSortArr } from '@/config/todo';

import { type userTodoReqSchema, type userTodoResSchema } from '../schema/todo';

export type TodoSelectType = typeof todos.$inferSelect;

export type TodoInsertType = typeof todos.$inferInsert;

export type TodoStatusType = TodoSelectType['status'];
export type TodoType = TodoSelectType['type'];
export type TodoSortType = (typeof todoSortArr)[number];

export type UserTodoReqType = z.infer<typeof userTodoReqSchema>;
export type UserTodoResType = z.infer<typeof userTodoResSchema>;

export type CreateTodoReqType = Omit<
  TodoInsertType,
  'userId' | 'id' | 'createdAt' | 'updatedAt'
>;
export type CreateTodoResType = TodoSelectType;
