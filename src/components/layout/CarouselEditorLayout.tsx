import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { ExportButtons } from '@/components/common';

interface CarouselEditorLayoutProps {
  slides: React.ReactNode[];
  currentSlide: number;
  controls: React.ReactNode;
  onExportImages: () => void;
  onCopyToClipboard: () => void;
  onAddSlide: () => void;
  onRemoveSlide: (index: number) => void;
  onSelectSlide: (index: number) => void;
}

const CarouselEditorLayout = ({
  slides,
  currentSlide,
  controls,
  onExportImages,
  onCopyToClipboard,
  onAddSlide,
  onRemoveSlide,
  onSelectSlide,
}: CarouselEditorLayoutProps) => {
  return (
    <div className="flex min-h-[calc(100vh-80px)] h-full">
      {/* Left side - Carousel canvas and thumbnails */}
      <div className="flex-1 bg-gray-50 dark:bg-gray-900 flex flex-col">
        {/* Main slide view */}
        <div className="flex-1 p-4 overflow-auto flex items-center justify-center">
          <div className="relative" id="export-container">
            {slides[currentSlide]}
          </div>
        </div>
        
        {/* Slide thumbnails and controls */}
        <div className="h-[100px] bg-white dark:bg-gray-800 border-t shrink-0 flex items-center px-4 gap-4 overflow-x-auto">
          <Button 
            onClick={onAddSlide} 
            size="sm" 
            variant="outline" 
            className="h-16 w-16 flex-shrink-0 flex flex-col items-center justify-center gap-1"
          >
            <Plus className="h-4 w-4" />
            <span className="text-xs">Add Slide</span>
          </Button>
          
          {slides.map((_, index) => (
            <div key={index} className="relative group">
              <div 
                className={`h-16 w-16 flex-shrink-0 border-2 flex items-center justify-center cursor-pointer overflow-hidden ${
                  currentSlide === index ? 'border-blue-500' : 'border-gray-200'
                }`}
                onClick={() => onSelectSlide(index)}
              >
                {/* Thumbnail preview - scaling down the actual slide content */}
                <div className="transform scale-[0.2] origin-center absolute">
                  {slides[index]}
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/10 transition-colors">
                  <span className="text-sm font-medium text-white">{index + 1}</span>
                </div>
              </div>
              {slides.length > 1 && (
                <Button 
                  size="icon" 
                  variant="destructive" 
                  className="h-5 w-5 absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => onRemoveSlide(index)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Right side - Controls sidebar */}
      <div className="w-80 border-l bg-white dark:bg-gray-800 flex flex-col min-h-[calc(100vh-80px)]">
        <div className="sticky top-0 bg-white dark:bg-gray-800 p-3 border-b z-10">
          <ExportButtons 
            onExportImage={onExportImages} 
            onCopyToClipboard={onCopyToClipboard} 
            downloadLabel="Export All"
            copyLabel="Copy Current"
          />
        </div>
        <div className="p-3 space-y-3 overflow-y-auto flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium">Slide {currentSlide + 1} of {slides.length}</h3>
          </div>
          {controls}
        </div>
      </div>
    </div>
  );
};

export default CarouselEditorLayout;
