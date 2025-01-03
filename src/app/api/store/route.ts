import { type NextRequest } from 'next/server';
import { auth } from '@/server/auth';
import { nanoid } from 'nanoid';
import { ZodError } from 'zod';

import {
  type DeleteFileReqType,
  type GetFileResType,
  type UploadFileResType,
} from '@/types/store';
import * as objStore from '@/lib/objStore';
import {
  BadRequestResponse,
  InternalServerErrorResponse,
  OkResponse,
  UnauthorizedResponse,
} from '@/lib/responses';
import { objectFromParams } from '@/lib/utils';
import { deleteFileReqSchema, getFileReqSchema } from '@/schema/store';
import { s3BucketPath } from '@/features/files/config/config';

export const PUT = async (req: NextRequest) => {
  try {
    const session = await auth();
    if (!session?.user) {
      return UnauthorizedResponse({ error: 'Unauthorized' });
    }
    const key = nanoid();
    const url = await objStore.getPresignedPutURL(
      `${s3BucketPath}/${key}`,
      60 * 60 * 24,
    );
    return OkResponse<UploadFileResType>({ url, key });
  } catch (e) {
    if (e instanceof ZodError) {
      return BadRequestResponse({ error: e });
    }
    return InternalServerErrorResponse({ error: 'Internal Server Error' });
  }
};

export const GET = async (req: NextRequest) => {
  try {
    const session = await auth();
    if (!session?.user.id) {
      return UnauthorizedResponse({ error: 'Unauthorized' });
    }
    const params = getFileReqSchema.parse(objectFromParams(req.nextUrl));
    const fileExists = await objStore.fileExists(
      `${s3BucketPath}/${params.key}`,
    );
    if (!fileExists) {
      return BadRequestResponse({ error: 'File not found' });
    }
    const url = await objStore.getPresignedGetURL(
      `${s3BucketPath}/${params.key}`,
      60 * 5,
    );
    return OkResponse<GetFileResType>({ url, key: params.key });
  } catch (e) {
    if (e instanceof ZodError) {
      return BadRequestResponse({ error: e });
    }
    return InternalServerErrorResponse({ error: 'Internal Server Error' });
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    const session = await auth();
    if (!session?.user.id) {
      return UnauthorizedResponse({ error: 'Unauthorized' });
    }
    const data = deleteFileReqSchema.parse(objectFromParams(req.nextUrl));
    const fileExists = await objStore.fileExists(`${s3BucketPath}/${data.key}`);
    if (!fileExists) {
      return BadRequestResponse({ error: 'File not found' });
    }
    const deletedFile = await objStore.deleteObject(
      `${s3BucketPath}/${data.key}`,
    );
    if (!deletedFile) {
      return InternalServerErrorResponse({ error: 'Something went wrong' });
    }
    return OkResponse<DeleteFileReqType>({ key: data.key });
  } catch (e) {
    console.error(e);
    throw e;
  }
};
