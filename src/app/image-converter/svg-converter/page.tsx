'use client';

import React, { useState, useEffect } from 'react';
import ImageConverterLayout from '@/components/layout/ImageConverterLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function SvgConverterPage() {
  const [file, setFile] = useState<File | null>(null);
  const [outputFormat, setOutputFormat] = useState('png');
  const [fileUrl, setFileUrl] = useState<string>('');
  
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
        <h3 className="text-sm font-medium mb-2">Upload SVG</h3>
        <div className="flex flex-col gap-2">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => document.getElementById('svg-upload')?.click()}
          >
            Select SVG File
          </Button>
          <input 
            id="svg-upload" 
            type="file" 
            accept=".svg" 
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
        <h3 className="text-sm font-medium mb-2">Output Format</h3>
        <Select value={outputFormat} onValueChange={setOutputFormat}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select format" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="png">PNG</SelectItem>
            <SelectItem value="jpg">JPG</SelectItem>
            <SelectItem value="webp">WebP</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Button className="w-full mt-4" disabled={!file}>
        Convert SVG
      </Button>
    </div>
  );
  
  return (
    <ImageConverterLayout 
      activeSubTab="svg-converter"
      ControlPanel={<ControlPanel />}
    >
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
            {file ? (
              <div>
                <p className="font-medium">{file.name}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Converting to {outputFormat.toUpperCase()}
                </p>
                <div className="mt-4 p-4 border rounded-md relative h-48 w-full">
                  {fileUrl && (
                    <object 
                      data={fileUrl} 
                      type="image/svg+xml" 
                      className="h-full w-full object-contain"
                    >
                      SVG Preview
                    </object>
                  )}
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-medium mb-2">SVG Converter</h3>
                <p className="text-sm text-muted-foreground">
                  Convert SVG vector graphics to raster formats like PNG, JPG, or WebP. Perfect for compatibility with various platforms.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </ImageConverterLayout>
  );
}
