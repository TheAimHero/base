'use client';

import React from 'react';
import { UserIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const AvatarButton = () => {
  const { data, status } = useSession();
  if (status === 'unauthenticated') {
    return null;
  }
  return (
    <Avatar>
      <AvatarImage
        src={data?.user.image ?? ''}
        alt={data?.user.name ?? ''}
        className='capitalize'
      />
      <AvatarFallback className='select-none border border-black bg-muted'>
        <UserIcon />
      </AvatarFallback>
    </Avatar>
  );
};

export default AvatarButton;
