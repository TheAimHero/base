import React from 'react';

import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface Props {
  className?: string;
}

const TodoCardSkeleton = ({ className }: Props) => {
  return (
    <Card className={cn('relative block overflow-hidden', className)}>
      <span className='absolute inset-x-0 bottom-0 h-2 animate-pulse bg-gradient-to-r from-green-300 via-blue-500 to-purple-600'></span>

      <CardHeader className='p-2 sm:flex sm:flex-row sm:justify-between sm:gap-4 sm:p-4'>
        <CardTitle className='flex w-full items-center justify-between'>
          <Skeleton className='h-5 w-1/2' />
          <div className='flex h-5 w-full justify-end gap-2 sm:gap-4'>
            <Skeleton className='h-5 w-1/4' />
            <Skeleton className='h-5 w-1/4' />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Skeleton className='h-[50px] w-full' />
        <div className='mt-6 flex size-full gap-4 sm:gap-6'>
          <div className='flex size-full flex-col gap-2'>
            <Skeleton className='h-5' />
            <Skeleton className='h-5' />
          </div>

          <div className='flex size-full flex-col gap-2'>
            <Skeleton className='h-5' />
            <Skeleton className='h-5' />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TodoCardSkeleton;
