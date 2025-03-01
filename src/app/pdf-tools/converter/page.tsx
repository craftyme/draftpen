'use client';

import React, { useState } from 'react';
import PdfToolsLayout from '@/components/layout/PdfToolsLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function PdfConverterPage() {
  const [file, setFile] = useState<File | null>(null);
  const [outputFormat, setOutputFormat] = useState('docx');
  
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
        <h3 className="text-sm font-medium mb-2">Output Format</h3>
        <Select 
          value={outputFormat} 
          onValueChange={setOutputFormat}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select format" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="docx">Word (DOCX)</SelectItem>
            <SelectItem value="pptx">PowerPoint (PPTX)</SelectItem>
            <SelectItem value="xlsx">Excel (XLSX)</SelectItem>
            <SelectItem value="txt">Text (TXT)</SelectItem>
            <SelectItem value="html">HTML</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Button className="w-full mt-4" disabled={!file}>
        Convert PDF
      </Button>
    </div>
  );
  
  return (
    <PdfToolsLayout 
      activeSubTab="converter"
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
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-medium mb-2">PDF Converter</h3>
                <p className="text-sm text-muted-foreground">
                  Convert your PDF files to various formats including Word, PowerPoint, Excel, and more.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </PdfToolsLayout>
  );
}
