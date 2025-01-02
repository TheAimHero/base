'use client';

import React, { useState } from 'react';
import { type AxiosError } from 'axios';

import { cn } from '@/lib/utils';
import PaginationButtons from '@/components/buttons/PaginationButtons';
import FilterByStatus from '@/features/todos/components/FilterByStatus';
import FilterByType from '@/features/todos/components/FilterByType';
import SortBy from '@/features/todos/components/SortBy';
import TodoCardSkeleton from '@/features/todos/components/static/TodoCardSkeleton';
import TodoFetchError from '@/features/todos/components/static/TodoFetchError';
import TodoCard from '@/features/todos/components/TodoCard';
import { useGetTodos } from '@/features/todos/hooks/getTodos';
import {
  type TodoSortType,
  type TodoStatusType,
  type TodoType,
} from '@/features/todos/types/todo';

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
    <div className={cn('h-[100svh] w-full sm:h-full', className)}>
      <div className='flex items-center justify-start gap-2 py-2 sm:gap-4 sm:py-4'>
        <FilterByType value={type} onChange={setType} />
        <FilterByStatus value={status} className='w-fit' onChange={setStatus} />
        <SortBy value={sort} onChange={setSort} />
      </div>
      <div className='grid grid-cols-1 items-end gap-2 space-y-2 sm:grid-cols-3 sm:gap-4 sm:space-y-4'>
        {todos.status === 'pending' &&
          Array(PAGE_SIZE)
            .fill(0)
            .map((_, index) => <TodoCardSkeleton key={index} />)}
        {todos.data?.todos.map((todo, index) => (
          <TodoCard key={index} todo={todo} />
        ))}
      </div>
      <div className='flex w-full items-center justify-between p-2 px-20 sm:p-4'>
        {todos.data ? (
          <>
            <div className='flex w-full flex-row items-center justify-evenly'>
              <span className='w-full'>
                Showing {pagination.pageIndex + 1} of{' '}
                {Math.ceil(todos.data.todosCount / pagination.pageSize) || 1}{' '}
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
                todos.data?.todosCount !== undefined
                  ? Math.ceil(todos.data.todosCount / pagination.pageSize) -
                      1 <=
                    pagination.pageIndex
                  : true
              }
            />
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
