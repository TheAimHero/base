import { useEffect } from 'react';
import { skipToken, useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { type GetFileReqType } from '@/types/store';
import { buildUrl } from '@/lib/utils';
import { getFileResSchema } from '@/schema/store';

/**
 * Downloads a file from the S3 bucket.
 *
 * @param data - The query parameters with the key of the file.
 * @returns A promise that resolves to an object with `url` and `key` properties.
 * The `url` property is the URL of the file, and the `key` property is the key
 * of the file in S3.
 *
 * @throws If the request fails, it throws an error with the message from the
 * server.
 */
const getFile = async (data: GetFileReqType) => {
  try {
    const reqUrl = buildUrl('/api/store', data);
    const res = await axios.get(reqUrl, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    const { url, key } = getFileResSchema.parse(res.data);
    return { url, key };
  } catch (e) {
    throw e;
  }
};

type UseFileGetActions = {
  onError?: (error: unknown) => Promise<void> | void;
  onSuccess?: (data: { key: string }) => Promise<void> | void;
};

/**
 * Fetches a file from the store.
 */
export const useFileGet = (
  data: Partial<GetFileReqType>,
  callbacks: UseFileGetActions = {},
) => {
  const { onSuccess, onError } = callbacks;

  const fileGet = useQuery({
    queryFn: data.key ? () => getFile({ key: data.key! }) : skipToken,
    queryKey: ['getFile', data.key],
    staleTime: 1000 * 60 * 60,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    retry: 1,
    enabled: !!data.key,
  });

  useEffect(() => {
    if (fileGet.isSuccess) void onSuccess?.(fileGet.data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileGet.isSuccess]);

  useEffect(() => {
    if (fileGet.isError) void onError?.(fileGet.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileGet.isError]);
  return fileGet;
};
