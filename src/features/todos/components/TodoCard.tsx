import React from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { MoreHorizontalIcon, Trash2Icon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useDeleteTodo } from '@/features/todos/hooks/deleteTodo';
import { todoQueryKeys } from '@/features/todos/query/todo';
import { type TodoSelectType } from '@/features/todos/types/todo';

interface Props {
  className?: string;
  todo: TodoSelectType;
}

const TodoCard = ({ className, todo }: Props) => {
  const { toast } = useToast();

  const queryClient = useQueryClient();

  const deleteTodo = useDeleteTodo(todo.id, {
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: todoQueryKeys.all });
      toast({
        title: 'Todo deleted.',
        description: 'Your todo has been deleted.',
      });
    },

    onError: () => {
      toast({
        title: 'Something went wrong.',
        description: 'Your todo could not be deleted.',
      });
    },
  });

  return (
    <Card className={cn('relative block overflow-hidden', className)}>
      <span className='absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600'></span>
      <CardHeader className='p-2 sm:flex sm:flex-row sm:justify-between sm:gap-4 sm:p-4'>
        <CardTitle className='flex w-full items-center justify-between'>
          {todo.title}
          <div className='flex justify-end gap-2 sm:gap-4'>
            <div className='flex items-center space-x-2 sm:space-x-4'>
              <Badge className='capitalize'>{todo.status}</Badge>
              <Badge className='capitalize'>{todo.type}</Badge>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button type='button' variant='outline' className='size-8 p-0'>
                  <span className='sr-only'>Open menu</span>
                  <MoreHorizontalIcon className='size-4' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => deleteTodo.mutate()}
                  disabled={deleteTodo.isPending}
                >
                  <Trash2Icon />
                  {deleteTodo.isPending ? 'Deleting...' : 'Delete'}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
