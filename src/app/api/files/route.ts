import { type NextRequest } from 'next/server';
import { auth } from '@/server/auth';
import { ZodError } from 'zod';

import {
  BadRequestResponse,
  InternalServerErrorResponse,
  OkResponse,
  UnauthorizedResponse,
} from '@/lib/responses';
import { objectFromParams } from '@/lib/utils';
import {
  createFile,
  getFileCount,
  getUserFiles,
} from '@/features/files/db/files';
import {
  createFileReqSchema,
  getUserFilesReqSchema,
} from '@/features/files/schema/files';
import {
  type CreatFileResType,
  type GetUserFilesResType,
} from '@/features/files/types/files';

export const GET = async (req: NextRequest) => {
  const session = await auth();
  if (!session?.user.id) {
    return UnauthorizedResponse({ error: 'Unauthorized' });
  }
  const params = getUserFilesReqSchema.parse(objectFromParams(req.nextUrl));
  const files = await getUserFiles(params, session.user.id);
  const filesCount = await getFileCount(params, session.user.id);
  return OkResponse<GetUserFilesResType>({ files, filesCount });
};

export const POST = async (req: NextRequest) => {
  try {
    const session = await auth();
    if (!session?.user.id) {
      return UnauthorizedResponse({ error: 'Unauthorized' });
    }
    const body: unknown = await req.json();
    const data = createFileReqSchema.parse(body);
    const file = await createFile(data, session.user.id);
    if (!file) {
      return InternalServerErrorResponse({ error: 'Something went wrong' });
    }
    return OkResponse<CreatFileResType>(file);
  } catch (e) {
    if (e instanceof ZodError) {
      return BadRequestResponse({ error: e });
    }
  }
};
