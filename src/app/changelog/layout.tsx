'use client';

import React from 'react';
import MainLayout from '@/components/layout/MainLayout';

export default function ChangelogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MainLayout activeTab="changelog">
      {children}
    </MainLayout>
  );
}
