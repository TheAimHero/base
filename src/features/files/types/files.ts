import { type files } from '@/server/db/schema/files';
import { type z } from 'zod';

import {
  type createFileReqSchema,
  type createFileResSchema,
  type deleteFileReqSchema,
  type deleteFileResSchema,
  type getFileReqSchema,
  type getFileResSchema,
  type getUserFileResSchema,
  type getUserFilesReqSchema,
} from '@/features/files/schema/files';

export type FileInsertType = typeof files.$inferInsert;
export type FileSelectType = typeof files.$inferSelect;

export type CreatFileReqType = z.infer<typeof createFileReqSchema>;
export type CreatFileResType = z.infer<typeof createFileResSchema>;

export type GetUserFilesReqType = z.infer<typeof getUserFilesReqSchema>;
export type GetUserFilesResType = z.infer<typeof getUserFileResSchema>;

export type GetFileReqType = z.infer<typeof getFileReqSchema>;
export type GetFileResType = z.infer<typeof getFileResSchema>;

export type DeleteFileReqType = z.infer<typeof deleteFileReqSchema>;
export type DeleteFileResType = z.infer<typeof deleteFileResSchema>;
