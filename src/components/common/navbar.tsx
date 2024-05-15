'use client';

import useScrollCallback from '@/lib/hooks/use-scroll-callback';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface NavbarProps {
  children: React.ReactNode;
}

const Navbar = ({ children }: NavbarProps) => {
  const [isAtTop, setIsAtTop] = useState(true);
  useScrollCallback({
    callback: (offsetTop) => {
      setIsAtTop(offsetTop < 10);
    },
  });
  return (
    <div
      className={cn(
        'container sticky top-0 z-10 flex items-center justify-between gap-x-8 px-8 py-4 transition-colors',
        !isAtTop && 'bg-gradient-to-b from-background to-transparent',
      )}>
      {children}
    </div>
  );
};

export default Navbar;
