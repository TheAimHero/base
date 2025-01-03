import React from 'react';
import Image from 'next/image';
import { useQueryClient } from '@tanstack/react-query';
import { ExpandIcon, Loader2Icon, Trash2Icon } from 'lucide-react';

import { formatDateTime } from '@/lib/datetime';
import { cn } from '@/lib/utils';
import { useFileMultiGet } from '@/hooks/store/getMultiFile';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useDeleteFile } from '@/features/files/hooks/deleteFile';
import { type FileSelectType } from '@/features/files/types/files';

import { filesQueryKeys } from '../query/files';

interface Props {
  className?: string;
  file: FileSelectType;
}

const FileCard = ({ className, file }: Props) => {
  const queryClient = useQueryClient();

  const { toast } = useToast();

  const { data } = useFileMultiGet({ keys: file.keys });

  const deleteFile = useDeleteFile(file.id, {
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: filesQueryKeys.all });
      toast({
        title: 'Success',
        description: 'Your file was deleted successfully.',
      });
    },
  });

  return (
    <Card className={cn('relative block overflow-hidden', className)}>
      <span className='absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600'></span>
      <CardHeader className='p-2 sm:flex sm:flex-row sm:justify-between sm:gap-4 sm:p-4'>
        <CardTitle className='flex w-full items-center justify-between'>
          {file.name}
          <div className='space-x-2 sm:space-x-4'>
            <Dialog>
              <DialogTrigger asChild>
                <Button size='icon' variant='outline' className='px-4'>
                  <ExpandIcon />
                </Button>
              </DialogTrigger>
              <DialogContent className='h-[90vh] max-h-[95vh] w-[95vw] max-w-[95vw] sm:h-[95vh]'>
                <DialogTitle>{file.name}</DialogTitle>
                <ScrollArea>
                  <div className='grid grid-cols-1 gap-2 sm:grid-cols-3 sm:grid-rows-2 sm:gap-4'>
                    {data.map((f) => {
                      if (!f?.url) return null;
                      return (
                        <Image
                          key={f.key}
                          src={f?.url}
                          alt={`${file.name}-${f.key}`}
                          height={1000}
                          width={1000}
                          className='col-span-1 row-span-1 size-auto p-0'
                        />
                      );
                    })}
                  </div>
                </ScrollArea>
              </DialogContent>
            </Dialog>
            <Button
              size='icon'
              variant='destructive'
              onClick={() => deleteFile.mutate()}
              disabled={deleteFile.isPending}
            >
              {deleteFile.isPending ? (
                <Loader2Icon className='animate-spin' />
              ) : (
                <Trash2Icon />
              )}
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className='h-[50px] w-full text-pretty text-sm'>
          {file.description || 'No description provided.'}
        </p>
        <div className='grid grid-cols-3 grid-rows-2 gap-2'>
          {data.map((f) => {
            if (!f?.url) return null;
            return (
              <Image
                key={f.key}
                src={f?.url}
                alt={`${file.name}-${f.key}`}
                height={1000}
                width={1000}
                className='col-span-1 row-span-1 size-20 p-0'
              />
            );
          })}
        </div>
        <dl className='mt-6 flex items-center justify-between gap-4 sm:gap-6'>
          <div className='flex flex-col'>
            <dt className='text-sm font-medium'>Created At:</dt>
            <dd className='text-xs'>{formatDateTime(file.createdAt)}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
};

export default FileCard;
