'use client';

import React, { useState, type HTMLAttributes } from 'react';
import { type AxiosError } from 'axios';

import { cn } from '@/lib/utils';
import PaginationButtons from '@/components/buttons/PaginationButtons';
import FilesCard from '@/features/files/components/FileCard';
import FilesCardSkeleton from '@/features/files/components/static/FileCardSkeleton';
import FilesFetchError from '@/features/files/components/static/FileFetchError';
import { useGetFile } from '@/features/files/hooks/getFiles';

const PAGE_SIZE = 9;

interface Props extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const FilesList = ({ className, ...props }: Props) => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: PAGE_SIZE,
  });

  const files = useGetFile({
    offset: pagination.pageIndex * pagination.pageSize,
    limit: pagination.pageSize,
  });

  return (
    <div {...props} className={cn('h-[100svh] w-full sm:h-full', className)}>
      <div className='grid grid-cols-1 items-end gap-2 space-y-2 sm:grid-cols-3 sm:gap-4 sm:space-y-4'>
        {files.status === 'pending' &&
          Array(PAGE_SIZE)
            .fill(0)
            .map((_, index) => <FilesCardSkeleton key={index} />)}
        {files.data?.files.map((file, index) => (
          <FilesCard key={index} file={file} />
        ))}
      </div>
      <div className='flex w-full items-center justify-between p-2 px-20 sm:p-4'>
        {files.data ? (
          <>
            <div className='flex w-full flex-row items-center justify-evenly'>
              <span className='w-full'>
                Showing {pagination.pageIndex + 1} of{' '}
                {Math.ceil(files.data.filesCount / pagination.pageSize) || 1}{' '}
                Pages
              </span>
            </div>
            <PaginationButtons
              className='flex w-full justify-end'
              onPreviousClick={() => {
                setPagination((prev) => ({
                  ...prev,
                  pageIndex: prev.pageIndex - 1,
                }));
              }}
              disablePrevious={pagination.pageIndex === 0}
              onNextClick={() => {
                setPagination((prev) => ({
                  ...prev,
                  pageIndex: prev.pageIndex + 1,
                }));
              }}
              disableNext={
                files.data?.filesCount !== undefined
                  ? Math.ceil(files.data.filesCount / pagination.pageSize) -
                      1 <=
                    pagination.pageIndex
                  : true
              }
            />
          </>
        ) : null}
      </div>
      {!files.data && files.error && (
        <FilesFetchError e={files.error as AxiosError} />
      )}
    </div>
  );
};

export default FilesList;
