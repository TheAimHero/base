import 'server-only';

import { db } from '@/server/db';
import { todos } from '@/server/db/schema/todo';
import { and, count, eq } from 'drizzle-orm';

import {
  type CreateTodoReqType,
  type UserTodoReqType,
} from '@/features/todos/types/todo';

import { createTodoReqSchema } from '../schema/todo';

export const getUserTodo = async (data: UserTodoReqType, userId: string) => {
  const {
    order = 'desc',
    sort = 'createdAt',
    status = undefined,
    type = undefined,
    limit,
    offset,
  } = data;
  try {
    return db.query.todos.findMany({
      where: (fields, operators) => {
        return operators.and(
          operators.and(
            operators.eq(fields.userId, userId),
            status ? operators.eq(fields.status, status) : undefined,
          ),
          type ? operators.eq(fields.type, type) : undefined,
        );
      },
      orderBy: (fields, operators) => operators[order](fields[sort]),
      limit: limit,
      offset: offset,
    });
  } catch (e) {
    throw e;
  }
};

export const getUsersTodoCount = async (
  data: UserTodoReqType,
  userId: string,
) => {
  try {
    const { status = undefined, type = undefined } = data;
    const [res] = await db
      .select({ count: count() })
      .from(todos)
      .where(
        and(
          and(
            eq(todos.userId, userId),
            type ? eq(todos.type, type) : undefined,
          ),
          status ? eq(todos.status, status) : undefined,
        ),
      );

    return res?.count ?? 0;
  } catch (e) {
    throw e;
  }
};

export const getTodoById = async (todoId: string, userId: string) => {
  try {
    return db.query.todos.findFirst({
      where: (fields, operators) => {
        return operators.and(
          operators.eq(fields.id, todoId),
          operators.eq(fields.userId, userId),
        );
      },
    });
  } catch (e) {
    throw e;
  }
};

export const createTodo = async (data: CreateTodoReqType, userId: string) => {
  try {
    const todoData = createTodoReqSchema.parse(data);
    const [todo] = await db
      .insert(todos)
      .values({
        ...todoData,
        userId,
        dueDate: new Date(todoData.dueDate),
      })
      .returning();
    return todo;
  } catch (e) {
    throw e;
  }
};
