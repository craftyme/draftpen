'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import PdfToolsLayout from '@/components/layout/PdfToolsLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

export default function ImageToPdfPage() {
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
        <h3 className="text-sm font-medium mb-2">Upload Images</h3>
        <div className="flex flex-col gap-2">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => document.getElementById('image-upload')?.click()}
          >
            Select Images
          </Button>
          <input 
            id="image-upload" 
            type="file" 
            accept="image/*" 
            multiple
            className="hidden" 
            onChange={(e) => {
              if (e.target.files) {
                setFiles(Array.from(e.target.files));
              }
            }}
          />
          {files.length > 0 && (
            <p className="text-xs text-muted-foreground">
              Selected: {files.length} image{files.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">PDF Quality: {quality}%</h3>
        <Slider
          value={[quality]}
          min={10}
          max={100}
          step={5}
          onValueChange={(value) => setQuality(value[0])}
        />
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Page Size</h3>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm">A4</Button>
          <Button variant="outline" size="sm">Letter</Button>
        </div>
      </div>
      
      <Button className="w-full mt-4" disabled={files.length === 0}>
        Convert to PDF
      </Button>
    </div>
  );
  
  return (
    <PdfToolsLayout 
      activeSubTab="image-to-pdf"
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
                      <Image 
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
                      <span className="text-sm">+{files.length - 6} more</span>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-medium mb-2">Image to PDF</h3>
                <p className="text-sm text-muted-foreground">
                  Convert your images to PDF. Supports JPG, PNG, GIF, and other image formats.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </PdfToolsLayout>
  );
}
