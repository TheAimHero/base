import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { buildUrl } from '@/lib/utils';
import { filesQueryKeys } from '@/features/files/query/files';
import { getUserFileResSchema } from '@/features/files/schema/files';
import {
  type GetUserFilesReqType,
  type GetUserFilesResType,
} from '@/features/files/types/files';

const fetchFile = async (params: GetUserFilesReqType) => {
  try {
    const reqUrl = buildUrl('/api/files', params);
    const res = await axios.get(reqUrl, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    const data = getUserFileResSchema.parse(res.data);
    return data;
  } catch (e) {
    throw e;
  }
};

type UseGetFileAction = {
  onSuccess?: (data: GetUserFilesResType) => void;
  onError?: (error: unknown) => void;
};

export const useGetFile = (
  data: GetUserFilesReqType,
  callbacks: UseGetFileAction = {},
) => {
  const { onError, onSuccess } = callbacks;
  const getFile = useQuery({
    queryFn: () => fetchFile(data),
    queryKey: filesQueryKeys.byParams(data),
    staleTime: 1000 * 60 * 10,
    retry: 0,
  });

  useEffect(() => {
    if (getFile.isSuccess) onSuccess?.(getFile.data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getFile.isSuccess]);

  useEffect(() => {
    if (getFile.isError) onError?.(getFile.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getFile.isError]);

  return getFile;
};
