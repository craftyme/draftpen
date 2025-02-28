'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import MainLayout from '@/components/layout/MainLayout';

// Dynamically import the CodeEditor to prevent SSR issues with browser-only functionality
const CodeEditor = dynamic(
  () => import('@/components/editor/CodeEditor'),
  { ssr: false }
);

export default function CodePage() {
  return (
    <MainLayout activeTab="code">
      <CodeEditor />
    </MainLayout>
  );
}
