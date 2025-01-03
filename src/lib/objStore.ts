import { env } from '@/env';
import {
  DeleteObjectCommand,
  GetObjectCommand,
  HeadObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3Client = new S3Client({
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY,
    secretAccessKey: env.AWS_SECRET_KEY,
  },
  region: env.AWS_REGION,
  endpoint: env.S3_ENDPOINT,
  forcePathStyle: true,
});

export const getPresignedPutURL = (
  key: string,
  expiresInSec: number,
): Promise<string> => {
  try {
    const command = new PutObjectCommand({ Bucket: env.S3_BUCKET, Key: key });
    return getSignedUrl(s3Client, command, { expiresIn: expiresInSec });
  } catch (e) {
    throw new Error('Failed to create presigned URL.', { cause: e });
  }
};

export const getPresignedGetURL = (
  key: string,
  expiresInSec: number,
): Promise<string> => {
  try {
    const command = new GetObjectCommand({ Bucket: env.S3_BUCKET, Key: key });
    return getSignedUrl(s3Client, command, { expiresIn: expiresInSec });
  } catch (e) {
    throw new Error('Failed to create presigned URL.', { cause: e });
  }
};

export const deleteObject = (key: string) => {
  try {
    return s3Client.send(
      new DeleteObjectCommand({ Bucket: env.S3_BUCKET, Key: key }),
    );
  } catch (e) {
    throw new Error('Failed to delete object.', { cause: e });
  }
};

export const fileExists = async (objName: string) => {
  try {
    const command = new HeadObjectCommand({
      Bucket: env.S3_BUCKET,
      Key: objName,
    });
    const response = await s3Client.send(command);
    if (response) {
      return true;
    }
  } catch (err) {
    if (err instanceof Error && err.name === 'NotFound') {
      return false;
    }
    throw new Error('Unable to check if file exists', { cause: err });
  }
};

export const fileInfo = async (objName: string) => {
  try {
    const command = new HeadObjectCommand({
      Bucket: env.S3_BUCKET,
      Key: objName,
    });
    const response = await s3Client.send(command);
    return response;
  } catch (err) {
    if (err instanceof Error && err.name === 'NotFound') {
      throw new Error('File not found', { cause: err });
    }
    throw new Error('Unable to check if file exists', { cause: err });
  }
};
