'use client';

import React, { type PropsWithChildren } from 'react';

import { Toaster } from '@/components/ui/toaster';

const ToastProvider = ({ children }: PropsWithChildren) => {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
};

export default ToastProvider;
