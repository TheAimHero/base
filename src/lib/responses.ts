import { NextResponse } from 'next/server';

export const OkResponse = <T>(data: T) => {
  return NextResponse.json(data, { status: 200, statusText: 'OK' });
};

export const UnauthorizedResponse = <T>(data: T): NextResponse<T> => {
  return NextResponse.json(data, { status: 401, statusText: 'Unauthorized' });
};

export const InternalServerErrorResponse = <T>(data: T): NextResponse<T> => {
  return NextResponse.json(data, {
    status: 500,
    statusText: 'Internal Server Error',
  });
};

export const BadRequestResponse = <T>(data: T): NextResponse<T> => {
  return NextResponse.json(data, { status: 400, statusText: 'Bad Request' });
};

export const NotFoundResponse = <T>(data: T): NextResponse<T> => {
  return NextResponse.json(data, { status: 404, statusText: 'Not Found' });
};
