import { type NextRequest } from 'next/server';

import {
  InternalServerErrorResponse,
  NotFoundResponse,
  OkResponse,
} from '@/lib/responses';
import { deleteTodo } from '@/features/todos/db/todo';
import { type DeleteTodoResType } from '@/features/todos/types/todo';

type Params = {
  params: Promise<{ id: string }>;
};

export const DELETE = async (req: NextRequest, { params }: Params) => {
  try {
    const { id } = await params;
    const deletedTodo = await deleteTodo(id);
    if (!deletedTodo) {
      return NotFoundResponse({ error: 'Todo not found' });
    }
    return OkResponse<DeleteTodoResType>(deletedTodo);
  } catch (e) {
    if (e instanceof Error) {
      return InternalServerErrorResponse({ error: e.message });
    }

    return InternalServerErrorResponse({ error: 'Something went wrong' });
  }
};
