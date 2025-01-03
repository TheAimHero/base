'use client';

import React from 'react';
import { HashIcon } from 'lucide-react';

import { useIsMobile } from '@/hooks/use-mobile';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FileList from '@/features/files/components/FileList';
import CreateFile from '@/features/files/components/form/CreateFile';

const Page = () => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Tabs defaultValue='list' className='w-full px-4 pt-2'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='list'>Files</TabsTrigger>
          <TabsTrigger value='form'>Add Files</TabsTrigger>
        </TabsList>
        <TabsContent value='list'>
          <div className='flex size-full flex-col gap-2 sm:gap-4'>
            <FileList />
          </div>
        </TabsContent>
        <TabsContent value='form'>
          <CreateFile />
        </TabsContent>
      </Tabs>
    );
  }

  return (
    <div className='grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-4'>
      <div className='sm:col-span-2'>
        <h1 className='flex w-full flex-row items-center text-3xl font-bold'>
          <HashIcon />
          Files
        </h1>
        <FileList className='py-2' />
      </div>
      <div>
        <h1 className='flex w-full flex-row items-center text-3xl font-bold'>
          <HashIcon />
          Add Files
        </h1>
        <CreateFile />
      </div>
    </div>
  );
};

export default Page;
