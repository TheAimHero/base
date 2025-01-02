import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { buildUrl } from '@/lib/utils';
import { todoQueryKeys } from '@/features/todos/query/todo';
import { userTodoResSchema } from '@/features/todos/schema/todo';
import {
  type UserTodoReqType,
  type UserTodoResType,
} from '@/features/todos/types/todo';

const fetchTodos = async (params: UserTodoReqType) => {
  try {
    const url = buildUrl('/api/todos');
    const res = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      params: params,
    });
    const data = userTodoResSchema.parse(res.data);
    return data;
  } catch (e) {
    throw e;
  }
};

type useGetTodosActions = {
  onError?: (error: unknown) => void;
  onSuccess?: (data: UserTodoResType) => void;
};

export const useGetTodos = (
  params: UserTodoReqType,
  { onSuccess, onError }: useGetTodosActions = {},
  initialData?: UserTodoResType,
  // select?: (data: UserTodoResType) => void,
) => {
  const todos = useQuery({
    queryFn: () => fetchTodos(params),
    queryKey: todoQueryKeys.byParams(params),
    staleTime: 1000 * 60 * 10,
    initialData: initialData,
    retry: 0,
    // select: select ?? undefined,
  });

  useEffect(() => {
    if (todos.isSuccess) onSuccess?.(todos.data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todos.isSuccess]);

  useEffect(() => {
    if (todos.isError) onError?.(todos.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todos.isError]);

  return todos;
};
