import React, { type PropsWithChildren } from 'react';
import { auth } from '@/server/auth';

import Unauthorized from '@/components/static/Unauthorized';

const Layout = async ({ children }: PropsWithChildren) => {
  const session = await auth();
  if (!session) {
    return <Unauthorized />;
  }
  return (
    <div className='h-[calc(100vh-68px)] p-2 sm:h-[calc(100vh-76px)] sm:p-4'>
      {children}
    </div>
  );
};

export default Layout;
