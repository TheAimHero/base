import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { type UploadFileReqType } from '@/types/store';
import { uploadFileResSchema } from '@/schema/store';

/**
 * Uploads a file to the store.
 *
 * @param data - The file to upload with its original name.
 * @param cacheTime - The time in seconds to cache the file.
 * @returns A promise that resolves to an object with the key of the uploaded file.
 *
 * @throws If the request fails, it throws an error with the message from the server.
 */
const uploadFile = async (data: UploadFileReqType, cacheTime: number) => {
  try {
    const res = await axios.put('/api/store', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    const { url, key } = uploadFileResSchema.parse(res.data);
    await axios.put(url, data.file, {
      headers: {
        'Content-Type': data.file.type,
        'Cache-Control': `max-age=${cacheTime}, public`,
        'Content-Disposition': `attachment; filename=${data.file.name}`,
      },
    });
    return { key };
  } catch (e) {
    throw e;
  }
};

type UseFileUploadParams = {
  onError?: (error: unknown) => Promise<void> | void;
  onSuccess?: (data: { key: string }) => Promise<void> | void;
  onSettled?: (
    data?: { key: string } | null,
    error?: unknown,
  ) => Promise<void> | void;
};

/**
 * Uploads a file to the store.
 *
 * @param cacheTime - The time in seconds to cache the file.
 * @param callbacks.onError - An optional callback that will be called if the request fails.
 * @param callbacks.onSuccess - An optional callback that will be called if the request
 *   succeeds.
 * @param callbacks.onSettled - An optional callback that will be called regardless of the
 *   outcome of the request.
 *
 * @returns An object with a mutate function that can be used to upload a file.
 *
 * @example
 *   const { mutate } = useFileUpload(3600);
 *   const file = new File(['Hello World!'], 'hello.txt', { type: 'text/plain' });
 *   mutate({ file });
 */
export const useFileUpload = (
  cacheTime: number,
  callbacks: UseFileUploadParams = {},
) => {
  const { onError, onSuccess, onSettled } = callbacks;
  const fileUpload = useMutation({
    mutationFn: (data: UploadFileReqType) => uploadFile(data, cacheTime),
    mutationKey: ['uploadFile'],
    onError,
    onSettled,
    onSuccess,
  });
  return fileUpload;
};
