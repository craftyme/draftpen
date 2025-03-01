import { Metadata } from 'next';
import MainLayout from '@/components/layout/MainLayout';
import { DocsLayout } from '@/components/docs/DocsLayout';

export const metadata: Metadata = {
  title: 'Updates | Draftpen',
  description: 'Latest updates and changes to Draftpen',
};

export default function UpdatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MainLayout activeTab="updates">
      <DocsLayout>
        {children}
      </DocsLayout>
    </MainLayout>
  );
}
