import React from 'react';
import { HashIcon } from 'lucide-react';

import TodoCreateForm from '@/features/todos/components/form/TodoCreateForm';
import TodoList from '@/features/todos/components/TodoList';

const Page = () => {
  return (
    <div className='grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-4'>
      <div className='sm:col-span-2'>
        <h1 className='flex w-full flex-row items-center p-2 text-3xl font-bold sm:p-4'>
          <HashIcon />
          Todos
        </h1>
        <TodoList className='p-2 sm:p-4' />
      </div>
      <div>
        <h1 className='flex w-full flex-row items-center p-2 text-3xl font-bold sm:p-4'>
          <HashIcon />
          Add Todos
        </h1>
        <TodoCreateForm className='p-2 sm:p-4' />
      </div>
    </div>
  );
};

export default Page;
