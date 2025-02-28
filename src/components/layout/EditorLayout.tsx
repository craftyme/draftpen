import React from 'react';
import ExportButtons from '@/components/common/ExportButtons';

interface EditorLayoutProps {
  children: React.ReactNode;
  ControlPanel: React.ReactNode;
  onExport?: () => void;
  onCopy?: () => void;
}

const EditorLayout: React.FC<EditorLayoutProps> = ({
  children,
  ControlPanel,
  onExport,
  onCopy,
}) => {
  return (
    <div className="flex min-h-[calc(100vh-80px)] h-full">
      {/* Left side - Editor canvas */}
      <div className="flex-1 p-4 bg-gray-50 dark:bg-gray-900 overflow-auto">
        <div className="relative flex items-center justify-center h-full w-full" id="export-container">
          {children}
        </div>
      </div>
      
      {/* Right side - Controls sidebar */}
      <div className="w-80 border-l bg-white dark:bg-gray-800 flex flex-col min-h-[calc(100vh-80px)]">
        <ExportButtons 
          onExportImage={onExport} 
          onCopyToClipboard={onCopy} 
        />
        <div className="p-3 space-y-3 overflow-y-auto flex-1">
          {ControlPanel}
        </div>
      </div>
    </div>
  );
};

export default EditorLayout;
