import { type NextRequest } from 'next/server';
import { auth } from '@/server/auth';

import * as objStore from '@/lib/objStore';
import {
  InternalServerErrorResponse,
  NotFoundResponse,
  OkResponse,
  UnauthorizedResponse,
} from '@/lib/responses';
import { s3BucketPath } from '@/features/files/config/config';
import { deleteFile, getFile } from '@/features/files/db/files';
import {
  type DeleteFileResType,
  type GetFileResType,
} from '@/features/files/types/files';

type Params = { params: Promise<{ id: string }> };

export const GET = async (req: NextRequest, { params }: Params) => {
  try {
    const session = await auth();
    if (!session?.user.id) {
      return UnauthorizedResponse({ error: 'Unauthorized' });
    }
    const { id } = await params;
    const file = await getFile(id);
    if (file?.userId !== session.user.id) {
      return UnauthorizedResponse({ error: 'Unauthorized' });
    }
    return OkResponse<GetFileResType>(file);
  } catch (e) {
    throw e;
  }
};

export const DELETE = async (req: NextRequest, { params }: Params) => {
  try {
    const session = await auth();
    if (!session?.user.id) {
      return UnauthorizedResponse({ error: 'Unauthorized' });
    }
    const { id } = await params;
    const file = await getFile(id);
    if (!file) {
      return NotFoundResponse({ error: 'File not found' });
    }
    if (file.userId !== session.user.id) {
      return UnauthorizedResponse({ error: 'Unauthorized' });
    }
    const deletedFile = await deleteFile(id);
    if (!deletedFile) {
      return InternalServerErrorResponse({ error: 'Something went wrong' });
    }
    for (const key of deletedFile.keys) {
      if (await objStore.fileExists(`${s3BucketPath}/${key}`))
        void objStore.deleteObject(`${s3BucketPath}/${key}`);
    }
    return OkResponse<DeleteFileResType>(deletedFile);
  } catch (e) {
    throw e;
  }
};
