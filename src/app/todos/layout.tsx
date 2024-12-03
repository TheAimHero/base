import React, { type PropsWithChildren } from 'react';
import { auth } from '@/server/auth';

import Unauthorized from '@/components/static/Unauthorized';

const Layout = async ({ children }: PropsWithChildren) => {
  const session = await auth();
  if (!session) {
    return <Unauthorized />;
  }
  return <>{children}</>;
};

export default Layout;
