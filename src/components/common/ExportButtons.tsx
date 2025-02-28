import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, Copy } from 'lucide-react';

interface ExportButtonsProps {
  onExportImage?: () => void;
  onCopyToClipboard?: () => void;
  downloadLabel?: string;
  copyLabel?: string;
  className?: string;
}

const ExportButtons = ({ 
  onExportImage, 
  onCopyToClipboard,
  downloadLabel = 'Download',
  copyLabel = 'Copy',
  className = "flex space-x-2 w-full"
}: ExportButtonsProps) => {
  return (
    <div className={className}>
      <Button 
        onClick={onExportImage} 
        className="flex-1" 
        variant="outline"
        disabled={!onExportImage}
      >
        <Download className="mr-2 h-4 w-4" /> {downloadLabel}
      </Button>
      <Button 
        onClick={onCopyToClipboard} 
        className="flex-1" 
        variant="outline"
        disabled={!onCopyToClipboard}
      >
        <Copy className="mr-2 h-4 w-4" /> {copyLabel}
      </Button>
    </div>
  );
};

export default ExportButtons;
