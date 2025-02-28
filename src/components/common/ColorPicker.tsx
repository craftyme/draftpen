import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  showHexValue?: boolean;
}

const ColorPicker = ({
  label,
  value,
  onChange,
  showHexValue = true
}: ColorPickerProps) => {
  return (
    <div className="flex items-center justify-between mb-1">
      <Label className="text-xs">{label}</Label>
      <div className="flex items-center gap-2">
        <Input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-6 h-6 p-0 border-0"
        />
        {showHexValue && (
          <span className="text-xs text-gray-500">{value}</span>
        )}
      </div>
    </div>
  );
};

export default ColorPicker;
