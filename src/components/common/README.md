# Draftpen Common Components

This directory contains reusable components that are shared across different editor interfaces in Draftpen.

## Available Components

### ColorPicker
A color input with label and hex value display.

```tsx
<ColorPicker 
  label="Background Color" 
  value={backgroundColor} 
  onChange={setBackgroundColor} 
/>
```

### ExportButtons
Buttons for exporting and copying content to clipboard.

```tsx
<ExportButtons 
  onExportImage={handleExportImage} 
  onCopyToClipboard={handleCopyToClipboard} 
/>
```

### FormSection
A section container with title for grouping related form controls.

```tsx
<FormSection title="Appearance">
  {/* Form controls go here */}
</FormSection>
```

### ImageUploader
Component for uploading images with file selection.

```tsx
<ImageUploader 
  label="Profile Picture" 
  onImageUpload={handleProfileImageUpload} 
  buttonText="Upload" 
/>
```

### SliderControl
A labeled slider with value display.

```tsx
<SliderControl 
  label="Border Radius" 
  value={borderRadius} 
  onChange={setBorderRadius} 
  min={0} 
  max={32} 
  step={1} 
/>
```

### SwitchControl
A labeled toggle switch.

```tsx
<SwitchControl 
  id="show-preview" 
  label="Show Preview" 
  checked={showPreview} 
  onCheckedChange={setShowPreview} 
/>
```

## Usage

Import these components from the common directory:

```tsx
import { ColorPicker, SliderControl, SwitchControl } from '@/components/common';
```

Or import them individually:

```tsx
import ColorPicker from '@/components/common/ColorPicker';
```
