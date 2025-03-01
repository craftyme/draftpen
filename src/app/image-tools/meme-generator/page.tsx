'use client';

import React, { useState, useEffect, useRef } from 'react';
import ImageToolsLayout from '@/components/layout/ImageToolsLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ColorPicker } from '@/components/ui/color-picker';

export default function MemeGeneratorPage() {
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [fontSize, setFontSize] = useState(36);
  const [fontFamily, setFontFamily] = useState('Impact');
  const [textColor, setTextColor] = useState('#FFFFFF');
  const [strokeColor, setStrokeColor] = useState('#000000');
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [textAlign, setTextAlign] = useState('center');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Create object URL for the file
  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setFileUrl(url);
      
      // Clean up the URL when component unmounts
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [file]);
  
  // Render meme to canvas when parameters change
  useEffect(() => {
    if (fileUrl) {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const img = new window.Image();
          img.onload = () => {
            // Set canvas dimensions to match image
            canvas.width = img.width;
            canvas.height = img.height;
            
            // Draw image
            ctx.drawImage(img, 0, 0, img.width, img.height);
            
            // Set text properties
            ctx.font = `${fontSize}px ${fontFamily}`;
            ctx.fillStyle = textColor;
            ctx.strokeStyle = strokeColor;
            ctx.lineWidth = strokeWidth;
            ctx.textAlign = textAlign as CanvasTextAlign;
            
            // Calculate positions
            const xPos = textAlign === 'center' ? img.width / 2 : 
                         textAlign === 'left' ? 20 : img.width - 20;
            
            // Draw top text
            if (topText) {
              ctx.textBaseline = 'top';
              ctx.fillText(topText, xPos, 20);
              ctx.strokeText(topText, xPos, 20);
            }
            
            // Draw bottom text
            if (bottomText) {
              ctx.textBaseline = 'bottom';
              ctx.fillText(bottomText, xPos, img.height - 20);
              ctx.strokeText(bottomText, xPos, img.height - 20);
            }
          };
          img.src = fileUrl;
        }
      }
    }
  }, [fileUrl, topText, bottomText, fontSize, fontFamily, textColor, strokeColor, strokeWidth, textAlign]);
  
  // Download meme
  const downloadMeme = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const link = document.createElement('a');
      link.download = 'meme.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  };
  
  // Control panel component
  const ControlPanel = () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Upload Image</h3>
        <div className="flex flex-col gap-2">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => document.getElementById('image-upload')?.click()}
          >
            Select Image
          </Button>
          <input 
            id="image-upload" 
            type="file" 
            accept="image/*"
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
      
      {file && (
        <>
          <div className="space-y-2">
            <Label htmlFor="top-text" className="text-sm font-medium">Top Text</Label>
            <Input 
              id="top-text"
              value={topText}
              onChange={(e) => setTopText(e.target.value)}
              placeholder="Enter top text"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="bottom-text" className="text-sm font-medium">Bottom Text</Label>
            <Input 
              id="bottom-text"
              value={bottomText}
              onChange={(e) => setBottomText(e.target.value)}
              placeholder="Enter bottom text"
            />
          </div>
          
          <Tabs defaultValue="font">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="font">Font</TabsTrigger>
              <TabsTrigger value="style">Style</TabsTrigger>
            </TabsList>
            
            <TabsContent value="font" className="space-y-4 pt-2">
              <div>
                <Label className="text-sm font-medium">Font Family</Label>
                <Select value={fontFamily} onValueChange={setFontFamily}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select font" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Impact">Impact</SelectItem>
                    <SelectItem value="Arial">Arial</SelectItem>
                    <SelectItem value="Comic Sans MS">Comic Sans MS</SelectItem>
                    <SelectItem value="Helvetica">Helvetica</SelectItem>
                    <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Font Size: {fontSize}px</Label>
                </div>
                <Slider
                  value={[fontSize]}
                  min={16}
                  max={72}
                  step={2}
                  onValueChange={(value) => setFontSize(value[0])}
                />
              </div>
              
              <div>
                <Label className="text-sm font-medium">Text Alignment</Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {['left', 'center', 'right'].map((align) => (
                    <Button 
                      key={align}
                      variant={textAlign === align ? 'default' : 'outline'}
                      className="capitalize"
                      onClick={() => setTextAlign(align)}
                    >
                      {align}
                    </Button>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="style" className="space-y-4 pt-2">
              <div>
                <Label className="text-sm font-medium">Text Color</Label>
                <div className="mt-2">
                  <ColorPicker color={textColor} onChange={setTextColor} />
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium">Stroke Color</Label>
                <div className="mt-2">
                  <ColorPicker color={strokeColor} onChange={setStrokeColor} />
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Stroke Width: {strokeWidth}px</Label>
                </div>
                <Slider
                  value={[strokeWidth]}
                  min={0}
                  max={6}
                  step={0.5}
                  onValueChange={(value) => setStrokeWidth(value[0])}
                />
              </div>
            </TabsContent>
          </Tabs>
          
          <Button className="w-full mt-4" onClick={downloadMeme}>
            Download Meme
          </Button>
        </>
      )}
    </div>
  );
  
  return (
    <ImageToolsLayout 
      activeSubTab="meme-generator"
      ControlPanel={<ControlPanel />}
    >
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
            {fileUrl ? (
              <div className="w-full">
                <div className="relative w-full mb-4 bg-gray-100 rounded-md overflow-hidden">
                  <canvas 
                    ref={canvasRef}
                    className="w-full h-auto object-contain"
                    style={{ maxHeight: '300px' }}
                  />
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-medium mb-2">Meme Generator</h3>
                <p className="text-sm text-muted-foreground">
                  Create custom memes with your own images and text. Perfect for social media, messaging, and sharing with friends.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </ImageToolsLayout>
  );
}
