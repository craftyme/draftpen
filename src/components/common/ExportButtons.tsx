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
  className = "flex gap-2 w-full p-3"
}: ExportButtonsProps) => {
  return (
    <div className={className}>
      <Button 
        onClick={onExportImage} 
        className="flex-1 text-xs font-light" 
        variant="secondary"
        size="sm"
        disabled={!onExportImage}
      >
        <Download className="h-3.5 w-3.5" /> {downloadLabel}
      </Button>
      <Button 
        onClick={onCopyToClipboard} 
        className="flex-1 text-xs font-light" 
        variant="secondary"
        size="sm"
        disabled={!onCopyToClipboard}
      >
        <Copy className="h-3.5 w-3.5" /> {copyLabel}
      </Button>
    </div>
  );
};

export default ExportButtons;
