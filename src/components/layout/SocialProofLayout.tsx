'use client';

import React, { ReactNode } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import ExportButtons from '@/components/common/ExportButtons';

interface SocialProofLayoutProps {
  children: ReactNode;
  ControlPanel: ReactNode;
  onExport?: () => void;
  onCopy?: () => void;
  activeSubTab?: string;
}

const SocialProofLayout = ({
  children,
  ControlPanel,
  onExport,
  onCopy,
  activeSubTab = 'g2'
}: SocialProofLayoutProps) => {
  return (
    <div className="flex flex-col min-h-[calc(100vh-80px)] h-full">
      {/* Secondary Navigation */}
      <div className="h-[40px] shrink-0 border-b bg-gray-50 dark:bg-gray-900 px-4 flex items-center">
        <Tabs defaultValue={activeSubTab} className="w-auto">
          <TabsList className="h-7 bg-transparent">
            <TabsTrigger value="g2" asChild className="text-xs px-3 py-1 h-7">
              <Link href="/social-proof/g2">G2 Review</Link>
            </TabsTrigger>
            <TabsTrigger value="trustpilot" asChild className="text-xs px-3 py-1 h-7">
              <Link href="/social-proof/trustpilot">Trustpilot</Link>
            </TabsTrigger>
            <TabsTrigger value="twitter" asChild className="text-xs px-3 py-1 h-7">
              <Link href="/social-proof/twitter">Twitter</Link>
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

export default SocialProofLayout;
