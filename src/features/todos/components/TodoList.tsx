'use client';

import React, { useState } from 'react';
import { AxiosError } from 'axios';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

import { useGetTodos } from '../hooks/get-todos';
import {
  type TodoSortType,
  type TodoStatusType,
  type TodoType,
} from '../types/todo';
import FilterByStatus from './FilterByStatus';
import FilterByType from './FilterByType';
import SortBy from './SortBy';
import TodoCard from './TodoCard';
import TodoCardSkeleton from './TodoCardSkeleton';
import TodoFetchError from './TodoFetchError';

const PAGE_SIZE = 9;

const order: Record<TodoSortType, 'asc' | 'desc'> = {
  dueDate: 'asc',
  title: 'asc',
  updatedAt: 'desc',
  createdAt: 'desc',
};

interface TodoListProps {
  className?: string;
}

const TodoList = ({ className }: TodoListProps) => {
  const [type, setType] = useState<TodoType>();
  const [status, setStatus] = useState<TodoStatusType>();
  const [sort, setSort] = useState<TodoSortType>('title');
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: PAGE_SIZE,
  });

  const todos = useGetTodos({
    sort: sort,
    status: status,
    type: type,
    limit: pagination.pageSize,
    offset: pagination.pageIndex * pagination.pageSize,
    order: order[sort],
  });

  return (
    <div className={cn('relative h-full w-full', className)}>
      <div className='flex flex-wrap items-center justify-start gap-2 pb-2 sm:gap-4 sm:pb-4'>
        <FilterByType value={type} onChange={setType} />
        <FilterByStatus value={status} className='w-fit' onChange={setStatus} />
        <SortBy value={sort} onChange={setSort} />
      </div>
      <div className='grid grid-cols-1 items-center gap-4 sm:grid-cols-3'>
        {todos.status === 'pending' &&
          Array(PAGE_SIZE)
            .fill(0)
            .map((_, index) => <TodoCardSkeleton key={index} />)}
        {todos.data?.todos.map((todo, index) => (
          <TodoCard key={index} todo={todo} />
        ))}
      </div>
      <div className='absolute bottom-0 flex w-full items-center justify-between p-2 px-20 sm:p-4'>
        {todos.data ? (
          <>
            <div className='flex w-full flex-row items-center justify-between'>
              <span className='w-full'>
                Showing {pagination.pageIndex + 1} of{' '}
                {Math.ceil(todos.data.todosCount / pagination.pageSize) || 1}{' '}
                Pages
              </span>
            </div>
            <div className='flex w-full flex-row items-center justify-between space-x-2 sm:w-fit sm:flex-row sm:justify-end'>
              <Button
                variant='outline'
                size='sm'
                onClick={() => {
                  setPagination((prev) => ({
                    ...prev,
                    pageIndex: prev.pageIndex - 1,
                  }));
                }}
                disabled={pagination.pageIndex === 0}
              >
                Previous
              </Button>
              <Button
                variant='outline'
                size='sm'
                onClick={() => {
                  setPagination((prev) => ({
                    ...prev,
                    pageIndex: prev.pageIndex + 1,
                  }));
                }}
                disabled={
                  todos.data?.todosCount
                    ? Math.ceil(todos.data.todosCount / pagination.pageSize) <=
                      pagination.pageIndex + 1
                    : false
                }
              >
                Next
              </Button>
            </div>
          </>
        ) : null}
      </div>
      {!todos.data && todos.error && (
        <TodoFetchError e={todos.error as AxiosError} />
      )}
    </div>
  );
};

export default TodoList;
