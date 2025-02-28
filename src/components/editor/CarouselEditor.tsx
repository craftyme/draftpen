import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { exportAsImage, copyToClipboard } from '@/lib/utils/export';
import CarouselEditorLayout from '@/components/layout/CarouselEditorLayout';
import { 
  Bold, Italic, AlignLeft, AlignCenter, AlignRight
} from 'lucide-react';
import { 
  FormSection, 
  SliderControl, 
  ColorPicker,
  SwitchControl
} from '@/components/common';

// Define slide interface
interface SlideData {
  id: string;
  title: string;
  content: string;
  backgroundColor: string;
  textColor: string;
  alignment: 'left' | 'center' | 'right';
  fontSize: number;
  bold: boolean;
  italic: boolean;
  borderRadius: number;
  padding: number;
}

// Create a new slide with default values
const createNewSlide = (): SlideData => ({
  id: `slide_${Date.now()}`,
  title: 'Slide Title',
  content: 'Add your content here. This is where you can explain your ideas, share insights, or tell your story.',
  backgroundColor: '#ffffff',
  textColor: '#000000',
  alignment: 'left',
  fontSize: 18,
  bold: false,
  italic: false,
  borderRadius: 8,
  padding: 40
});

const CarouselEditor = () => {
  // State for slides and current slide index
  const [slides, setSlides] = useState<SlideData[]>([createNewSlide()]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  
  // Global settings
  const [aspectRatio, setAspectRatio] = useState<string>('1:1');
  const [showPageNumbers, setShowPageNumbers] = useState<boolean>(true);
  
  // References for export
  const exportContainerRef = useRef<HTMLDivElement>(null);

  // Get current slide data
  const currentSlide = slides[currentSlideIndex];

  // Update current slide
  const updateCurrentSlide = (updates: Partial<SlideData>) => {
    setSlides(prevSlides => 
      prevSlides.map((slide, index) => 
        index === currentSlideIndex 
          ? { ...slide, ...updates } 
          : slide
      )
    );
  };

  // Add new slide
  const handleAddSlide = () => {
    const newSlide = createNewSlide();
    setSlides(prevSlides => [...prevSlides, newSlide]);
    setCurrentSlideIndex(slides.length);
  };

  // Remove slide
  const handleRemoveSlide = (index: number) => {
    if (slides.length <= 1) return;
    
    setSlides(prevSlides => prevSlides.filter((_, i) => i !== index));
    
    // Update current slide index if needed
    if (currentSlideIndex >= index && currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  // Export all slides
  const handleExportAll = async () => {
    if (!exportContainerRef.current) return;
    
    // Save current slide index
    const originalIndex = currentSlideIndex;
    
    // Export each slide in sequence
    for (let i = 0; i < slides.length; i++) {
      // Set current slide
      setCurrentSlideIndex(i);
      
      // Give time for the DOM to update
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Export the image
      await exportAsImage(exportContainerRef.current, `slide_${i + 1}.png`);
    }
    
    // Restore original slide
    setCurrentSlideIndex(originalIndex);
  };

  // Copy current slide
  const handleCopyCurrent = () => {
    if (exportContainerRef.current) {
      copyToClipboard(exportContainerRef.current);
    }
  };

  // Calculate dimensions based on aspect ratio
  const getDimensions = () => {
    const [widthRatio, heightRatio] = aspectRatio.split(':').map(Number);
    const baseSize = 500; // Base size in pixels
    
    if (aspectRatio === '1:1') {
      return { width: baseSize, height: baseSize };
    } else if (aspectRatio === '4:3') {
      return { width: baseSize, height: (baseSize * heightRatio) / widthRatio };
    } else if (aspectRatio === '16:9') {
      return { width: baseSize, height: (baseSize * heightRatio) / widthRatio };
    }
    
    // Default to square if ratio is invalid
    return { width: baseSize, height: baseSize };
  };

  // Render slide content
  const renderSlide = (slide: SlideData, index: number) => {
    const dimensions = getDimensions();
    
    return (
      <div
        className="relative shadow-lg"
        style={{
          width: `${dimensions.width}px`,
          height: `${dimensions.height}px`,
          backgroundColor: slide.backgroundColor,
          borderRadius: `${slide.borderRadius}px`,
          overflow: 'hidden'
        }}
      >
        {/* Slide content */}
        <div
          className="h-full flex flex-col"
          style={{ padding: `${slide.padding}px` }}
        >
          <h2
            className="mb-4"
            style={{
              color: slide.textColor,
              fontSize: `${slide.fontSize * 1.5}px`,
              fontWeight: slide.bold ? 'bold' : 'normal',
              fontStyle: slide.italic ? 'italic' : 'normal',
              textAlign: slide.alignment
            }}
          >
            {slide.title}
          </h2>
          <div
            className="flex-1 whitespace-pre-line"
            style={{
              color: slide.textColor,
              fontSize: `${slide.fontSize}px`,
              fontWeight: slide.bold ? 'bold' : 'normal',
              fontStyle: slide.italic ? 'italic' : 'normal',
              textAlign: slide.alignment,
              overflowY: 'auto',
              maxHeight: '100%'
            }}
          >
            {slide.content}
          </div>
        </div>
        
        {/* Page number */}
        {showPageNumbers && (
          <div className="absolute bottom-3 right-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full h-8 w-8 flex items-center justify-center">
            {index + 1}/{slides.length}
          </div>
        )}
      </div>
    );
  };

  // Render all slides for the carousel
  const slidesElements = slides.map((slide, index) => 
    <div key={slide.id} ref={index === currentSlideIndex ? exportContainerRef : null}>
      {renderSlide(slide, index)}
    </div>
  );

  // Controls for the current slide
  const controlsElement = (
    <>
      <FormSection title="Global Settings">
        <Select value={aspectRatio} onValueChange={setAspectRatio}>
          <SelectTrigger className="h-8 text-xs">
            <SelectValue placeholder="Aspect Ratio" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1:1">1:1 Square</SelectItem>
            <SelectItem value="4:3">4:3 Landscape</SelectItem>
            <SelectItem value="16:9">16:9 Widescreen</SelectItem>
          </SelectContent>
        </Select>
        <SwitchControl
          id="page-numbers"
          label="Page Numbers"
          checked={showPageNumbers}
          onCheckedChange={setShowPageNumbers}
        />
      </FormSection>

      <FormSection title="Slide Content">
        <Input 
          id="title"
          value={currentSlide.title} 
          onChange={(e) => updateCurrentSlide({ title: e.target.value })} 
          placeholder="Enter slide title" 
          className="text-sm"
        />
        <Textarea 
          id="content"
          value={currentSlide.content} 
          onChange={(e) => updateCurrentSlide({ content: e.target.value })} 
          placeholder="Write your content here..." 
          className="min-h-[120px] text-sm"
        />
      </FormSection>

      <FormSection title="Text Styling">
        <div className="flex space-x-2 mb-3">
          <Button 
            size="sm" 
            variant={currentSlide.bold ? "default" : "outline"} 
            className="w-10 p-0" 
            onClick={() => updateCurrentSlide({ bold: !currentSlide.bold })}
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button 
            size="sm" 
            variant={currentSlide.italic ? "default" : "outline"} 
            className="w-10 p-0" 
            onClick={() => updateCurrentSlide({ italic: !currentSlide.italic })}
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button 
            size="sm" 
            variant={currentSlide.alignment === 'left' ? "default" : "outline"} 
            className="w-10 p-0" 
            onClick={() => updateCurrentSlide({ alignment: 'left' })}
          >
            <AlignLeft className="h-4 w-4" />
          </Button>
          <Button 
            size="sm" 
            variant={currentSlide.alignment === 'center' ? "default" : "outline"} 
            className="w-10 p-0" 
            onClick={() => updateCurrentSlide({ alignment: 'center' })}
          >
            <AlignCenter className="h-4 w-4" />
          </Button>
          <Button 
            size="sm" 
            variant={currentSlide.alignment === 'right' ? "default" : "outline"} 
            className="w-10 p-0" 
            onClick={() => updateCurrentSlide({ alignment: 'right' })}
          >
            <AlignRight className="h-4 w-4" />
          </Button>
        </div>

        <SliderControl
          label="Font Size"
          value={currentSlide.fontSize}
          min={12}
          max={32}
          step={1}
          onChange={(value) => updateCurrentSlide({ fontSize: value })}
        />
        <ColorPicker
          label="Text Color"
          value={currentSlide.textColor}
          onChange={(value) => updateCurrentSlide({ textColor: value })}
        />
      </FormSection>

      <FormSection title="Slide Appearance">
        <ColorPicker
          label="Background"
          value={currentSlide.backgroundColor}
          onChange={(value) => updateCurrentSlide({ backgroundColor: value })}
        />
        <SliderControl
          label="Padding"
          value={currentSlide.padding}
          min={20}
          max={80}
          step={5}
          onChange={(value) => updateCurrentSlide({ padding: value })}
        />
        <SliderControl
          label="Corner Radius"
          value={currentSlide.borderRadius}
          min={0}
          max={20}
          step={1}
          onChange={(value) => updateCurrentSlide({ borderRadius: value })}
        />
      </FormSection>
    </>
  );

  return (
    <CarouselEditorLayout
      slides={slidesElements}
      currentSlide={currentSlideIndex}
      controls={controlsElement}
      onExportImages={handleExportAll}
      onCopyToClipboard={handleCopyCurrent}
      onAddSlide={handleAddSlide}
      onRemoveSlide={handleRemoveSlide}
      onSelectSlide={setCurrentSlideIndex}
    />
  );
};

export default CarouselEditor;
