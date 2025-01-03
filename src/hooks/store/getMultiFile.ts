import { useQueries } from '@tanstack/react-query';
import axios from 'axios';

import { type GetFileReqType, type GetMultiFileReqType } from '@/types/store';
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

/**
 * Downloads multiple files from the S3 bucket.
 *
 * @param data - The query parameters with the keys of the files.
 * @returns An object with `data` and `pending` properties. The `data` property
 * is an array of objects with `url` and `key` properties. The `pending`
 * property is a boolean indicating whether any of the queries are pending.
 *
 * @throws If any of the requests fail, it throws an error with the message
 * from the server.
 */
export const useFileMultiGet = (data: GetMultiFileReqType) => {
  const fileGet = useQueries({
    queries: data.keys.map((key) => ({
      queryFn: () => getFile({ key }),
      queryKey: ['getFile', key],
    })),
    combine: (result) => {
      return {
        data: result.map(({ data }) => data),
        pending: result.some(({ isPending }) => isPending),
      };
    },
  });

  return fileGet;
};
