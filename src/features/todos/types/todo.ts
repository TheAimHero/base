import { type todos } from '@/server/db/schema/todo';
import { type z } from 'zod';

import { type todoSortArr } from '@/config/todo';
import {
  type createTodoReqSchema,
  type createTodoResSchema,
  type deleteTodoReqSchma,
  type deleteTodoResSchema,
  type userTodoReqSchema,
  type userTodoResSchema,
} from '@/features/todos/schema/todo';

export type TodoSelectType = typeof todos.$inferSelect;

export type TodoInsertType = typeof todos.$inferInsert;

export type TodoStatusType = TodoSelectType['status'];
export type TodoType = TodoSelectType['type'];
export type TodoSortType = (typeof todoSortArr)[number];

export type UserTodoReqType = z.infer<typeof userTodoReqSchema>;
export type UserTodoResType = z.infer<typeof userTodoResSchema>;

export type CreateTodoReqType = z.infer<typeof createTodoReqSchema>;
export type CreateTodoResType = z.infer<typeof createTodoResSchema>;

export type DeleteTodoReqType = z.infer<typeof deleteTodoReqSchma>;
export type DeleteTodoResType = z.infer<typeof deleteTodoResSchema>;
