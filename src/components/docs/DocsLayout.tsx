'use client';

import React from 'react';
import { DocsSidebar } from './DocsSidebar';
import { UpdatesSidebar } from './UpdatesSidebar';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

interface DocsLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function DocsLayout({ children, className }: DocsLayoutProps) {
  const pathname = usePathname();
  const isUpdatesPage = pathname.startsWith('/updates');

  return (
    <div className="flex h-[calc(100vh-60px)]">
      {isUpdatesPage ? <UpdatesSidebar /> : <DocsSidebar />}
      <div className={cn("flex-1 overflow-y-auto", className)}>
        <div className="max-w-4xl mx-auto py-8 px-6">
          {children}
        </div>
      </div>
    </div>
  );
}
