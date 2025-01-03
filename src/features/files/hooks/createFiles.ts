import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { buildUrl } from '@/lib/utils';
import {
  type CreatFileReqType,
  type CreatFileResType,
} from '@/features/files/types/files';

import { filesQueryKeys } from '../query/files';
import { createFileResSchema } from '../schema/files';

/**
 * Posts a new file to the server.
 *
 * @param data - The data of the new file, which should be of type {@link CreatFileReqType}.
 * @returns A promise that resolves to the newly created file, which is of type {@link CreatFileResType}.
 * @throws If the request fails, it throws an error with the message from the server.
 */
const postFiles = async (data: CreatFileReqType) => {
  try {
    const url = buildUrl('/api/files');
    const res = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    const file = createFileResSchema.parse(res.data);
    return file;
  } catch (e) {
    throw e;
  }
};

type UseCreateFileActions = {
  onSuccess?: (data: CreatFileResType) => void;
  onError?: (error: unknown) => void;
  onSettled?: (data?: CreatFileResType, error?: unknown) => void;
};

/**
 * Returns a mutation function that posts a new file to the server.
 *
 * @param callbacks - An object with three optional properties:
 *   - `onSuccess`: A function that is called when the mutation is successful,
 *     with the newly created file as the argument.
 *   - `onError`: A function that is called when the mutation fails,
 *     with the error as the argument.
 *   - `onSettled`: A function that is called when the mutation is either
 *     successful or fails, with the newly created file as the first argument
 *     and the error as the second argument.
 *
 * @returns A mutation function that takes a `CreatFileReqType` object as its argument.
 *   When called, it posts the object to the server at `/api/files` and returns a
 *   promise that resolves to the newly created file.
 */
export const useCreateFile = (callbacks: UseCreateFileActions = {}) => {
  const { onError, onSuccess, onSettled } = callbacks;
  const createFile = useMutation({
    mutationFn: (data: CreatFileReqType) => postFiles(data),
    mutationKey: filesQueryKeys.create(),
    onSettled: onSettled,
    onError: onError,
    onSuccess: onSuccess,
  });
  return createFile;
};
