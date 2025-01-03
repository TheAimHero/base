import { z } from 'zod';

// upload a single file
export const uploadFileReqSchema = z.object({
  file: z.instanceof(File),
});
export const uploadFileResSchema = z.object({
  key: z.string(),
  url: z.string(),
});

// get a single file
export const getFileReqSchema = z.object({ key: z.string() });
export const getFileResSchema = z.object({ url: z.string(), key: z.string() });

// get multiple files
export const getMultiFileReqSchema = z.object({ keys: z.array(z.string()) });
export const getMultiFileResSchema = z.object({
  urls: z.array(z.string()),
  keys: z.array(z.string()),
});

// delete a single file
export const deleteFileReqSchema = z.object({ key: z.string() });
export const deleteFileResSchema = z.object({ key: z.string() });
