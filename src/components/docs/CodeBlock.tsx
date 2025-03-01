'use client';

import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeBlockProps {
  code: string;
  language?: string;
  preview?: React.ReactNode;
  className?: string;
  showLineNumbers?: boolean;
}

export function CodeBlock({ 
  code, 
  language = 'tsx', 
  preview, 
  className,
  showLineNumbers = true
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Custom theme based on Apple's aesthetic
  const customStyle = {
    ...oneDark,
    'pre[class*="language-"]': {
      ...oneDark['pre[class*="language-"]'],
      background: 'transparent',
      margin: 0,
      padding: 0,
      overflow: 'visible',
      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
      fontSize: '0.9rem',
      lineHeight: '1.5',
    },
    'code[class*="language-"]': {
      ...oneDark['code[class*="language-"]'],
      background: 'transparent',
      fontFamily: 'inherit',
    },
  };

  const CopyIcon = () => (
    <svg width="16px" height="16px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" className="opacity-70">
      <path d="M19.4 20H9.6C9.26863 20 9 19.7314 9 19.4V9.6C9 9.26863 9.26863 9 9.6 9H19.4C19.7314 9 20 9.26863 20 9.6V19.4C20 19.7314 19.7314 20 19.4 20Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
      <path d="M15 9V4.6C15 4.26863 14.7314 4 14.4 4H4.6C4.26863 4 4 4.26863 4 4.6V14.4C4 14.7314 4.26863 15 4.6 15H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
    </svg>
  );

  return (
    <div className={cn("rounded-lg border overflow-hidden", className)}>
      {preview ? (
        <Tabs defaultValue="preview" className="w-full">
          <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/50">
            <TabsList className="h-9 bg-transparent p-0">
              <TabsTrigger 
                value="preview" 
                className="rounded data-[state=active]:bg-background data-[state=active]:shadow-none"
              >
                Preview
              </TabsTrigger>
              <TabsTrigger 
                value="code" 
                className="rounded data-[state=active]:bg-background data-[state=active]:shadow-none"
              >
                Code
              </TabsTrigger>
            </TabsList>
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <CopyIcon />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
          <TabsContent value="preview" className="p-6 bg-background">
            <div className="flex justify-center items-center">
              {preview}
            </div>
          </TabsContent>
          <TabsContent value="code" className="p-0 m-0">
            <div className="p-4 bg-[#282c34]">
              <SyntaxHighlighter
                language={language}
                style={customStyle}
                showLineNumbers={showLineNumbers}
                wrapLongLines={true}
                customStyle={{ 
                  background: 'transparent',
                  margin: 0,
                  padding: 0,
                }}
              >
                {code}
              </SyntaxHighlighter>
            </div>
          </TabsContent>
        </Tabs>
      ) : (
        <>
          <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/50">
            <span className="text-xs font-medium text-muted-foreground">
              {language.toUpperCase()}
            </span>
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <CopyIcon />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
          <div className="p-4 bg-[#282c34]">
            <SyntaxHighlighter
              language={language}
              style={customStyle}
              showLineNumbers={showLineNumbers}
              wrapLongLines={true}
              customStyle={{ 
                background: 'transparent',
                margin: 0,
                padding: 0,
              }}
            >
              {code}
            </SyntaxHighlighter>
          </div>
        </>
      )}
    </div>
  );
}
