import React, { type Dispatch, type SetStateAction } from 'react';

import { todoStatusArr } from '@/config/todo';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { type TodoStatusType } from '@/features/todos/types/todo';

interface Props {
  className?: string;
  value: TodoStatusType | undefined;
  onChange: Dispatch<SetStateAction<TodoStatusType | undefined>>;
}

const FilterByStatus = ({ onChange, value, className }: Props) => {
  return (
    <Select
      onValueChange={(value) =>
        onChange(value === 'all' ? undefined : (value as TodoStatusType))
      }
      value={value ?? 'all'}
    >
      <SelectTrigger
        className={cn(
          'capitalize',
          buttonVariants({ variant: 'outline', size: 'sm' }),
          className,
        )}
      >
        Todo Status:
        <SelectValue placeholder={'Private'} defaultValue={'all'} />
      </SelectTrigger>
      <SelectContent>
        {todoStatusArr.map((t) => (
          <SelectItem key={t} value={t} className='capitalize'>
            {t}
          </SelectItem>
        ))}
        <SelectItem value={'all'}>All</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default FilterByStatus;
