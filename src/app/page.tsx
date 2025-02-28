'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import MainLayout from '@/components/layout/MainLayout';

// Dynamically import the ScreenshotEditor to prevent SSR issues with browser-only functionality
const ScreenshotEditor = dynamic(
  () => import('@/components/editor/ScreenshotEditor'),
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center w-full h-96 bg-gray-100 rounded-lg">
        <p className="text-xl font-semibold">Draftpen Screenshot Editor - Loading...</p>
      </div>
    )
  }
);

export default function ScreenshotPage() {
  return (
    <MainLayout activeTab="screenshot">
      <ScreenshotEditor />
    </MainLayout>
  );
}
