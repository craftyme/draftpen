'use client';

import MainLayout from '@/components/layout/MainLayout';

export default function ImageToolsRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MainLayout activeTab="image-tools">
      {children}
    </MainLayout>
  );
}
