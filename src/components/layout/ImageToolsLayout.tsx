'use client';

import React, { ReactNode } from 'react';
import Link from 'next/link';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ExportButtons from '@/components/common/ExportButtons';

interface ImageToolsLayoutProps {
  children: ReactNode;
  ControlPanel: ReactNode;
  onExport?: () => void;
  onCopy?: () => void;
  activeSubTab: string;
}

const ImageToolsLayout = ({ 
  children, 
  activeSubTab,
  ControlPanel,
  onExport,
  onCopy
}: ImageToolsLayoutProps) => {
  return (
    <div className="flex flex-col min-h-[calc(100vh-80px)] h-full">
      {/* Secondary Navigation */}
      <div className="h-[40px] shrink-0 border-b nav-backdrop sticky top-0 z-10 px-4 flex items-center">
        <Tabs defaultValue={activeSubTab} className="w-auto secondary-nav-tabs">
          <TabsList className="h-8 bg-transparent p-1 rounded-lg">
            <TabsTrigger 
              value="image-resizer" 
              asChild 
              className="h-6 rounded transition-all text-xs px-3 py-1"
            >
              <Link href="/image-tools/image-resizer">Image Resizer</Link>
            </TabsTrigger>
            <TabsTrigger 
              value="bulk-image-resizer" 
              asChild 
              className="h-6 rounded transition-all text-xs px-3 py-1"
            >
              <Link href="/image-tools/bulk-image-resizer">Bulk Image Resizer</Link>
            </TabsTrigger>
            <TabsTrigger 
              value="image-compressor" 
              asChild 
              className="h-6 rounded transition-all text-xs px-3 py-1"
            >
              <Link href="/image-tools/image-compressor">Image Compressor</Link>
            </TabsTrigger>
            <TabsTrigger 
              value="crop-image" 
              asChild 
              className="h-6 rounded transition-all text-xs px-3 py-1"
            >
              <Link href="/image-tools/crop-image">Crop Image</Link>
            </TabsTrigger>
            <TabsTrigger 
              value="collage-maker" 
              asChild 
              className="h-6 rounded transition-all text-xs px-3 py-1"
            >
              <Link href="/image-tools/collage-maker">Collage Maker</Link>
            </TabsTrigger>
            <TabsTrigger 
              value="flip-image" 
              asChild 
              className="h-6 rounded transition-all text-xs px-3 py-1"
            >
              <Link href="/image-tools/flip-image">Flip Image</Link>
            </TabsTrigger>
            <TabsTrigger 
              value="rotate-image" 
              asChild 
              className="h-6 rounded transition-all text-xs px-3 py-1"
            >
              <Link href="/image-tools/rotate-image">Rotate Image</Link>
            </TabsTrigger>
            <TabsTrigger 
              value="image-enlarger" 
              asChild 
              className="h-6 rounded transition-all text-xs px-3 py-1"
            >
              <Link href="/image-tools/image-enlarger">Image Enlarger</Link>
            </TabsTrigger>
            <TabsTrigger 
              value="color-picker" 
              asChild 
              className="h-6 rounded transition-all text-xs px-3 py-1"
            >
              <Link href="/image-tools/color-picker">Color Picker</Link>
            </TabsTrigger>
            <TabsTrigger 
              value="meme-generator" 
              asChild 
              className="h-6 rounded transition-all text-xs px-3 py-1"
            >
              <Link href="/image-tools/meme-generator">Meme Generator</Link>
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

export default ImageToolsLayout;
