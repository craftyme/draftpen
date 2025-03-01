'use client';

import React, { useState, useEffect, useRef } from 'react';
import ImageToolsLayout from '@/components/layout/ImageToolsLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Copy } from 'lucide-react';

export default function ColorPickerPage() {
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [colorFormat, setColorFormat] = useState('hex');
  const [recentColors, setRecentColors] = useState<string[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  
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
  
  // Initialize canvas when image is loaded
  useEffect(() => {
    if (fileUrl) {
      const img = new window.Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        if (canvas) {
          const ctx = canvas.getContext('2d');
          if (ctx) {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0, img.width, img.height);
            imageRef.current = img;
          }
        }
      };
      img.src = fileUrl;
    }
  }, [fileUrl]);
  
  // Handle canvas click to pick color
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      
      const x = Math.floor((e.clientX - rect.left) * scaleX);
      const y = Math.floor((e.clientY - rect.top) * scaleY);
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const pixelData = ctx.getImageData(x, y, 1, 1).data;
        const hex = rgbToHex(pixelData[0], pixelData[1], pixelData[2]);
        setSelectedColor(hex);
        
        // Add to recent colors
        if (!recentColors.includes(hex)) {
          setRecentColors(prev => [hex, ...prev.slice(0, 7)]);
        }
      }
    }
  };
  
  // Convert RGB to HEX
  const rgbToHex = (r: number, g: number, b: number) => {
    return '#' + [r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('');
  };
  
  // Convert HEX to RGB
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };
  
  // Get color value based on format
  const getColorValue = () => {
    if (!selectedColor) return '';
    
    if (colorFormat === 'hex') {
      return selectedColor;
    } else if (colorFormat === 'rgb') {
      const rgb = hexToRgb(selectedColor);
      return rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : '';
    } else if (colorFormat === 'hsl') {
      const rgb = hexToRgb(selectedColor);
      if (!rgb) return '';
      
      const r = rgb.r / 255;
      const g = rgb.g / 255;
      const b = rgb.b / 255;
      
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h = 0, s = 0, l = (max + min) / 2;
      
      if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        
        switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
        }
        
        h = Math.round(h * 60);
      }
      
      s = Math.round(s * 100);
      l = Math.round(l * 100);
      
      return `hsl(${h}, ${s}%, ${l}%)`;
    }
    
    return selectedColor;
  };
  
  // Copy color to clipboard
  const copyToClipboard = () => {
    const colorValue = getColorValue();
    if (colorValue) {
      navigator.clipboard.writeText(colorValue);
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
                setSelectedColor(null);
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
      
      {selectedColor && (
        <>
          <div className="space-y-2">
            <Label className="text-sm font-medium">Selected Color</Label>
            <div className="flex items-center gap-2">
              <div 
                className="w-12 h-12 rounded-md border"
                style={{ backgroundColor: selectedColor }}
              />
              <div className="flex-1">
                <div className="flex items-center">
                  <Input 
                    value={getColorValue()}
                    readOnly
                    className="flex-1"
                  />
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="ml-1"
                    onClick={copyToClipboard}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex mt-1 gap-2">
                  <Button 
                    variant={colorFormat === 'hex' ? 'default' : 'outline'} 
                    size="sm"
                    className="text-xs h-7 px-2"
                    onClick={() => setColorFormat('hex')}
                  >
                    HEX
                  </Button>
                  <Button 
                    variant={colorFormat === 'rgb' ? 'default' : 'outline'} 
                    size="sm"
                    className="text-xs h-7 px-2"
                    onClick={() => setColorFormat('rgb')}
                  >
                    RGB
                  </Button>
                  <Button 
                    variant={colorFormat === 'hsl' ? 'default' : 'outline'} 
                    size="sm"
                    className="text-xs h-7 px-2"
                    onClick={() => setColorFormat('hsl')}
                  >
                    HSL
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {recentColors.length > 0 && (
            <div className="space-y-2">
              <Label className="text-sm font-medium">Recent Colors</Label>
              <div className="flex flex-wrap gap-2">
                {recentColors.map((color, index) => (
                  <Button 
                    key={index}
                    variant="outline"
                    className="w-8 h-8 p-0"
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}
      
      {file && (
        <p className="text-xs text-muted-foreground mt-4">
          Click on the image to pick a color
        </p>
      )}
    </div>
  );
  
  return (
    <ImageToolsLayout 
      activeSubTab="color-picker"
      ControlPanel={<ControlPanel />}
    >
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
            {fileUrl ? (
              <div className="w-full relative">
                <div 
                  className="relative w-full rounded-md overflow-hidden cursor-crosshair"
                  style={{ maxHeight: '300px' }}
                >
                  <canvas 
                    ref={canvasRef}
                    onClick={handleCanvasClick}
                    className="w-full h-auto object-contain"
                    style={{ maxHeight: '300px' }}
                  />
                </div>
                {selectedColor && (
                  <div className="absolute top-2 right-2 bg-white dark:bg-gray-800 rounded-md shadow-sm p-1 border">
                    <div 
                      className="w-6 h-6 rounded-sm"
                      style={{ backgroundColor: selectedColor }}
                    />
                  </div>
                )}
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-medium mb-2">Color Picker</h3>
                <p className="text-sm text-muted-foreground">
                  Extract exact colors from any image. Perfect for designers, developers, and anyone who needs precise color values.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </ImageToolsLayout>
  );
}
