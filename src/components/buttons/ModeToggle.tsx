'use client';

import React from 'react';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '../ui/button';

interface Props {
  className?: string;
}

const ModeToggleButton = ({ className }: Props) => {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className={className}
    >
      {theme === 'light' ? <SunIcon /> : null}
      {theme === 'dark' ? <MoonIcon /> : null}
    </Button>
  );
};

export default ModeToggleButton;
