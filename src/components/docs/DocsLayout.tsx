'use client';

import React from 'react';
import { DocsSidebar } from './DocsSidebar';
import { cn } from '@/lib/utils';

interface DocsLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function DocsLayout({ children, className }: DocsLayoutProps) {
  return (
    <div className="flex h-[calc(100vh-60px)]">
      <DocsSidebar />
      <div className={cn("flex-1 overflow-y-auto", className)}>
        <div className="max-w-4xl mx-auto py-8 px-6">
          {children}
        </div>
      </div>
    </div>
  );
}
