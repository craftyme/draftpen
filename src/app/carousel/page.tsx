'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import MainLayout from '@/components/layout/MainLayout';

// Dynamically import the CarouselEditor to prevent SSR issues with browser-only functionality
const CarouselEditor = dynamic(
  () => import('@/components/editor/CarouselEditor'),
  { ssr: false }
);

export default function CarouselPage() {
  return (
    <MainLayout activeTab="carousel">
      <CarouselEditor />
    </MainLayout>
  );
}
