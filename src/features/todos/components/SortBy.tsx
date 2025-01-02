import React, { type Dispatch, type SetStateAction } from 'react';

import { todoSortArr } from '@/config/todo';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { type TodoSortType } from '@/features/todos/types/todo';

interface Props {
  className?: string;
  value?: TodoSortType;
  onChange: Dispatch<SetStateAction<TodoSortType>>;
}

const SortBy = ({ onChange, value, className }: Props) => {
  return (
    <Select
      onValueChange={(value) => onChange(value as TodoSortType)}
      value={value ?? 'all'}
    >
      <SelectTrigger
        className={cn(
          'w-fit capitalize',
          buttonVariants({ variant: 'outline', size: 'sm' }),
          className,
        )}
      >
        Todo Type:
        <SelectValue placeholder={'Title'} />
      </SelectTrigger>
      <SelectContent>
        {todoSortArr.map((t) => (
          <SelectItem key={t} value={t} className='capitalize'>
            {t}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SortBy;
