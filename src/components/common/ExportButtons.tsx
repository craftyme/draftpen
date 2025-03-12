import React from "react";
import { Button } from "@/components/ui/button";

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
  downloadLabel = "Download",
  copyLabel = "Copy",
  className = "flex gap-2 w-full p-3",
}: ExportButtonsProps) => {
  return (
    <div className={className}>
      <Button
        onClick={onExportImage}
        className="flex-1 text-xs font-medium gap-1 dark:bg-[#000000] dark:hover:bg-[#181818] dark:text-[#E8E8E8]"
        variant="secondary"
        size="sm"
        disabled={!onExportImage}
      >
        {downloadLabel}
      </Button>
      <Button
        onClick={onCopyToClipboard}
        className="flex-1 text-xs font-medium gap-1 dark:bg-[#000000] dark:hover:bg-[#181818] dark:text-[#E8E8E8]"
        variant="secondary"
        size="sm"
        disabled={!onCopyToClipboard}
      >
        {copyLabel}
      </Button>
    </div>
  );
};

export default ExportButtons;
