'use client';

import React, { useState, useEffect } from 'react';
import NextImage from 'next/image';
import ImageToolsLayout from '@/components/layout/ImageToolsLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

export default function ImageEnlargerPage() {
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [originalDimensions, setOriginalDimensions] = useState({ width: 0, height: 0 });
  const [scaleFactor, setScaleFactor] = useState(2);
  const [enhancementLevel, setEnhancementLevel] = useState(2);
  const [algorithm, setAlgorithm] = useState('ai');
  
  // Create object URL for the file
  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setFileUrl(url);
      
      // Get original dimensions
      const img = new window.Image();
      img.onload = () => {
        setOriginalDimensions({ width: img.width, height: img.height });
      };
      img.src = url;
      
      // Clean up the URL when component unmounts
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [file]);
  
  // Calculate new dimensions
  const getNewDimensions = () => {
    return {
      width: Math.round(originalDimensions.width * scaleFactor),
      height: Math.round(originalDimensions.height * scaleFactor)
    };
  };
  
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
            <h3 className="text-sm font-medium mb-2">Scale Factor: {scaleFactor}x</h3>
            <Slider
              value={[scaleFactor]}
              min={1.5}
              max={8}
              step={0.5}
              onValueChange={(value) => setScaleFactor(value[0])}
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>1.5x</span>
              <span>4x</span>
              <span>8x</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="original-dimensions" className="text-sm font-medium">Original Size</Label>
            </div>
            <Input 
              id="original-dimensions"
              type="text" 
              value={`${originalDimensions.width} × ${originalDimensions.height} px`}
              disabled
              className="bg-gray-50"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="new-dimensions" className="text-sm font-medium">New Size</Label>
            </div>
            <Input 
              id="new-dimensions"
              type="text" 
              value={`${getNewDimensions().width} × ${getNewDimensions().height} px`}
              disabled
              className="bg-gray-50"
            />
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">Enhancement Algorithm</h3>
            <Select value={algorithm} onValueChange={setAlgorithm}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select algorithm" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ai">AI Enhancement (Best Quality)</SelectItem>
                <SelectItem value="bicubic">Bicubic Interpolation</SelectItem>
                <SelectItem value="bilinear">Bilinear Interpolation</SelectItem>
                <SelectItem value="nearest">Nearest Neighbor</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {algorithm === 'ai' && (
            <div>
              <h3 className="text-sm font-medium mb-2">AI Enhancement Level: {enhancementLevel}</h3>
              <Slider
                value={[enhancementLevel]}
                min={1}
                max={3}
                step={1}
                onValueChange={(value) => setEnhancementLevel(value[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Standard</span>
                <span>Enhanced</span>
                <span>Maximum</span>
              </div>
            </div>
          )}
          
          <Button className="w-full mt-4">
            Enlarge Image
          </Button>
        </>
      )}
    </div>
  );
  
  return (
    <ImageToolsLayout 
      activeSubTab="image-enlarger"
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
                  <p>Scale: {scaleFactor}x | Algorithm: {algorithm === 'ai' ? 'AI Enhancement' : algorithm}</p>
                  <p className="mt-1">New size: {getNewDimensions().width} × {getNewDimensions().height} pixels</p>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-medium mb-2">Image Enlarger</h3>
                <p className="text-sm text-muted-foreground">
                  Enlarge your images without losing quality using advanced AI algorithms. Perfect for printing, presentations, and more.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </ImageToolsLayout>
  );
}
