'use client';

import React, { useState, useEffect } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

export function ColorPicker({ color, onChange }: ColorPickerProps) {
  const [selectedColor, setSelectedColor] = useState(color);
  const [inputColor, setInputColor] = useState(color);
  
  // Update local state when prop changes
  useEffect(() => {
    setSelectedColor(color);
    setInputColor(color);
  }, [color]);
  
  // Common colors palette
  const commonColors = [
    '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', 
    '#FFFF00', '#FF00FF', '#00FFFF', '#FF8000', '#8000FF',
    '#0080FF', '#FF0080', '#80FF00', '#808080', '#C0C0C0'
  ];
  
  // Handle color change
  const handleColorChange = (newColor: string) => {
    setSelectedColor(newColor);
    setInputColor(newColor);
    onChange(newColor);
  };
  
  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputColor(value);
    
    // Validate hex color
    if (/^#([0-9A-F]{3}){1,2}$/i.test(value)) {
      handleColorChange(value);
    }
  };
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          className="w-full h-10 flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <div 
              className="w-6 h-6 rounded-sm border"
              style={{ backgroundColor: selectedColor }}
            />
            <span>{selectedColor}</span>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <Tabs defaultValue="picker">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="picker">Picker</TabsTrigger>
            <TabsTrigger value="common">Common</TabsTrigger>
          </TabsList>
          
          <TabsContent value="picker" className="space-y-4 pt-2">
            <div>
              <input 
                type="color"
                value={selectedColor}
                onChange={(e) => handleColorChange(e.target.value)}
                className="w-full h-32 p-0 border-0 rounded-md cursor-pointer"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="hex-color" className="text-sm font-medium">Hex Color</Label>
              <Input 
                id="hex-color"
                value={inputColor}
                onChange={handleInputChange}
                placeholder="#000000"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="common" className="pt-2">
            <div className="grid grid-cols-5 gap-2">
              {commonColors.map((color, index) => (
                <Button 
                  key={index}
                  variant="outline"
                  className="w-10 h-10 p-0"
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorChange(color)}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
}
