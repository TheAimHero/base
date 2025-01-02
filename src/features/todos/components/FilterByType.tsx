import React, { type Dispatch, type SetStateAction } from 'react';

import { todoTypeArr } from '@/config/todo';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { type TodoType } from '@/features/todos/types/todo';

interface Props {
  className?: string;
  value?: TodoType;
  onChange: Dispatch<SetStateAction<TodoType | undefined>>;
}

const FilterByType = ({ onChange, value, className }: Props) => {
  return (
    <Select
      onValueChange={(value) =>
        onChange(value === 'all' ? undefined : (value as TodoType))
      }
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
        <SelectValue placeholder={'Private'} defaultValue={'all'} />
      </SelectTrigger>
      <SelectContent>
        {todoTypeArr.map((t) => (
          <SelectItem key={t} value={t} className='capitalize'>
            {t}
          </SelectItem>
        ))}
        <SelectItem value={'all'}>All</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default FilterByType;
