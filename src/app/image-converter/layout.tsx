import React from 'react';
import MainLayout from '@/components/layout/MainLayout';

export default function ImageConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MainLayout activeTab="image-converter">
      {children}
    </MainLayout>
  );
}
