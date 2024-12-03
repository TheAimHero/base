import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { buildUrl } from '@/lib/utils';

import { createTodoResSchema } from '../schema/todo';
import { type TodoInsertType, type TodoSelectType } from '../types/todo';

const createTodo = async (data: TodoInsertType) => {
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

export const useCreateTodo = ({
  onError,
  onSettled,
  onSuccess,
}: useCreateTodoParams) => {
  const { mutate, mutateAsync } = useMutation({
    mutationFn: (data: TodoInsertType) => createTodo(data),
    onError: onError,
    onSuccess: onSuccess,
    onSettled: onSettled,
  });
  return {
    createTodo: mutate,
    createTodoAsync: mutateAsync,
  };
};
