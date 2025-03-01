'use client';

import React, { useState, useEffect } from 'react';
import NextImage from 'next/image';
import ImageToolsLayout from '@/components/layout/ImageToolsLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';

export default function ImageResizerPage() {
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  const [originalDimensions, setOriginalDimensions] = useState({ width: 0, height: 0 });
  const [quality, setQuality] = useState(90);
  
  // Create object URL for the file
  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setFileUrl(url);
      
      // Get original dimensions
      const img = new window.Image();
      img.onload = () => {
        setOriginalDimensions({ width: img.width, height: img.height });
        setWidth(img.width);
        setHeight(img.height);
      };
      img.src = url;
      
      // Clean up the URL when component unmounts
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [file]);
  
  // Update height when width changes and maintain aspect ratio
  useEffect(() => {
    if (maintainAspectRatio && originalDimensions.width > 0) {
      const aspectRatio = originalDimensions.width / originalDimensions.height;
      setHeight(Math.round(width / aspectRatio));
    }
  }, [width, maintainAspectRatio, originalDimensions]);
  
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
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="width" className="text-sm font-medium">Width (px)</Label>
              <div className="text-xs text-muted-foreground">
                Original: {originalDimensions.width}px
              </div>
            </div>
            <Input 
              id="width"
              type="number" 
              value={width} 
              onChange={(e) => setWidth(parseInt(e.target.value) || 0)}
              min={1}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="height" className="text-sm font-medium">Height (px)</Label>
              <div className="text-xs text-muted-foreground">
                Original: {originalDimensions.height}px
              </div>
            </div>
            <Input 
              id="height"
              type="number" 
              value={height} 
              onChange={(e) => setHeight(parseInt(e.target.value) || 0)}
              min={1}
              disabled={maintainAspectRatio}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="aspect-ratio" 
              checked={maintainAspectRatio} 
              onCheckedChange={(checked) => setMaintainAspectRatio(checked === true)}
            />
            <Label htmlFor="aspect-ratio" className="text-sm">Maintain aspect ratio</Label>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">Quality: {quality}%</h3>
            <Slider
              value={[quality]}
              min={10}
              max={100}
              step={5}
              onValueChange={(value) => setQuality(value[0])}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Higher quality results in larger file sizes
            </p>
          </div>
          
          <Button className="w-full mt-4">
            Resize Image
          </Button>
        </>
      )}
    </div>
  );
  
  return (
    <ImageToolsLayout 
      activeSubTab="image-resizer"
      ControlPanel={<ControlPanel />}
    >
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
            {fileUrl ? (
              <div className="w-full">
                <div className="relative w-full h-64 mb-4 bg-gray-100 rounded-md overflow-hidden">
                  <NextImage 
                    src={fileUrl} 
                    alt="Preview" 
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
                <div className="text-sm text-muted-foreground">
                  New dimensions: {width} × {height} pixels
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-medium mb-2">Image Resizer</h3>
                <p className="text-sm text-muted-foreground">
                  Resize your images to exact dimensions while maintaining quality. Perfect for social media, websites, and more.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </ImageToolsLayout>
  );
}
