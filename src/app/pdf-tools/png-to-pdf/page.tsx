'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import PdfToolsLayout from '@/components/layout/PdfToolsLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export default function PngToPdfPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [preserveTransparency, setPreserveTransparency] = useState(true);
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
        <h3 className="text-sm font-medium mb-2">Upload PNG Images</h3>
        <div className="flex flex-col gap-2">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => document.getElementById('png-upload')?.click()}
          >
            Select PNG Images
          </Button>
          <input 
            id="png-upload" 
            type="file" 
            accept=".png" 
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
              Selected: {files.length} PNG image{files.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>
      </div>
      
      <div>
        <div className="flex items-center justify-between">
          <Label htmlFor="transparency" className="text-sm font-medium">
            Preserve Transparency
          </Label>
          <Switch
            id="transparency"
            checked={preserveTransparency}
            onCheckedChange={setPreserveTransparency}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Keep transparent backgrounds in your PNG images
        </p>
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Page Size</h3>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm">A4</Button>
          <Button variant="outline" size="sm">Letter</Button>
          <Button variant="outline" size="sm">Original Size</Button>
          <Button variant="outline" size="sm">Custom</Button>
        </div>
      </div>
      
      <Button className="w-full mt-4" disabled={files.length === 0}>
        Convert to PDF
      </Button>
    </div>
  );
  
  return (
    <PdfToolsLayout 
      activeSubTab="png-to-pdf"
      ControlPanel={<ControlPanel />}
    >
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
            {files.length > 0 ? (
              <div>
                <p className="font-medium">{files.length} PNG image{files.length !== 1 ? 's' : ''} selected</p>
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
                <h3 className="text-lg font-medium mb-2">PNG to PDF</h3>
                <p className="text-sm text-muted-foreground">
                  Convert your PNG images to PDF format while preserving transparency and quality.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </PdfToolsLayout>
  );
}
