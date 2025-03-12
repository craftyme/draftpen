import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { exportAsImage, copyToClipboard } from "@/lib/utils/export";
import EditorLayout from "@/components/layout/EditorLayout";
import { ImagePlus, UploadCloud } from "lucide-react";

const ScreenshotEditor = () => {
  const [image, setImage] = useState<string | null>(null);
  const [borderRadius, setBorderRadius] = useState(16);
  const [shadow, setShadow] = useState(3);
  const [padding, setPadding] = useState(20);
  const [rotation, setRotation] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [noise, setNoise] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const exportContainerRef = useRef<HTMLDivElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle paste from clipboard
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") !== -1) {
          const blob = items[i].getAsFile();
          if (blob) {
            const reader = new FileReader();
            reader.onload = (event) => {
              const result = event.target?.result as string;
              setImage(result);
            };
            reader.readAsDataURL(blob);
          }
        }
      }
    };

    window.addEventListener("paste", handlePaste);
    return () => {
      window.removeEventListener("paste", handlePaste);
    };
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleExport = () => {
    if (exportContainerRef.current) {
      exportAsImage(exportContainerRef.current, "screenshot.png");
    }
  };

  const handleCopy = () => {
    if (exportContainerRef.current) {
      copyToClipboard(exportContainerRef.current);
    }
  };

  const canvasContent = (
    <div
      ref={exportContainerRef}
      className={`relative max-w-4xl mx-auto ${
        noise
          ? 'before:content-[""] before:absolute before:inset-0 before:bg-noise before:opacity-5 before:pointer-events-none'
          : ""
      }`}
      style={{
        backgroundColor,
        padding: `${padding}px`,
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
      }}
    >
      {image ? (
        <div className="relative">
          {/* Use a regular img tag instead of Next.js Image for more reliable display */}
          <img
            src={image}
            alt="Screenshot"
            className="max-w-full h-auto"
            style={{
              borderRadius: `${borderRadius}px`,
              boxShadow:
                shadow > 0
                  ? `0 ${shadow}px ${shadow * 3}px rgba(0, 0, 0, ${
                      shadow * 0.03
                    })`
                  : "none",
              transform: rotation !== 0 ? `rotate(${rotation}deg)` : "none",
            }}
          />
        </div>
      ) : (
        <div
          className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center min-h-[300px] min-w-[400px] bg-white/50 dark:bg-gray-800/30"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <UploadCloud className="w-12 h-12 text-gray-400 dark:text-gray-300 mb-4" />
          <h3 className="text-lg font-medium mb-2 text-[#2F3130] dark:text-gray-200">
            Drag-n-drop your image here
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-300 mb-4">
            or use{" "}
            <kbd className="px-1.5 py-0.5 text-xs font-geist-mono bg-[#F8F8F9] dark:bg-gray-700 border border-[#CECECF] dark:border-gray-600 rounded-md text-[#2F3130] dark:text-gray-200">
              ⌘+v
            </kbd>{" "}
            to paste from clipboard
          </p>
          <Button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200"
            size="sm"
          >
            <ImagePlus className="mr-2 h-4 w-4" />
            Select image
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      )}
    </div>
  );

  const controlContent = (
    <>
      <div className="space-y-2">
        <div className="flex items-center justify-between mb-1">
          <Label className="text-xs font-medium">Frame</Label>
          <span className="text-xs text-gray-500 dark:text-gray-400">Arc</span>
        </div>
        <div className="flex items-center justify-between mb-1">
          <Label className="text-xs font-medium">Size</Label>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {padding}
          </span>
        </div>
        <Slider
          value={[padding]}
          min={0}
          max={80}
          step={1}
          onValueChange={(value) => setPadding(value[0])}
          className="my-1"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between mb-1">
          <Label className="text-xs font-medium">Roundness</Label>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {borderRadius}
          </span>
        </div>
        <Slider
          value={[borderRadius]}
          min={0}
          max={40}
          step={1}
          onValueChange={(value) => setBorderRadius(value[0])}
          className="my-1"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between mb-1">
          <Label className="text-xs font-medium">Shadow</Label>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {shadow}
          </span>
        </div>
        <Slider
          value={[shadow]}
          min={0}
          max={20}
          step={1}
          onValueChange={(value) => setShadow(value[0])}
          className="my-1"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between mb-1">
          <Label className="text-xs font-medium">Rotate</Label>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {rotation}°
          </span>
        </div>
        <Slider
          value={[rotation]}
          min={-180}
          max={180}
          step={1}
          onValueChange={(value) => setRotation(value[0])}
          className="my-1"
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-xs font-medium mb-2">Canvas options</h3>
        <div className="flex items-center justify-between mb-1">
          <Label className="text-xs font-medium">Background</Label>
          <div className="flex items-center gap-2">
            <Input
              type="color"
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
              className="w-6 h-6 p-0 border-0"
            />
            <span className="text-xs font-geist-mono text-gray-500 dark:text-gray-400">
              {backgroundColor}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="noise-toggle" className="text-xs font-medium">
            Noise
          </Label>
          <Switch
            id="noise-toggle"
            checked={noise}
            onCheckedChange={setNoise}
          />
        </div>
      </div>
    </>
  );

  return (
    <EditorLayout
      onExport={handleExport}
      onCopy={handleCopy}
      ControlPanel={controlContent}
    >
      {canvasContent}
    </EditorLayout>
  );
};

export default ScreenshotEditor;
