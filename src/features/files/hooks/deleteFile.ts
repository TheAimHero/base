import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { buildUrl } from '@/lib/utils';
import { filesQueryKeys } from '@/features/files/query/files';
import { deleteFileResSchema } from '@/features/files/schema/files';
import { type DeleteFileResType } from '@/features/files/types/files';

const deleteFile = async (fileId: string) => {
  try {
    const url = buildUrl(`/api/files/${fileId}`);
    const res = await axios.delete(url, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    const data = deleteFileResSchema.parse(res.data);
    return data;
  } catch (e) {
    throw e;
  }
};

type UseDeleteFileActions = {
  onSuccess?: (data: DeleteFileResType) => void;
  onError?: (error: unknown) => void;
  onSettled?: (data?: DeleteFileResType, error?: unknown) => void;
};

export const useDeleteFile = (
  fileId: string,
  callbacks: UseDeleteFileActions = {},
) => {
  const { onSettled, onSuccess, onError } = callbacks;
  const query = useMutation({
    mutationFn: () => deleteFile(fileId),
    mutationKey: filesQueryKeys.delete(fileId),
    onSettled: onSettled,
    onSuccess: onSuccess,
    onError: onError,
  });
  return query;
};
