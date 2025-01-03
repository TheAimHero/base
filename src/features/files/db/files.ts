import { db } from '@/server/db';
import { files } from '@/server/db/schema/files';
import { count, eq } from 'drizzle-orm';

import {
  type CreatFileReqType,
  type GetUserFilesReqType,
} from '@/features/files/types/files';

/**
 * Creates a file in the database. The file data is expected to be a {@link CreatFileReqType} object.
 * The `userId` parameter is the ID of the user that the file belongs to.
 *
 * @throws If the file could not be created, an error is thrown.
 *
 * @returns The newly created file.
 */
export const createFile = async (data: CreatFileReqType, userId: string) => {
  try {
    const [file] = await db
      .insert(files)
      .values({ ...data, userId })
      .returning();
    return file;
  } catch (e) {
    throw e;
  }
};

/**
 * Retrieves files from the database for a specified user.
 *
 * @param data - An object of type `GetFilesReqType` containing pagination details:
 *   - `limit`: The maximum number of files to retrieve.
 *   - `offset`: The number of files to skip before starting to collect the result set.
 * @param userId - The ID of the user whose files are to be retrieved.
 *
 * @returns A promise that resolves to an array of files associated with the specified user.
 *
 * @throws An error if the file retrieval fails.
 */

export const getUserFiles = async (
  data: GetUserFilesReqType,
  userId: string,
) => {
  try {
    const file = await db.query.files.findMany({
      where: eq(files.userId, userId),
      limit: data.limit,
      offset: data.offset,
    });
    return file;
  } catch (e) {
    throw e;
  }
};

export const getFile = async (fileId: string) => {
  try {
    const file = await db.query.files.findFirst({
      where: eq(files.id, fileId),
    });
    return file;
  } catch (e) {
    throw e;
  }
};

/**
 * Retrieves the count of files in the database for a specified user and pagination details.
 *
 * @param data - An object of type `GetFilesReqType` containing pagination details:
 *   - `limit`: The maximum number of files to retrieve.
 *   - `offset`: The number of files to skip before starting to collect the result set.
 * @param userId - The ID of the user whose files are to be retrieved.
 *
 * @returns A promise that resolves to the count of files associated with the specified user.
 *
 * @throws An error if the file count retrieval fails.
 */
export const getFileCount = async (
  data: GetUserFilesReqType,
  userId: string,
) => {
  try {
    const [res] = await db
      .select({ count: count() })
      .from(files)
      .where(eq(files.userId, userId))
      .offset(data.offset)
      .limit(data.limit);
    return res?.count ?? 0;
  } catch (e) {
    throw e;
  }
};

export const deleteFile = async (fileId: string) => {
  try {
    const [file] = await db
      .delete(files)
      .where(eq(files.id, fileId))
      .returning();
    return file;
  } catch (e) {
    throw e;
  }
};
