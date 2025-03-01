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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function BulkImageResizerPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [fileUrls, setFileUrls] = useState<string[]>([]);
  const [resizeMethod, setResizeMethod] = useState('dimensions');
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [percentage, setPercentage] = useState(50);
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  const [quality, setQuality] = useState(90);
  
  // Create object URLs for the files
  useEffect(() => {
    const urls = files.map(file => URL.createObjectURL(file));
    setFileUrls(urls);
    
    // Clean up the URLs when component unmounts
    return () => {
      urls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [files]);
  
  // Control panel component
  const ControlPanel = () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Upload Images</h3>
        <div className="flex flex-col gap-2">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => document.getElementById('images-upload')?.click()}
          >
            Select Images
          </Button>
          <input 
            id="images-upload" 
            type="file" 
            accept="image/*"
            multiple
            className="hidden" 
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                setFiles(Array.from(e.target.files));
              }
            }}
          />
          {files.length > 0 && (
            <p className="text-xs text-muted-foreground">
              Selected: {files.length} file{files.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>
      </div>
      
      {files.length > 0 && (
        <>
          <div>
            <h3 className="text-sm font-medium mb-2">Resize Method</h3>
            <Select value={resizeMethod} onValueChange={setResizeMethod}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dimensions">Exact Dimensions</SelectItem>
                <SelectItem value="percentage">Percentage</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {resizeMethod === 'dimensions' ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="width" className="text-sm font-medium">Width (px)</Label>
                <Input 
                  id="width"
                  type="number" 
                  value={width} 
                  onChange={(e) => setWidth(parseInt(e.target.value) || 0)}
                  min={1}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="height" className="text-sm font-medium">Height (px)</Label>
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
            </>
          ) : (
            <div>
              <h3 className="text-sm font-medium mb-2">Scale: {percentage}%</h3>
              <Slider
                value={[percentage]}
                min={10}
                max={200}
                step={5}
                onValueChange={(value) => setPercentage(value[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Smaller</span>
                <span>Original</span>
                <span>Larger</span>
              </div>
            </div>
          )}
          
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
            Resize All Images
          </Button>
        </>
      )}
    </div>
  );
  
  return (
    <ImageToolsLayout 
      activeSubTab="bulk-image-resizer"
      ControlPanel={<ControlPanel />}
    >
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
            {files.length > 0 ? (
              <div>
                <p className="font-medium">{files.length} image{files.length !== 1 ? 's' : ''} selected</p>
                <div className="grid grid-cols-3 gap-2 mt-4">
                  {fileUrls.slice(0, 6).map((url, index) => (
                    <div key={index} className="aspect-square bg-gray-100 rounded-md overflow-hidden relative">
                      <NextImage 
                        src={url} 
                        alt={`Preview ${index + 1}`} 
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  ))}
                  {files.length > 6 && (
                    <div className="aspect-square bg-gray-100 rounded-md flex items-center justify-center">
                      <span className="text-xs text-muted-foreground">+{files.length - 6} more</span>
                    </div>
                  )}
                </div>
                <div className="mt-4 text-sm text-muted-foreground">
                  {resizeMethod === 'dimensions' ? (
                    <p>New dimensions: {width} × {maintainAspectRatio ? 'auto' : height} pixels</p>
                  ) : (
                    <p>Scale: {percentage}% of original size</p>
                  )}
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-medium mb-2">Bulk Image Resizer</h3>
                <p className="text-sm text-muted-foreground">
                  Resize multiple images at once to save time. Perfect for processing entire photo collections or product images.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </ImageToolsLayout>
  );
}
