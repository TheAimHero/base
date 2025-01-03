import { type z } from 'zod';

import {
  type deleteFileReqSchema,
  type deleteFileResSchema,
  type getFileReqSchema,
  type getFileResSchema,
  type getMultiFileReqSchema,
  type getMultiFileResSchema,
  type uploadFileReqSchema,
  type uploadFileResSchema,
} from '@/schema/store';

export type GetFileReqType = z.infer<typeof getFileReqSchema>;
export type GetFileResType = z.infer<typeof getFileResSchema>;

export type GetMultiFileReqType = z.infer<typeof getMultiFileReqSchema>;
export type GetMultiFileResType = z.infer<typeof getMultiFileResSchema>;

export type UploadFileReqType = z.infer<typeof uploadFileReqSchema>;
export type UploadFileResType = z.infer<typeof uploadFileResSchema>;

export type DeleteFileResType = z.infer<typeof deleteFileResSchema>;
export type DeleteFileReqType = z.infer<typeof deleteFileReqSchema>;
