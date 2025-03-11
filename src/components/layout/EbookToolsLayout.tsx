"use client";

import React, { ReactNode } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import ExportButtons from "@/components/common/ExportButtons";

interface EbookToolsLayoutProps {
  children: ReactNode;
  ControlPanel: ReactNode;
  onExport?: () => void;
  onCopy?: () => void;
  activeSubTab?: string;
}

const EbookToolsLayout = ({
  children,
  activeSubTab,
  ControlPanel,
  onExport,
  onCopy,
}: EbookToolsLayoutProps) => {
  return (
    <div className="flex flex-col min-h-[calc(100vh-80px)] h-full">
      {/* Secondary Navigation */}
      <div className="h-[40px] shrink-0 border-b nav-backdrop sticky top-0 z-10 px-4 flex items-center">
        <Tabs defaultValue={activeSubTab} className="w-auto secondary-nav-tabs">
          <TabsList className="h-8 bg-transparent p-1 rounded-lg">
            <TabsTrigger
              value="epub-to-mobi"
              asChild
              className="h-6 rounded transition-all text-xs px-3 py-1"
            >
              <Link href="/ebook-tools/epub-to-mobi">EPUB to MOBI</Link>
            </TabsTrigger>
            <TabsTrigger
              value="mobi-to-epub"
              asChild
              className="h-6 rounded transition-all text-xs px-3 py-1"
            >
              <Link href="/ebook-tools/mobi-to-epub">MOBI to EPUB</Link>
            </TabsTrigger>
            <TabsTrigger
              value="pdf-to-epub"
              asChild
              className="h-6 rounded transition-all text-xs px-3 py-1"
            >
              <Link href="/ebook-tools/pdf-to-epub">PDF to EPUB</Link>
            </TabsTrigger>
            <TabsTrigger
              value="pdf-to-mobi"
              asChild
              className="h-6 rounded transition-all text-xs px-3 py-1"
            >
              <Link href="/ebook-tools/pdf-to-mobi">PDF to MOBI</Link>
            </TabsTrigger>
            <TabsTrigger
              value="azw-to-epub"
              asChild
              className="h-6 rounded transition-all text-xs px-3 py-1"
            >
              <Link href="/ebook-tools/azw-to-epub">AZW to EPUB</Link>
            </TabsTrigger>
            <TabsTrigger
              value="azw-to-mobi"
              asChild
              className="h-6 rounded transition-all text-xs px-3 py-1"
            >
              <Link href="/ebook-tools/azw-to-mobi">AZW to MOBI</Link>
            </TabsTrigger>
            <TabsTrigger
              value="epub-to-pdf"
              asChild
              className="h-6 rounded transition-all text-xs px-3 py-1"
            >
              <Link href="/ebook-tools/epub-to-pdf">EPUB to PDF</Link>
            </TabsTrigger>
            <TabsTrigger
              value="mobi-to-pdf"
              asChild
              className="h-6 rounded transition-all text-xs px-3 py-1"
            >
              <Link href="/ebook-tools/mobi-to-pdf">MOBI to PDF</Link>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Main Content Area */}
        <div className="flex-1 overflow-auto p-4">{children}</div>

        {/* Control Panel */}
        {ControlPanel && (
          <div className="w-80 border-l overflow-y-auto p-4 shrink-0">
            {ControlPanel}

            {(onExport || onCopy) && (
              <div className="mt-6">
                <ExportButtons
                  onExportImage={onExport}
                  onCopyToClipboard={onCopy}
                  className="w-full"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EbookToolsLayout;
