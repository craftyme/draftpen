'use client';

import React, { useState } from 'react';
import ImageConverterLayout from '@/components/layout/ImageConverterLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';

export default function PdfToJpgPage() {
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState(80);
  const [pageRange, setPageRange] = useState('all');
  
  // Control panel component
  const ControlPanel = () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Upload PDF</h3>
        <div className="flex flex-col gap-2">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => document.getElementById('pdf-upload')?.click()}
          >
            Select PDF File
          </Button>
          <input 
            id="pdf-upload" 
            type="file" 
            accept=".pdf" 
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
        <h3 className="text-sm font-medium mb-2">Page Range</h3>
        <Input 
          placeholder="e.g. 1-5, 8, 11-13" 
          value={pageRange} 
          onChange={(e) => setPageRange(e.target.value)}
        />
        <p className="text-xs text-muted-foreground mt-1">
          Enter &apos;all&apos; for all pages, or specify ranges (e.g. 1-5, 8)
        </p>
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
      
      <Button className="w-full mt-4" disabled={!file}>
        Convert to JPG
      </Button>
    </div>
  );
  
  return (
    <ImageConverterLayout 
      activeSubTab="pdf-to-jpg"
      ControlPanel={<ControlPanel />}
    >
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
            {file ? (
              <div>
                <p className="font-medium">{file.name}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Converting to JPG with {quality}% quality
                </p>
                <div className="mt-4 p-4 border rounded-md">
                  <p className="text-sm">Preview will appear here after conversion</p>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-medium mb-2">PDF to JPG</h3>
                <p className="text-sm text-muted-foreground">
                  Convert your PDF documents to high-quality JPG images. Perfect for sharing and embedding in documents.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </ImageConverterLayout>
  );
}
