import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Style Guide | Draftpen',
  description: 'A comprehensive style guide of Draftpen\'s design system',
};

export default function StyleGuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
