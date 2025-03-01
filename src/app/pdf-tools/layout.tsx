'use client';

import MainLayout from '@/components/layout/MainLayout';

export default function PdfToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MainLayout activeTab="pdf-tools">
      {children}
    </MainLayout>
  );
}
