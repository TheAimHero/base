'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Loader2Icon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import AvatarButton from '@/components/buttons/AvatarButton';
import AuthButton from '@/components/buttons/LoginButton';

const ModeToggleButton = dynamic(
  () => import('@/components/buttons/ModeToggle'),
  {
    ssr: false,
    loading: () => (
      <Button>
        <Loader2Icon className='size-4 animate-spin' />
      </Button>
    ),
  },
);

const Navbar = () => {
  return (
    <nav className='sticky top-0 z-20 flex h-[60px] w-full items-center justify-between border-b bg-secondary p-2 sm:p-4'>
      <SidebarTrigger />
      <div className='items-center'>
        <Link href='/'>
          <span className='text-2xl font-bold'>base.</span>
        </Link>
      </div>
      <div className='flex gap-2 sm:gap-4'>
        <AvatarButton />
        <AuthButton />
        <ModeToggleButton />
      </div>
    </nav>
  );
};

export default Navbar;
