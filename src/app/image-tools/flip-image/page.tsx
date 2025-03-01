'use client';

import React, { useState, useEffect } from 'react';
import NextImage from 'next/image';
import ImageToolsLayout from '@/components/layout/ImageToolsLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

export default function FlipImagePage() {
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [flipDirection, setFlipDirection] = useState('horizontal');
  
  // Create object URL for the file
  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setFileUrl(url);
      
      // Clean up the URL when component unmounts
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [file]);
  
  // Control panel component
  const ControlPanel = () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Upload Image</h3>
        <div className="flex flex-col gap-2">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => document.getElementById('image-upload')?.click()}
          >
            Select Image
          </Button>
          <input 
            id="image-upload" 
            type="file" 
            accept="image/*"
            className="hidden" 
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setFile(e.target.files[0]);
              }
            }}
          />
          {file && (
            <p className="text-xs text-muted-foreground">
              Selected: {file.name}
            </p>
          )}
        </div>
      </div>
      
      {file && (
        <>
          <div>
            <h3 className="text-sm font-medium mb-2">Flip Direction</h3>
            <RadioGroup 
              value={flipDirection} 
              onValueChange={setFlipDirection}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="horizontal" id="horizontal" />
                <Label htmlFor="horizontal" className="text-sm">Horizontal (Mirror)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="vertical" id="vertical" />
                <Label htmlFor="vertical" className="text-sm">Vertical (Upside Down)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="both" id="both" />
                <Label htmlFor="both" className="text-sm">Both (180° Rotation)</Label>
              </div>
            </RadioGroup>
          </div>
          
          <Button className="w-full mt-4">
            Flip Image
          </Button>
        </>
      )}
    </div>
  );
  
  // Get transform style based on flip direction
  const getTransformStyle = () => {
    switch (flipDirection) {
      case 'horizontal':
        return 'scaleX(-1)';
      case 'vertical':
        return 'scaleY(-1)';
      case 'both':
        return 'scale(-1, -1)';
      default:
        return 'none';
    }
  };
  
  return (
    <ImageToolsLayout 
      activeSubTab="flip-image"
      ControlPanel={<ControlPanel />}
    >
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
            {fileUrl ? (
              <div className="w-full">
                <div className="relative w-full h-64 mb-4 bg-gray-100 rounded-md overflow-hidden">
                  <div 
                    className="relative w-full h-full"
                    style={{ transform: getTransformStyle() }}
                  >
                    <NextImage 
                      src={fileUrl} 
                      alt="Preview" 
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  Flip direction: {flipDirection.charAt(0).toUpperCase() + flipDirection.slice(1)}
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-medium mb-2">Flip Image</h3>
                <p className="text-sm text-muted-foreground">
                  Flip your images horizontally or vertically. Perfect for creating mirror effects or correcting reversed images.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </ImageToolsLayout>
  );
}
