import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface ImageUploaderProps {
  label: string;
  onImageUpload: (file: File) => void;
  buttonText?: string;
  accept?: string;
}

const ImageUploader = ({
  label,
  onImageUpload,
  buttonText = 'Upload',
  accept = 'image/*'
}: ImageUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };
  
  return (
    <div className="flex items-center justify-between">
      <Label className="text-xs font-medium">{label}</Label>
      <Button 
        size="sm" 
        variant="outline" 
        className="h-7 text-xs" 
        onClick={handleButtonClick}
      >
        {buttonText}
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default ImageUploader;
