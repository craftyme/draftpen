'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the ChangelogEditor to prevent SSR issues with browser-only functionality
const ChangelogEditor = dynamic(
  () => import('@/components/editor/ChangelogEditor'),
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center w-full h-96 bg-gray-100 rounded-lg">
        <p className="text-xl font-semibold">Draftpen Changelog Editor - Loading...</p>
      </div>
    )
  }
);

export default function ChangelogPage() {
  return <ChangelogEditor />;
}
