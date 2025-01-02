'use client';

import * as React from 'react';
import {
  ThemeProvider as _ThemeProvider,
  type ThemeProviderProps,
} from 'next-themes';

const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
  return (
    <_ThemeProvider
      {...props}
      defaultTheme='light'
      enableSystem={false}
      attribute='class'
    >
      {children}
    </_ThemeProvider>
  );
};

export default ThemeProvider;
