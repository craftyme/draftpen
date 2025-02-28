'use client';

import React from 'react';
import MainLayout from '@/components/layout/MainLayout';

export default function SocialProofLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MainLayout activeTab="social-proof">
      {children}
    </MainLayout>
  );
}
