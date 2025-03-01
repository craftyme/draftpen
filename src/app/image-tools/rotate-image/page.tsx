'use client';

import React, { useState, useEffect } from 'react';
import NextImage from 'next/image';
import ImageToolsLayout from '@/components/layout/ImageToolsLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

export default function RotateImagePage() {
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [rotationMode, setRotationMode] = useState('preset');
  const [rotationAngle, setRotationAngle] = useState(0);
  const [presetAngle, setPresetAngle] = useState(90);
  
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
          <div>
            <h3 className="text-sm font-medium mb-2">Rotation Mode</h3>
            <RadioGroup 
              value={rotationMode} 
              onValueChange={setRotationMode}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="preset" id="preset" />
                <Label htmlFor="preset" className="text-sm">Preset Angles</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="custom" id="custom" />
                <Label htmlFor="custom" className="text-sm">Custom Angle</Label>
              </div>
            </RadioGroup>
          </div>
          
          {rotationMode === 'preset' ? (
            <div>
              <h3 className="text-sm font-medium mb-2">Preset Rotation</h3>
              <div className="grid grid-cols-4 gap-2">
                {[-90, 90, 180, 270].map((angle) => (
                  <Button 
                    key={angle} 
                    variant={presetAngle === angle ? "default" : "outline"}
                    className="h-10"
                    onClick={() => {
                      setPresetAngle(angle);
                      setRotationAngle(angle);
                    }}
                  >
                    {angle > 0 ? `+${angle}°` : `${angle}°`}
                  </Button>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <h3 className="text-sm font-medium mb-2">Custom Angle: {rotationAngle}°</h3>
              <Slider
                value={[rotationAngle]}
                min={-180}
                max={180}
                step={1}
                onValueChange={(value) => setRotationAngle(value[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>-180°</span>
                <span>0°</span>
                <span>+180°</span>
              </div>
            </div>
          )}
          
          <Button className="w-full mt-4">
            Rotate Image
          </Button>
        </>
      )}
    </div>
  );
  
  // Get the actual rotation angle
  const getRotationAngle = () => {
    return rotationMode === 'preset' ? presetAngle : rotationAngle;
  };
  
  return (
    <ImageToolsLayout 
      activeSubTab="rotate-image"
      ControlPanel={<ControlPanel />}
    >
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
            {fileUrl ? (
              <div className="w-full">
                <div className="relative w-full h-64 mb-4 bg-gray-100 rounded-md overflow-hidden">
                  <div 
                    className="relative w-full h-full transition-transform duration-300"
                    style={{ transform: `rotate(${getRotationAngle()}deg)` }}
                  >
                    <NextImage 
                      src={fileUrl} 
                      alt="Preview" 
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  Rotation angle: {getRotationAngle()}°
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-medium mb-2">Rotate Image</h3>
                <p className="text-sm text-muted-foreground">
                  Rotate your images to any angle. Perfect for fixing orientation issues or creating artistic effects.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </ImageToolsLayout>
  );
}
