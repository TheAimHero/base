import 'server-only';

import { db } from '@/server/db';
import { todos } from '@/server/db/schema/todo';
import { and, asc, count, desc, eq } from 'drizzle-orm';

import { createTodoReqSchema } from '@/features/todos/schema/todo';
import {
  type CreateTodoReqType,
  type UserTodoReqType,
} from '@/features/todos/types/todo';

export const getUserTodo = async (data: UserTodoReqType, userId: string) => {
  const { type, status, sort, limit, order, offset } = data;
  try {
    return db.query.todos.findMany({
      where: and(
        and(
          eq(todos.userId, userId),
          status ? eq(todos.status, status) : undefined,
        ),
        type ? eq(todos.type, type) : undefined,
      ),
      orderBy: order === 'desc' ? desc(todos[sort]) : asc(todos[sort]),
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

export const deleteTodo = async (id: string) => {
  try {
    const [todo] = await db.delete(todos).where(eq(todos.id, id)).returning();
    return todo;
  } catch (e) {
    throw e;
  }
};
