import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { buildUrl } from '@/lib/utils';
import { deleteTodoResSchema } from '@/features/todos/schema/todo';
import { type DeleteTodoResType } from '@/features/todos/types/todo';

const deleteTodo = async (todoId: string) => {
  try {
    const url = buildUrl(`/api/todos/${todoId}`);
    const res = await axios.delete(url, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    const todo = deleteTodoResSchema.parse(res.data);
    return todo;
  } catch (e) {
    throw e;
  }
};

type DeleteTodoActions = {
  onSuccess?: (data: DeleteTodoResType) => void;
  onError?: (error: unknown) => void;
  onSettled?: (data?: DeleteTodoResType, error?: unknown) => void;
};

export const useDeleteTodo = (
  todoId: string,
  callbacks: DeleteTodoActions = {},
) => {
  const deleteTodoQuery = useMutation({
    mutationFn: () => deleteTodo(todoId),
    onSuccess: callbacks.onSuccess,
    onError: callbacks.onError,
    onSettled: callbacks.onSettled,
  });
  return deleteTodoQuery;
};
