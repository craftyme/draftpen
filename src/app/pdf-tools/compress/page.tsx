'use client';

import React, { useState } from 'react';
import PdfToolsLayout from '@/components/layout/PdfToolsLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function CompressPdfPage() {
  const [file, setFile] = useState<File | null>(null);
  
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
        <h3 className="text-sm font-medium mb-2">Compression Level</h3>
        <div className="grid grid-cols-3 gap-2">
          <Button variant="outline" size="sm">Low</Button>
          <Button variant="outline" size="sm">Medium</Button>
          <Button variant="outline" size="sm">High</Button>
        </div>
      </div>
      
      <Button className="w-full mt-4" disabled={!file}>
        Compress PDF
      </Button>
    </div>
  );
  
  return (
    <PdfToolsLayout 
      activeSubTab="compress"
      ControlPanel={<ControlPanel />}
    >
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
            {file ? (
              <div>
                <p className="font-medium">{file.name}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-medium mb-2">Compress PDF</h3>
                <p className="text-sm text-muted-foreground">
                  Reduce the file size of your PDF documents while maintaining quality.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </PdfToolsLayout>
  );
}
