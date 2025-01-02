'use client';

import React, { useState, type PropsWithChildren } from 'react';

import { SidebarProvider as _SidebarProvider } from '@/components/ui/sidebar';

const SidebarProvider = ({ children }: PropsWithChildren) => {
  const [open, setOpen] = useState(false);
  return (
    <_SidebarProvider open={open} onOpenChange={setOpen}>
      {children}
    </_SidebarProvider>
  );
};

export default SidebarProvider;
