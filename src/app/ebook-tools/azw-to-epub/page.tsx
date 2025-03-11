"use client";

import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import EbookToolsLayout from "@/components/layout/EbookToolsLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Upload } from "lucide-react";

export default function AzwToEpubPage() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleConvert = () => {
    // Conversion logic would go here
    alert("Conversion functionality will be implemented soon!");
  };

  const ControlPanel = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Convert AZW to EPUB</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Convert your Amazon Kindle AZW eBooks to EPUB format for better
          compatibility with various e-readers.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="file-upload">Upload AZW File</Label>
          <Input
            id="file-upload"
            type="file"
            accept=".azw,.azw3"
            onChange={handleFileChange}
          />
        </div>

        <Button onClick={handleConvert} disabled={!file} className="w-full">
          Convert to EPUB
        </Button>
      </div>
    </div>
  );

  return (
    <MainLayout activeTab="ebook-tools">
      <EbookToolsLayout
        activeSubTab="azw-to-epub"
        ControlPanel={<ControlPanel />}
      >
        <div className="max-w-3xl mx-auto">
          {!file ? (
            <Card className="border-dashed border-2 bg-muted/50">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Upload className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Upload AZW File</h3>
                <p className="text-sm text-muted-foreground text-center max-w-md mb-4">
                  Drag and drop your AZW file here, or use the upload button in
                  the control panel.
                </p>
                <Label htmlFor="dropzone-file" className="cursor-pointer">
                  <Button variant="outline">Select AZW File</Button>
                  <Input
                    id="dropzone-file"
                    type="file"
                    accept=".azw,.azw3"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </Label>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="py-6">
                <h3 className="text-lg font-medium mb-4">
                  File Ready for Conversion
                </h3>
                <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                  <div>
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <Button onClick={handleConvert}>Convert</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </EbookToolsLayout>
    </MainLayout>
  );
}
