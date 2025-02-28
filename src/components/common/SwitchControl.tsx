import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface SwitchControlProps {
  id: string;
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

const SwitchControl = ({
  id,
  label,
  checked,
  onCheckedChange
}: SwitchControlProps) => {
  return (
    <div className="flex items-center justify-between">
      <Label htmlFor={id} className="text-xs">
        {label}
      </Label>
      <Switch
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
      />
    </div>
  );
};

export default SwitchControl;
