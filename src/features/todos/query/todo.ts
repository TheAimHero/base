import { type UserTodoReqType } from '../types/todo';

export const todoQueryKeys = {
  all: ['todos'] as const,

  byId: (id: string) => [...todoQueryKeys.all, id],

  byParams: (params: UserTodoReqType) => [
    ...todoQueryKeys.all,
    ...Object.values(params).filter(Boolean),
  ],
};
