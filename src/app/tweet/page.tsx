'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import MainLayout from '@/components/layout/MainLayout';

// Dynamically import the TweetEditor to prevent SSR issues with browser-only functionality
const TweetEditor = dynamic(
  () => import('@/components/editor/TweetEditor'),
  { ssr: false }
);

export default function TweetPage() {
  return (
    <MainLayout activeTab="tweet">
      <TweetEditor />
    </MainLayout>
  );
}
