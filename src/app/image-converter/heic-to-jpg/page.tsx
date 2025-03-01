'use client';

import React, { useState, useEffect } from 'react';
import ImageConverterLayout from '@/components/layout/ImageConverterLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

export default function HeicToJpgPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [quality, setQuality] = useState(80);
  const [fileUrls, setFileUrls] = useState<string[]>([]);
  
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
        <h3 className="text-sm font-medium mb-2">Upload HEIC Files</h3>
        <div className="flex flex-col gap-2">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => document.getElementById('heic-upload')?.click()}
          >
            Select HEIC Files
          </Button>
          <input 
            id="heic-upload" 
            type="file" 
            accept=".heic,.heif" 
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
      
      <Button className="w-full mt-4" disabled={files.length === 0}>
        Convert to JPG
      </Button>
    </div>
  );
  
  return (
    <ImageConverterLayout 
      activeSubTab="heic-to-jpg"
      ControlPanel={<ControlPanel />}
    >
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
            {files.length > 0 ? (
              <div>
                <p className="font-medium">{files.length} HEIC image{files.length !== 1 ? 's' : ''} selected</p>
                <div className="grid grid-cols-3 gap-2 mt-4">
                  {fileUrls.slice(0, 6).map((url, index) => (
                    <div key={index} className="aspect-square bg-gray-100 rounded-md overflow-hidden relative">
                      <div className="flex items-center justify-center h-full text-xs text-muted-foreground">
                        HEIC Preview
                      </div>
                    </div>
                  ))}
                  {files.length > 6 && (
                    <div className="aspect-square bg-gray-100 rounded-md flex items-center justify-center">
                      <span className="text-xs text-muted-foreground">+{files.length - 6} more</span>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-medium mb-2">HEIC to JPG</h3>
                <p className="text-sm text-muted-foreground">
                  Convert Apple&apos;s HEIC format to widely compatible JPG images. Perfect for sharing photos from your iPhone.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </ImageConverterLayout>
  );
}
