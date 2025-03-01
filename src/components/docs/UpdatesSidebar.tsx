'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface UpdatesSidebarProps {
  className?: string;
}

interface Version {
  title: string;
  href: string;
  date?: string;
}

export function UpdatesSidebar({ className }: UpdatesSidebarProps) {
  const pathname = usePathname();
  const [versions, setVersions] = useState<Version[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/changelog')
      .then(response => response.json())
      .then(data => {
        // Parse the changelog to extract versions
        const content = data.content;
        const versionRegex = /## \[(.*?)\](?: - (\d{4}-\d{2}-\d{2}))?/g;
        const extractedVersions: Version[] = [];
        let match;

        // Add Unreleased first
        extractedVersions.push({
          title: 'Unreleased',
          href: '/updates#unreleased',
        });

        // Extract all versions with dates
        while ((match = versionRegex.exec(content)) !== null) {
          const version = match[1];
          const date = match[2] || '';
          
          if (version.toLowerCase() !== 'unreleased') {
            extractedVersions.push({
              title: version,
              href: `/updates#${version}`,
              date: date
            });
          }
        }

        setVersions(extractedVersions);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading versions:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className={cn("w-64 h-full overflow-y-auto py-6 px-3 border-r", className)}>
      <div className="mb-6 px-3">
        <h2 className="text-lg font-medium tracking-tight">Updates</h2>
        <p className="text-sm text-muted-foreground font-light">
          Version history and changes
        </p>
      </div>
      <nav className="space-y-1">
        {loading ? (
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900 dark:border-gray-100"></div>
          </div>
        ) : (
          versions.map((version) => (
            <Link
              key={version.title}
              href={version.href}
              className={cn(
                "flex items-center px-3 py-2 text-sm rounded-md transition-colors",
                pathname === version.href
                  ? "bg-accent text-accent-foreground font-medium"
                  : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground"
              )}
            >
              <span className="truncate">{version.title}</span>
              {version.date && (
                <span className="ml-auto text-xs text-muted-foreground">
                  {version.date}
                </span>
              )}
            </Link>
          ))
        )}
      </nav>
    </div>
  );
}
