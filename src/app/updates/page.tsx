'use client';

import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function UpdatesPage() {
  const [changelog, setChangelog] = useState<string>('');

  useEffect(() => {
    // Fetch the changelog content
    fetch('/api/changelog')
      .then(response => response.json())
      .then(data => {
        setChangelog(data.content);
      })
      .catch(error => {
        console.error('Error loading changelog:', error);
      });
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-medium mb-2 tracking-tight">DraftPen Updates</h1>
        <p className="text-lg text-muted-foreground font-light">
          A chronological record of all notable changes to DraftPen
        </p>
      </div>

      {!changelog ? (
        <div className="flex items-center justify-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-gray-100"></div>
        </div>
      ) : (
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={{
              h2: ({...props}) => {
                // Extract version from heading text (e.g., "[1.0.0] - 2024-12-01" -> "1.0.0")
                const headingText = String(props.children);
                const versionMatch = headingText.match(/\[(.*?)\]/);
                const version = versionMatch ? versionMatch[1] : headingText.toLowerCase().replace(/\s+/g, '-');
                
                return (
                  <h2 
                    id={version}
                    className="text-xl font-medium mt-8 mb-4 pb-2 border-b" 
                    {...props} 
                  />
                );
              },
              h3: ({...props}) => <h3 className="text-lg font-medium mt-6 mb-3" {...props} />,
              a: ({...props}) => {
                const href = String(props.href || '');
                
                // If it's a version comparison link (like those at the bottom of the changelog), render as plain text
                if (href.includes('github.com') && href.includes('/compare/')) {
                  return <span className="text-muted-foreground">{props.children}</span>;
                }
                
                // Otherwise, render as a normal link
                return <a className="text-blue-600 dark:text-blue-400 hover:underline" {...props} />;
              },
              ul: ({...props}) => <ul className="list-disc pl-6 my-4" {...props} />,
              li: ({...props}) => <li className="mb-1" {...props} />,
            }}
          >
            {changelog}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
}
