'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import ImageConverterLayout from '@/components/layout/ImageConverterLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function PngToSvgPage() {
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string>('');
  const [traceMode, setTraceMode] = useState('auto');
  const [smoothing, setSmoothing] = useState(75);
  
  // Create object URL for the file
  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setFileUrl(url);
      
      // Clean up the URL when component unmounts or file changes
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [file]);
  
  // Control panel component
  const ControlPanel = () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Upload PNG</h3>
        <div className="flex flex-col gap-2">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => document.getElementById('png-upload')?.click()}
          >
            Select PNG File
          </Button>
          <input 
            id="png-upload" 
            type="file" 
            accept=".png" 
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
      
      <div>
        <h3 className="text-sm font-medium mb-2">Trace Mode</h3>
        <Select value={traceMode} onValueChange={setTraceMode}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select mode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="auto">Auto (Recommended)</SelectItem>
            <SelectItem value="outline">Outline</SelectItem>
            <SelectItem value="detailed">Detailed</SelectItem>
            <SelectItem value="pixel">Pixel Perfect</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Smoothing: {smoothing}%</h3>
        <Slider
          value={[smoothing]}
          min={0}
          max={100}
          step={5}
          onValueChange={(value) => setSmoothing(value[0])}
        />
        <p className="text-xs text-muted-foreground mt-1">
          Higher values create smoother curves but less detail
        </p>
      </div>
      
      <Button className="w-full mt-4" disabled={!file}>
        Convert to SVG
      </Button>
    </div>
  );
  
  return (
    <ImageConverterLayout 
      activeSubTab="png-to-svg"
      ControlPanel={<ControlPanel />}
    >
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
            {file ? (
              <div>
                <p className="font-medium">{file.name}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Converting to SVG using {traceMode} mode with {smoothing}% smoothing
                </p>
                <div className="mt-4 p-4 border rounded-md relative h-48 w-full">
                  {fileUrl && (
                    <Image 
                      src={fileUrl} 
                      alt="PNG Preview" 
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  )}
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-medium mb-2">PNG to SVG</h3>
                <p className="text-sm text-muted-foreground">
                  Convert raster PNG images to scalable vector SVG format. Perfect for logos, icons, and illustrations.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </ImageConverterLayout>
  );
}
