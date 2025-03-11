"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EbookToolsPage() {
  const router = useRouter();

  // Redirect to the epub-to-mobi page by default
  useEffect(() => {
    router.push("/ebook-tools/epub-to-mobi");
  }, [router]);

  return null;
}
