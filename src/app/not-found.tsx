import React from 'react';
import Link from 'next/link';
import { BoxesIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

const NotFoundPage = () => {
  return (
    <section className='px-10 py-32'>
      <div className='container'>
        <div className='grid items-center gap-8 lg:grid-cols-2'>
          <div className='flex-col items-center text-center lg:items-start lg:text-left'>
            <h1 className='my-6 text-pretty text-4xl font-bold lg:text-6xl'>
              404 Page Not Found
            </h1>
            <p className='mb-8 flex max-w-xl flex-col text-balance text-muted-foreground lg:text-xl'>
              <span>This page doesn&apos;t exist.</span>
              <span>Return to the home page.</span>
            </p>
            <div className='flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start'>
              <Link
                href='/'
                className={cn(buttonVariants(), 'w-full sm:w-auto')}
              >
                Home
              </Link>
            </div>
          </div>
          <BoxesIcon className='size-[500px] font-thin text-primary shadow-secondary' />
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
