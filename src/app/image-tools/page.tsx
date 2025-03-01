'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ImageToolsPage() {
  const router = useRouter();
  
  useEffect(() => {
    router.push('/image-tools/image-resizer');
  }, [router]);
  
  return null;
}
