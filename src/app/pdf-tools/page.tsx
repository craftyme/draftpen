'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PdfToolsPage() {
  const router = useRouter();
  
  // Redirect to the compress page by default
  useEffect(() => {
    router.push('/pdf-tools/compress');
  }, [router]);
  
  return null;
}
