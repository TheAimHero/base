import { type GetUserFilesReqType } from '../types/files';

export const filesQueryKeys = {
  all: ['files'] as const,

  byId: (id: string) => [...filesQueryKeys.all, id] as const,

  delete: (id: string) => [...filesQueryKeys.all, 'delete', id] as const,

  byParams: (params: GetUserFilesReqType) =>
    [...filesQueryKeys.all, ...Object.values(params).filter(Boolean)] as const,

  byUser: (userId: string) => [...filesQueryKeys.all, 'user', userId] as const,

  create: () => [...filesQueryKeys.all, 'create'] as const,
};
