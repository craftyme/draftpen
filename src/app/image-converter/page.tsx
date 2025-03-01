'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ImageConverterPage() {
  const router = useRouter();
  
  // Redirect to the PDF to JPG page by default
  useEffect(() => {
    router.push('/image-converter/pdf-to-jpg');
  }, [router]);
  
  return null;
}
