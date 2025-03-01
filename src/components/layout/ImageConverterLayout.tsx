'use client';

import React, { ReactNode } from 'react';
import Link from 'next/link';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ExportButtons from '@/components/common/ExportButtons';

interface ImageConverterLayoutProps {
  children: ReactNode;
  ControlPanel: ReactNode;
  onExport?: () => void;
  onCopy?: () => void;
  activeSubTab: string;
}

const ImageConverterLayout = ({ 
  children, 
  activeSubTab,
  ControlPanel,
  onExport,
  onCopy
}: ImageConverterLayoutProps) => {
  return (
    <div className="flex flex-col min-h-[calc(100vh-80px)] h-full">
      {/* Secondary Navigation */}
      <div className="h-[40px] shrink-0 border-b nav-backdrop sticky top-0 z-10 px-4 flex items-center">
        <Tabs defaultValue={activeSubTab} className="w-auto secondary-nav-tabs">
          <TabsList className="h-8 bg-transparent p-1 rounded-lg">
            <TabsTrigger 
              value="pdf-to-jpg" 
              asChild 
              className="h-6 rounded transition-all text-xs px-3 py-1"
            >
              <Link href="/image-converter/pdf-to-jpg">PDF to JPG</Link>
            </TabsTrigger>
            <TabsTrigger 
              value="heic-to-jpg" 
              asChild 
              className="h-6 rounded transition-all text-xs px-3 py-1"
            >
              <Link href="/image-converter/heic-to-jpg">HEIC to JPG</Link>
            </TabsTrigger>
            <TabsTrigger 
              value="svg-converter" 
              asChild 
              className="h-6 rounded transition-all text-xs px-3 py-1"
            >
              <Link href="/image-converter/svg-converter">SVG Converter</Link>
            </TabsTrigger>
            <TabsTrigger 
              value="pdf-to-png" 
              asChild 
              className="h-6 rounded transition-all text-xs px-3 py-1"
            >
              <Link href="/image-converter/pdf-to-png">PDF to PNG</Link>
            </TabsTrigger>
            <TabsTrigger 
              value="png-to-svg" 
              asChild 
              className="h-6 rounded transition-all text-xs px-3 py-1"
            >
              <Link href="/image-converter/png-to-svg">PNG to SVG</Link>
            </TabsTrigger>
            <TabsTrigger 
              value="webp-to-jpg" 
              asChild 
              className="h-6 rounded transition-all text-xs px-3 py-1"
            >
              <Link href="/image-converter/webp-to-jpg">WebP to JPG</Link>
            </TabsTrigger>
            <TabsTrigger 
              value="png-to-jpg" 
              asChild 
              className="h-6 rounded transition-all text-xs px-3 py-1"
            >
              <Link href="/image-converter/png-to-jpg">PNG to JPG</Link>
            </TabsTrigger>
            <TabsTrigger 
              value="jpg-to-png" 
              asChild 
              className="h-6 rounded transition-all text-xs px-3 py-1"
            >
              <Link href="/image-converter/jpg-to-png">JPG to PNG</Link>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {/* Main Content */}
      <div className="flex flex-1">
        {/* Left side - Canvas */}
        <div className="flex-1 flex items-center justify-center min-h-[calc(100vh-120px)] bg-gray-50 dark:bg-gray-900 p-4">
          <div className="relative flex items-center justify-center w-full max-w-3xl mx-auto" id="export-container">
            {children}
          </div>
        </div>
        
        {/* Right side - Controls */}
        <div className="w-80 border-l bg-white dark:bg-gray-800 flex flex-col min-h-[calc(100vh-120px)]">
          <ExportButtons 
            onExportImage={onExport} 
            onCopyToClipboard={onCopy} 
          />
          <div className="p-3 space-y-3 overflow-y-auto flex-1 max-h-[calc(100vh-180px)]">
            {ControlPanel}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageConverterLayout;
