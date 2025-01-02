import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { buildUrl } from '@/lib/utils';
import {
  type CreateTodoReqType,
  type TodoSelectType,
} from '@/features/todos/types/todo';

import { createTodoResSchema } from '../schema/todo';

const postTodo = async (data: CreateTodoReqType) => {
  try {
    const url = buildUrl('/api/todos');
    const res = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    return createTodoResSchema.parse(res.data);
  } catch (e) {
    throw e;
  }
};

type useCreateTodoParams = {
  onError?: (error: unknown) => void;
  onSuccess?: (data: TodoSelectType) => void;
  onSettled?: (data?: TodoSelectType, error?: unknown) => void;
};

export const useCreateTodo = (callbacks: useCreateTodoParams) => {
  const { onError, onSuccess, onSettled } = callbacks;
  const createTodo = useMutation({
    mutationFn: (data: CreateTodoReqType) => postTodo(data),
    onError: onError,
    onSuccess: onSuccess,
    onSettled: onSettled,
  });
  return createTodo;
};
