'use client';

import React, { useState, useEffect } from 'react';
import NextImage from 'next/image';
import ImageToolsLayout from '@/components/layout/ImageToolsLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function ImageCompressorPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [fileUrls, setFileUrls] = useState<string[]>([]);
  const [quality, setQuality] = useState(70);
  const [format, setFormat] = useState('original');
  
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
            <h3 className="text-sm font-medium mb-2">Compression Level</h3>
            <div className="space-y-2">
              <Slider
                value={[quality]}
                min={10}
                max={100}
                step={5}
                onValueChange={(value) => setQuality(value[0])}
              />
              <div className="flex justify-between text-xs">
                <span>Maximum Compression</span>
                <span className="font-medium">{quality}%</span>
                <span>Best Quality</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Lower quality = smaller file size
              </p>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">Output Format</h3>
            <Select value={format} onValueChange={setFormat}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="original">Same as original</SelectItem>
                <SelectItem value="jpg">JPG</SelectItem>
                <SelectItem value="png">PNG</SelectItem>
                <SelectItem value="webp">WebP (best compression)</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-1">
              WebP offers the best compression ratio
            </p>
          </div>
          
          <Button className="w-full mt-4">
            Compress Images
          </Button>
        </>
      )}
    </div>
  );
  
  return (
    <ImageToolsLayout 
      activeSubTab="image-compressor"
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
                  <p>Quality: {quality}% | Format: {format === 'original' ? 'Original' : format.toUpperCase()}</p>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-medium mb-2">Image Compressor</h3>
                <p className="text-sm text-muted-foreground">
                  Reduce image file sizes without losing visible quality. Perfect for websites, emails, and saving storage space.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </ImageToolsLayout>
  );
}
