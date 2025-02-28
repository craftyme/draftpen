'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import MainLayout from '@/components/layout/MainLayout';

// Dynamically import the EssayEditor to prevent SSR issues with browser-only functionality
const EssayEditor = dynamic(
  () => import('@/components/editor/EssayEditor'),
  { ssr: false }
);

export default function EssayPage() {
  return (
    <MainLayout activeTab="essay">
      <EssayEditor />
    </MainLayout>
  );
}
