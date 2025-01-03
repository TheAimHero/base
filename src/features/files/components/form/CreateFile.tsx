'use client';

import { type HTMLAttributes } from 'react';
import Image from 'next/image';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { CloudUpload, Loader2Icon, SendIcon } from 'lucide-react';
import { type DropzoneOptions } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { cn } from '@/lib/utils';
import { useFileUpload } from '@/hooks/store/uploadFile';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from '@/components/ui/file-upload';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useCreateFile } from '@/features/files/hooks/createFiles';
import { filesQueryKeys } from '@/features/files/query/files';
import { createFileReqSchema } from '@/features/files/schema/files';

const formSchema = createFileReqSchema.omit({ keys: true }).and(
  z.object({
    files: z
      .array(z.instanceof(File))
      .max(6, { message: 'Please upload at most 5 files.' })
      .min(1, { message: 'Please upload at least one file.' }),
  }),
);

interface Props extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const CreateFile = ({ ...props }: Props) => {
  const { toast } = useToast();

  const queryClient = useQueryClient();

  const dropZoneConfig: DropzoneOptions = {
    maxFiles: 6,
    maxSize: 1024 * 1024 * 10,
    multiple: true,
    accept: { 'image/*': [], 'video/*': [], 'application/pdf': [] },
  };

  const upload = useFileUpload(3600 * 1000);

  const createFile = useCreateFile({
    onSuccess: () => {
      toast({ title: 'Success', description: 'Your file was created.' });
      form.reset();
      void queryClient.invalidateQueries({ queryKey: filesQueryKeys.all });
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: { name: '', description: '', files: [] },
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { name, description, files } = values;
      const keys: string[] = [];
      for (const file of files) {
        const { key } = await upload.mutateAsync({ file });
        keys.push(key);
      }
      createFile.mutate({ name, description, keys });
    } catch (e) {
      toast({
        title: 'Error',
        description: 'Your file was not created. Please try again.',
        variant: 'destructive',
      });
    }
  }

  return (
    <div {...props} className={cn('space-y-8', props.className)}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='mx-auto max-w-3xl space-y-8 py-10'
        >
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>File Names</FormLabel>
                <FormControl>
                  <Input placeholder='Memories' type='text' {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name. You can change it later.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Description of your files.'
                    className='resize-none'
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is how you will identify contents of files later on.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='files'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select File</FormLabel>
                <FormControl>
                  <FileUploader
                    value={field.value}
                    onValueChange={field.onChange}
                    dropzoneOptions={dropZoneConfig}
                    className='relative rounded-lg bg-background p-2'
                  >
                    <FileInput
                      id='fileInput'
                      className='outline-dashed outline-1 outline-slate-500'
                    >
                      <div className='flex w-full flex-col items-center justify-center p-8'>
                        <CloudUpload className='size-10 text-gray-500' />
                        <p className='mb-1 text-sm text-gray-500 dark:text-gray-400'>
                          <span className='font-semibold'>Click to upload</span>
                          &nbsp; or drag and drop
                        </p>
                        <p className='text-xs text-gray-500 dark:text-gray-400'>
                          Image, Video, PDF up to 10MB
                        </p>
                      </div>
                    </FileInput>
                    <FileUploaderContent className='flex flex-row items-center gap-2'>
                      {field.value?.map((file, i) => (
                        <FileUploaderItem
                          key={i}
                          index={i}
                          className='size-20 overflow-hidden rounded-md p-0'
                          aria-roledescription={`file ${i + 1} containing ${file.name}`}
                        >
                          <Image
                            src={URL.createObjectURL(file)}
                            alt={file.name}
                            height={80}
                            width={80}
                            className='size-20 p-0'
                          />
                        </FileUploaderItem>
                      ))}
                    </FileUploaderContent>
                  </FileUploader>
                </FormControl>
                <FormDescription>
                  Select a file to upload. Max 5 files.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type='submit'
            disabled={upload.isPending || createFile.isPending}
          >
            {upload.isPending || createFile.isPending ? (
              <Loader2Icon className='animate-spin' />
            ) : (
              <SendIcon />
            )}
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateFile;
