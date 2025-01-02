'use client';

import React from 'react';
import { HashIcon } from 'lucide-react';

import { useIsMobile } from '@/hooks/use-mobile';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TodoCreateForm from '@/features/todos/components/form/TodoCreateForm';
import TodoList from '@/features/todos/components/TodoList';

const Page = () => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Tabs defaultValue='list' className='w-full px-4 pt-2'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='list'>Todos</TabsTrigger>
          <TabsTrigger value='form'>Add Todo</TabsTrigger>
        </TabsList>
        <TabsContent value='list'>
          <div className='flex size-full flex-col gap-2 sm:gap-4'>
            <TodoList className='px-2 sm:px-4' />
          </div>
        </TabsContent>
        <TabsContent value='form'>
          <TodoCreateForm className='px-2 sm:px-4' />
        </TabsContent>
      </Tabs>
    );
  }

  return (
    <div className='grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-4'>
      <div className='sm:col-span-2'>
        <h1 className='flex w-full flex-row items-center text-3xl font-bold'>
          <HashIcon />
          Todos
        </h1>
        <TodoList className='px-2 sm:px-4' />
      </div>
      <div>
        <h1 className='flex w-full flex-row items-center text-3xl font-bold'>
          <HashIcon />
          Add Todos
        </h1>
        <TodoCreateForm className='px-2 sm:px-4' />
      </div>
    </div>
  );
};

export default Page;
