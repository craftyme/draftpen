import { Metadata } from 'next';
import MainLayout from '@/components/layout/MainLayout';
import { DocsLayout } from '@/components/docs/DocsLayout';

export const metadata: Metadata = {
  title: 'Style Guide | Draftpen',
  description: 'A comprehensive style guide of Draftpen\'s design system',
};

export default function StyleGuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MainLayout activeTab="style-guide">
      <DocsLayout>
        {children}
      </DocsLayout>
    </MainLayout>
  );
}
