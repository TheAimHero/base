'use client';

import React from 'react';
import { Loader2Icon } from 'lucide-react';
import { signIn, signOut, useSession } from 'next-auth/react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface Props {
  className?: string;
}

const AuthButton = ({ className }: Props) => {
  const { status } = useSession();
  return (
    <Button
      onClick={() =>
        status === 'authenticated' ? signOut() : signIn('google')
      }
      className={cn('max-w-xs', className)}
      variant='default'
    >
      {status === 'loading' && <Loader2Icon className='animate-spin' />}
      {status === 'authenticated' && 'Sign Out'}
      {status === 'unauthenticated' && 'Sign In'}
    </Button>
  );
};

export default AuthButton;
