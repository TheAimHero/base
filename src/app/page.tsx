import Link from 'next/link';
import { auth } from '@/server/auth';
import { ArrowRightIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import LoginButton from '@/components/buttons/LoginButton';

export default async function Home() {
  const session = await auth();
  return (
    <div className='flex h-[calc(100vh-60px)] items-center justify-center'>
      <div className='max-w-full shrink-0 px-4 text-center lg:mx-0 lg:max-w-3xl'>
        <h1 className='text-5xl font-bold tracking-tight text-primary sm:text-6xl'>
          Revolutionize your
          <span className='text-sky-500'> Workflow</span> with our
          <span className='text-sky-500'> Todos</span>
        </h1>
        <p className='mt-6 text-lg capitalize leading-8 text-primary/60'>
          elevate your productivity with todos, your personalized task manager.
        </p>
        <div className='mt-5 flex items-center justify-center gap-x-6'>
          {session ? (
            <Link
              href={`/todos`}
              className={cn(
                buttonVariants(),
                'text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
              )}
              rel='noreferrer'
            >
              Get Started
              <ArrowRightIcon />
            </Link>
          ) : (
            <LoginButton className='' />
          )}
        </div>
      </div>
    </div>
  );
}
