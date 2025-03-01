'use client';

import React, { useState, useEffect } from 'react';
import NextImage from 'next/image';
import ImageToolsLayout from '@/components/layout/ImageToolsLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function CropImagePage() {
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [cropPreset, setCropPreset] = useState('custom');
  const [cropWidth, setCropWidth] = useState(0);
  const [cropHeight, setCropHeight] = useState(0);
  const [originalDimensions, setOriginalDimensions] = useState({ width: 0, height: 0 });
  
  // Create object URL for the file
  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setFileUrl(url);
      
      // Get original dimensions
      const img = new window.Image();
      img.onload = () => {
        setOriginalDimensions({ width: img.width, height: img.height });
        setCropWidth(img.width);
        setCropHeight(img.height);
      };
      img.src = url;
      
      // Clean up the URL when component unmounts
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [file]);
  
  // Update dimensions when preset changes
  useEffect(() => {
    if (cropPreset === 'square') {
      const size = Math.min(originalDimensions.width, originalDimensions.height);
      setCropWidth(size);
      setCropHeight(size);
    } else if (cropPreset === '16:9') {
      const height = Math.min(originalDimensions.height, originalDimensions.width * 9 / 16);
      setCropWidth(height * 16 / 9);
      setCropHeight(height);
    } else if (cropPreset === '4:3') {
      const height = Math.min(originalDimensions.height, originalDimensions.width * 3 / 4);
      setCropWidth(height * 4 / 3);
      setCropHeight(height);
    } else if (cropPreset === '3:2') {
      const height = Math.min(originalDimensions.height, originalDimensions.width * 2 / 3);
      setCropWidth(height * 3 / 2);
      setCropHeight(height);
    } else if (cropPreset === '1:1') {
      const size = Math.min(originalDimensions.width, originalDimensions.height);
      setCropWidth(size);
      setCropHeight(size);
    }
  }, [cropPreset, originalDimensions]);
  
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
            <h3 className="text-sm font-medium mb-2">Crop Preset</h3>
            <Select value={cropPreset} onValueChange={setCropPreset}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select preset" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="custom">Custom</SelectItem>
                <SelectItem value="square">Square (1:1)</SelectItem>
                <SelectItem value="16:9">Landscape (16:9)</SelectItem>
                <SelectItem value="4:3">Standard (4:3)</SelectItem>
                <SelectItem value="3:2">Photo (3:2)</SelectItem>
                <SelectItem value="1:1">Profile Picture (1:1)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="crop-width" className="text-sm font-medium">Width (px)</Label>
                <div className="text-xs text-muted-foreground">
                  Max: {originalDimensions.width}px
                </div>
              </div>
              <Input 
                id="crop-width"
                type="number" 
                value={Math.round(cropWidth)} 
                onChange={(e) => {
                  setCropPreset('custom');
                  setCropWidth(parseInt(e.target.value) || 0);
                }}
                min={1}
                max={originalDimensions.width}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="crop-height" className="text-sm font-medium">Height (px)</Label>
                <div className="text-xs text-muted-foreground">
                  Max: {originalDimensions.height}px
                </div>
              </div>
              <Input 
                id="crop-height"
                type="number" 
                value={Math.round(cropHeight)} 
                onChange={(e) => {
                  setCropPreset('custom');
                  setCropHeight(parseInt(e.target.value) || 0);
                }}
                min={1}
                max={originalDimensions.height}
              />
            </div>
          </div>
          
          <Button className="w-full mt-4">
            Crop Image
          </Button>
        </>
      )}
    </div>
  );
  
  return (
    <ImageToolsLayout 
      activeSubTab="crop-image"
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
                  {/* Crop overlay would go here in a real implementation */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div 
                      className="border-2 border-white border-dashed bg-black/10"
                      style={{ 
                        width: `${(cropWidth / originalDimensions.width) * 100}%`, 
                        height: `${(cropHeight / originalDimensions.height) * 100}%`,
                        maxWidth: '100%',
                        maxHeight: '100%'
                      }}
                    />
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  Crop dimensions: {Math.round(cropWidth)} × {Math.round(cropHeight)} pixels
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-medium mb-2">Crop Image</h3>
                <p className="text-sm text-muted-foreground">
                  Crop your images to exact dimensions or aspect ratios. Perfect for social media profiles, thumbnails, and more.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </ImageToolsLayout>
  );
}
