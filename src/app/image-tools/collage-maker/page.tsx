'use client';

import React, { useState, useEffect } from 'react';
import NextImage from 'next/image';
import ImageToolsLayout from '@/components/layout/ImageToolsLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function CollageMakerPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [fileUrls, setFileUrls] = useState<string[]>([]);
  const [layout, setLayout] = useState('grid');
  const [columns, setColumns] = useState(2);
  const [spacing, setSpacing] = useState(10);
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  
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
            <h3 className="text-sm font-medium mb-2">Collage Layout</h3>
            <Select value={layout} onValueChange={setLayout}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select layout" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="grid">Grid</SelectItem>
                <SelectItem value="horizontal">Horizontal</SelectItem>
                <SelectItem value="vertical">Vertical</SelectItem>
                <SelectItem value="masonry">Masonry</SelectItem>
                <SelectItem value="random">Random</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {layout === 'grid' && (
            <div>
              <h3 className="text-sm font-medium mb-2">Columns: {columns}</h3>
              <Slider
                value={[columns]}
                min={1}
                max={5}
                step={1}
                onValueChange={(value) => setColumns(value[0])}
              />
            </div>
          )}
          
          <div>
            <h3 className="text-sm font-medium mb-2">Spacing: {spacing}px</h3>
            <Slider
              value={[spacing]}
              min={0}
              max={50}
              step={2}
              onValueChange={(value) => setSpacing(value[0])}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="bg-color" className="text-sm font-medium">Background Color</Label>
            <div className="flex gap-2">
              <div 
                className="w-10 h-10 rounded border"
                style={{ backgroundColor: backgroundColor }}
              />
              <Input 
                id="bg-color"
                type="text" 
                value={backgroundColor} 
                onChange={(e) => setBackgroundColor(e.target.value)}
                className="flex-1"
              />
            </div>
          </div>
          
          <Button className="w-full mt-4">
            Create Collage
          </Button>
        </>
      )}
    </div>
  );
  
  return (
    <ImageToolsLayout 
      activeSubTab="collage-maker"
      ControlPanel={<ControlPanel />}
    >
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
            {files.length > 0 ? (
              <div className="w-full">
                <div 
                  className="relative rounded-md overflow-hidden"
                  style={{ 
                    backgroundColor: backgroundColor,
                    padding: `${spacing}px`,
                    minHeight: '250px'
                  }}
                >
                  <div 
                    className={`grid gap-${spacing}`}
                    style={{ 
                      gridTemplateColumns: `repeat(${columns}, 1fr)`,
                      gap: `${spacing}px`
                    }}
                  >
                    {fileUrls.map((url, index) => (
                      <div key={index} className="relative aspect-square bg-gray-100 rounded-md overflow-hidden">
                        <NextImage 
                          src={url} 
                          alt={`Image ${index + 1}`} 
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-3 text-sm text-muted-foreground">
                  Layout: {layout.charAt(0).toUpperCase() + layout.slice(1)} | Spacing: {spacing}px
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-medium mb-2">Collage Maker</h3>
                <p className="text-sm text-muted-foreground">
                  Create beautiful photo collages with multiple layout options. Perfect for social media posts, memories, and creative projects.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </ImageToolsLayout>
  );
}
