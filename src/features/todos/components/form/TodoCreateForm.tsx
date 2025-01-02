'use client';

import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { Loader2, SendIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import type z from 'zod';

import { todoStatusArr, todoTypeArr } from '@/config/todo';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Button, buttonVariants } from '@/components/ui/button';
import { DatetimePicker } from '@/components/ui/datetime-picker';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

import { useCreateTodo } from '../../hooks/createTodo';
import { todoQueryKeys } from '../../query/todo';
import { createTodoReqSchema } from '../../schema/todo';

const formSchema = createTodoReqSchema;

interface Props {
  className?: string;
}

export const TodoCreateForm = ({ className }: Props) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    reValidateMode: 'onChange',
    mode: 'onChange',
    defaultValues: {
      status: 'active',
      type: 'private',
      title: '',
      description: '',
      dueDate: new Date(new Date().valueOf() + 1000 * 60 * 2),
    },
  });

  const createTodo = useCreateTodo({
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: todoQueryKeys.all });
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    createTodo.mutate(values, {
      onSuccess: (data) => {
        toast({
          title: 'Todo created.',
          description: 'Your todo has been created.',
          action: (
            <Link
              href={`/todos/${data.id}`}
              className={buttonVariants({ variant: 'outline', size: 'sm' })}
            >
              View
            </Link>
          ),
        });
      },
      onError: () => {
        toast({
          title: 'Something went wrong.',
          description: 'Your todo could not be created.',
        });
      },
    });
  }

  console.log(form.watch());

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(
          'mx-auto max-w-3xl space-y-8 pt-10 capitalize',
          className,
        )}
      >
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder='Complete watching pending anime episodes.'
                  type='text'
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Meaningful title under 50 characters.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={`MHA \nOne Piece \nFMA Brotherhood`}
                  className='h-20 resize-none'
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Description of your todo, and extra information under 200
                characters
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='status'
          render={({ field }) => (
            <FormItem className='capitalize'>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className='capitalize'>
                    <SelectValue placeholder={'Active'} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {todoStatusArr.map((s) => (
                    <SelectItem key={s} value={s} className='capitalize'>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>Status of your todo</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='type'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Visibility</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className='capitalize'>
                    <SelectValue placeholder={'Private'} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {todoTypeArr.map((t) => (
                    <SelectItem key={t} value={t} className='capitalize'>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Keep todos private or allow others to see them.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='dueDate'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel>Due Date</FormLabel>
              <DatetimePicker
                className='flex w-[300px] justify-between'
                {...field}
                placeholders={{
                  'am/pm': 'AM',
                  days: '',
                  hours: '',
                  minutes: '',
                  months: '',
                  years: '',
                  seconds: '',
                }}
                dtOptions={{ date: field.value, hour12: true }}
                value={field.value}
                format={[
                  ['days', 'months', 'years'],
                  ['hours', 'minutes', 'am/pm'],
                ]}
              />
              <FormDescription>Add due date of todo.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' disabled={createTodo.isPending}>
          {createTodo.isPending ? (
            <Loader2 className='animate-spin' />
          ) : (
            <SendIcon />
          )}
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default TodoCreateForm;
