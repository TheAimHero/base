import { z } from 'zod';

import {
  type FileInsertType,
  type FileSelectType,
} from '@/features/files/types/files';

// base schema inferred from db table types
export const baseFileInsertSchema = z.object({
  id: z.string().uuid().optional(),
  name: z
    .string()
    .min(5, { message: 'Name must be at least 5 characters' })
    .max(50, { message: 'Name must be at most 50 characters' }),
  description: z
    .string()
    .min(10)
    .max(500, { message: 'Description must be at most 500 characters' }),
  keys: z.array(z.string()),
  userId: z.string().uuid(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}) satisfies z.ZodType<FileInsertType>;
export const baseFileSelectSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string(),
  keys: z.array(z.string()),
  userId: z.string().uuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
}) as z.ZodType<FileSelectType>;

// create file input and response schemas
export const createFileReqSchema = baseFileInsertSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  userId: true,
});
export const createFileResSchema = baseFileSelectSchema;

// get files input and response schemas
export const getUserFilesReqSchema = z.object({
  limit: z
    .number()
    .min(1, { message: 'Limit must be at least 1' })
    .max(100, { message: 'Limit must be at most 100' })
    .default(10),
  offset: z.number().min(0, { message: 'Page must be at least 0' }).default(0),
});
export const getUserFileResSchema = z.object({
  files: z.array(baseFileSelectSchema),
  filesCount: z.number(),
});

export const getFileReqSchema = z.null();
export const getFileResSchema = baseFileSelectSchema;

export const deleteFileReqSchema = z.null();
export const deleteFileResSchema = baseFileSelectSchema;
