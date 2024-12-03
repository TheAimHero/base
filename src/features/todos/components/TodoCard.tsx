import React from 'react';

import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { type TodoSelectType } from '../types/todo';

interface Props {
  className?: string;
  todo: TodoSelectType;
}

const TodoCard = ({ className, todo }: Props) => {
  return (
    <Card className={cn('relative block overflow-hidden', className)}>
      <span className='absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600'></span>

      <CardHeader className='p-2 sm:flex sm:flex-row sm:justify-between sm:gap-4 sm:p-4'>
        <CardTitle className='flex w-full items-center justify-between'>
          {todo.title}
          <div className='flex justify-end gap-2 sm:gap-4'>
            <Badge className='capitalize'>{todo.status}</Badge>
            <Badge className='capitalize'>{todo.type}</Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className='h-[50px] w-full text-pretty text-sm'>
          {todo.description || 'No description provided.'}
        </p>
        <dl className='mt-6 flex items-center justify-between gap-4 sm:gap-6'>
          <div className='flex flex-col'>
            <dt className='text-sm font-medium'>Created At:</dt>
            <dd className='text-xs'>
              {new Date(todo.dueDate).toLocaleString()}
            </dd>
          </div>

          <div className='flex flex-col'>
            <dt className='text-sm font-medium'>Due Date:</dt>
            <dd className='text-xs'>
              {new Date(todo.dueDate).toLocaleString()}
            </dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
};

export default TodoCard;
