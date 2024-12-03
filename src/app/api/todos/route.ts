import { type NextRequest } from 'next/server';
import { auth } from '@/server/auth';
import { ZodError } from 'zod';

import {
  BadRequestResponse,
  InternalServerErrorResponse,
  OkResponse,
  UnauthorizedResponse,
} from '@/lib/responses';
import { objectFromParams } from '@/lib/utils';
import {
  createTodo,
  getUsersTodoCount,
  getUserTodo,
} from '@/features/todos/db/todo';
import {
  createTodoReqSchema,
  userTodoReqSchema,
} from '@/features/todos/schema/todo';
import {
  type CreateTodoResType,
  type UserTodoResType,
} from '@/features/todos/types/todo';

export const GET = async (req: NextRequest) => {
  try {
    const session = await auth();
    if (!session) {
      return UnauthorizedResponse({ error: 'Please login first' });
    }
    const params = userTodoReqSchema.parse(objectFromParams(req.nextUrl));
    const todos = await getUserTodo(params, session.user.id);
    const todosCount = await getUsersTodoCount(params, session.user.id);
    return OkResponse<UserTodoResType>({ todos, todosCount });
  } catch (e) {
    if (e instanceof ZodError) {
      return BadRequestResponse({ error: e.issues });
    }
    if (e instanceof Error) {
      return InternalServerErrorResponse({ error: e.message });
    }
    return InternalServerErrorResponse({ error: 'Something went wrong' });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const session = await auth();
    if (!session) {
      return UnauthorizedResponse({ error: 'Please login first' });
    }
    const body: unknown = await req.json();
    const data = createTodoReqSchema.parse(body);
    const todo = await createTodo(data, session.user.id);
    if (!todo) {
      return InternalServerErrorResponse({ error: 'Something went wrong' });
    }
    return OkResponse<CreateTodoResType>(todo);
  } catch (e) {
    if (e instanceof ZodError) {
      return BadRequestResponse({ error: e.issues });
    }
    if (e instanceof Error) {
      return InternalServerErrorResponse({ error: e.message });
    }
    return InternalServerErrorResponse({ error: 'Something went wrong' });
  }
};
