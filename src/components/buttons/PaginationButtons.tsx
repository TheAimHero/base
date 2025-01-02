import React from 'react';

import { cn } from '@/lib/utils';

import { Button } from '../ui/button';

interface Props {
  disableNext: boolean;
  onNextClick: () => void;
  disablePrevious: boolean;
  onPreviousClick: () => void;
  className?: string;
}

const PaginationButtons = ({
  disableNext,
  onNextClick,
  disablePrevious,
  onPreviousClick,
  className,
}: Props) => {
  return (
    <div className={cn('space-x-2 sm:space-x-2', className)}>
      <Button
        variant='outline'
        size='sm'
        onClick={onPreviousClick}
        disabled={disablePrevious}
      >
        Previous
      </Button>
      <Button
        variant='outline'
        size='sm'
        onClick={onNextClick}
        disabled={disableNext}
      >
        Next
      </Button>
    </div>
  );
};

export default PaginationButtons;
