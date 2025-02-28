import React, { useState, useRef, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { exportAsImage, copyToClipboard } from '@/lib/utils/export';
import EditorLayout from '@/components/layout/EditorLayout';
import { AlignLeft, AlignCenter, AlignRight, Bold, Italic, Calendar, MapPin, UserCircle } from 'lucide-react';
import Image from 'next/image';

const EssayEditor = () => {
  const [title, setTitle] = useState('Digital Warm Up');
  const [content, setContent] = useState(`I've realized that even when working on projects I'm passionate about, I need a digital warm-up period. This discovery came from my recent increased focus on coding.

Sometimes, grasping the big picture requires significant mental resources, and this is when my brain tends to seek diversions. However, I've noticed an interesting pattern in my work habits.

Instead of completely avoiding work, I find myself gravitating toward smaller, still valuable tasks:

- Organizing project files and documentation
- Cleaning up code and removing redundancies
- Completing small, manageable tasks

These activities create a sense of accomplishment and progress, effectively tricking my brain into a productive mindset. After this warm-up period, I naturally transition into the main project, often achieving a flow state that lasts for 2-3 hours of focused work.

What I've come to understand is that the actual coding isn't the challenging part. The real complexity lies in the mental compilation process—organizing thoughts and concepts before translating them into prompts or actual code.`);
  const [font] = useState('Geist');
  const [fontSize, setFontSize] = useState(16);
  const [lineHeight, setLineHeight] = useState(1.6);
  const [alignment, setAlignment] = useState('left');
  const [textColor, setTextColor] = useState('#4b5563');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [padding, setPadding] = useState(40);
  const [maxWidth, setMaxWidth] = useState(800);
  const [shadow, setShadow] = useState(3);
  const [borderRadius, setBorderRadius] = useState(8);
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  
  // New state variables for essay metadata
  const [showMetadata, setShowMetadata] = useState(true);
  const [date, setDate] = useState('Jan 7, 2025');
  const [location, setLocation] = useState('ALICANTE, SPAIN');
  
  // New state variables for author details
  const [showAuthor, setShowAuthor] = useState(true);
  const [authorName, setAuthorName] = useState('Tomas Laurinavicius');
  const [authorPosition, setAuthorPosition] = useState('Partner at Craftled');
  const [authorAvatar, setAuthorAvatar] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const exportContainerRef = useRef<HTMLDivElement>(null);

  // Export functions
  const handleExport = () => {
    if (exportContainerRef.current) {
      exportAsImage(exportContainerRef.current, 'essay.png');
    }
  };

  const handleCopy = () => {
    if (exportContainerRef.current) {
      copyToClipboard(exportContainerRef.current);
    }
  };

  // Format functions
  const toggleBold = () => setBold(!bold);
  const toggleItalic = () => setItalic(!italic);
  
  // Handle avatar upload
  const handleAvatarUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setAuthorAvatar(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  
  const canvasContent = (
    <div 
      ref={exportContainerRef}
      className="shadow-md transition-all overflow-hidden prose prose-zinc max-w-none"
      style={{ 
        backgroundColor,
        borderRadius: `${borderRadius}px`,
        padding: `${padding}px`,
        maxWidth: `${maxWidth}px`,
        width: '100%',
        boxShadow: shadow > 0 ? `0 ${shadow}px ${shadow * 3}px rgba(0, 0, 0, ${shadow * 0.03})` : 'none'
      }}
    >
      <h1 
        className="mb-2 transition-all"
        style={{ 
          fontFamily: font,
          fontSize: `${fontSize * 1.5}px`,
          lineHeight: `${lineHeight}`,
          textAlign: alignment as 'left' | 'center' | 'right',
          color: textColor,
          fontWeight: bold ? 'bold' : 'normal',
          fontStyle: italic ? 'italic' : 'normal'
        }}
      >
        {title}
      </h1>
      
      {showMetadata && (
        <div className="mb-6">
          <div className="text-xs text-zinc-400" style={{ 
            fontFamily: font,
            lineHeight: `${lineHeight}`,
            textAlign: alignment as 'left' | 'center' | 'right',
          }}>
            {date} {location && `   ${location}`}
          </div>
        </div>
      )}
      
      <div 
        className="whitespace-pre-line transition-all"
        style={{ 
          fontFamily: font,
          fontSize: `${fontSize}px`,
          lineHeight: `${lineHeight}`,
          textAlign: alignment as 'left' | 'center' | 'right',
          color: textColor,
          fontWeight: bold ? 'bold' : 'normal',
          fontStyle: italic ? 'italic' : 'normal'
        }}
      >
        {content}
      </div>
      
      {showAuthor && (
        <div className="mt-10 flex items-center" style={{ 
          fontFamily: font,
          color: textColor
        }}>
          {authorAvatar ? (
            <div className="w-12 h-12 rounded-full mr-3 overflow-hidden relative">
              <Image 
                src={authorAvatar} 
                alt={authorName}
                layout="fill"
                objectFit="cover"
              />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-full bg-zinc-100 mr-3 flex items-center justify-center">
              <UserCircle className="w-8 h-8 text-zinc-400" />
            </div>
          )}
          <div>
            <div className="font-medium" style={{ fontSize: `${fontSize * 0.9}px` }}>{authorName}</div>
            {authorPosition && (
              <div className="text-zinc-500" style={{ fontSize: `${fontSize * 0.8}px` }}>{authorPosition}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  const controlContent = (
    <>
      <div className="space-y-2">
        <h3 className="text-xs font-medium mb-2">Essay Content</h3>
        <div className="space-y-2">
          <Label className="text-xs font-medium" htmlFor="title">Title</Label>
          <Input 
            id="title"
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="Enter essay title" 
            className="text-sm"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-medium" htmlFor="content">Content</Label>
          <Textarea 
            id="content"
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            placeholder="Write your essay here..." 
            className="min-h-[120px] text-sm"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-medium">Metadata</h3>
          <Switch
            checked={showMetadata}
            onCheckedChange={setShowMetadata}
          />
        </div>
        
        {showMetadata && (
          <div className="space-y-2 mt-2">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <Input 
                value={date} 
                onChange={(e) => setDate(e.target.value)} 
                placeholder="Jan 7, 2025" 
                className="text-sm flex-1"
              />
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              <Input 
                value={location} 
                onChange={(e) => setLocation(e.target.value)} 
                placeholder="CITY, COUNTRY" 
                className="text-sm flex-1"
              />
            </div>
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-medium">Author</h3>
          <Switch
            checked={showAuthor}
            onCheckedChange={setShowAuthor}
          />
        </div>
        
        {showAuthor && (
          <div className="space-y-3 mt-2">
            <div className="flex items-start gap-3">
              <div 
                onClick={triggerFileInput}
                className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center cursor-pointer hover:bg-zinc-300 transition-colors overflow-hidden relative"
              >
                {authorAvatar ? (
                  <Image 
                    src={authorAvatar} 
                    alt="Avatar"
                    layout="fill"
                    objectFit="cover"
                  />
                ) : (
                  <UserCircle className="w-8 h-8 text-zinc-400" />
                )}
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleAvatarUpload}
                  accept="image/*"
                  className="hidden"
                />
              </div>
              <div className="space-y-2 flex-1">
                <Input 
                  value={authorName} 
                  onChange={(e) => setAuthorName(e.target.value)} 
                  placeholder="Author Name" 
                  className="text-sm"
                />
                <Input 
                  value={authorPosition} 
                  onChange={(e) => setAuthorPosition(e.target.value)} 
                  placeholder="Position or Title" 
                  className="text-sm"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <h3 className="text-xs font-medium mb-2">Text Styling</h3>
        <div className="flex space-x-2 mb-3">
          <Button 
            size="sm" 
            variant={bold ? "default" : "outline"} 
            className="w-10 p-0" 
            onClick={toggleBold}
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button 
            size="sm" 
            variant={italic ? "default" : "outline"} 
            className="w-10 p-0" 
            onClick={toggleItalic}
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button 
            size="sm" 
            variant={alignment === 'left' ? "default" : "outline"} 
            className="w-10 p-0" 
            onClick={() => setAlignment('left')}
          >
            <AlignLeft className="h-4 w-4" />
          </Button>
          <Button 
            size="sm" 
            variant={alignment === 'center' ? "default" : "outline"} 
            className="w-10 p-0" 
            onClick={() => setAlignment('center')}
          >
            <AlignCenter className="h-4 w-4" />
          </Button>
          <Button 
            size="sm" 
            variant={alignment === 'right' ? "default" : "outline"} 
            className="w-10 p-0" 
            onClick={() => setAlignment('right')}
          >
            <AlignRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center justify-between mb-1">
          <Label className="text-xs font-medium">Font Size</Label>
          <span className="text-xs text-gray-500">{fontSize}px</span>
        </div>
        <Slider
          value={[fontSize]}
          min={12}
          max={32}
          step={1}
          onValueChange={(value) => setFontSize(value[0])}
          className="my-1"
        />

        <div className="flex items-center justify-between mb-1">
          <Label className="text-xs font-medium">Line Height</Label>
          <span className="text-xs text-gray-500">{lineHeight}</span>
        </div>
        <Slider
          value={[lineHeight * 10]}
          min={10}
          max={25}
          step={1}
          onValueChange={(value) => setLineHeight(value[0] / 10)}
          className="my-1"
        />

        <div className="flex items-center justify-between mb-1">
          <Label className="text-xs font-medium">Text Color</Label>
          <div className="flex items-center gap-2">
            <Input
              type="color"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              className="w-6 h-6 p-0 border-0"
            />
            <span className="text-xs text-gray-500">{textColor}</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-xs font-medium mb-2">Layout</h3>
        <div className="flex items-center justify-between mb-1">
          <Label className="text-xs font-medium">Padding</Label>
          <span className="text-xs text-gray-500">{padding}px</span>
        </div>
        <Slider
          value={[padding]}
          min={20}
          max={80}
          step={5}
          onValueChange={(value) => setPadding(value[0])}
          className="my-1"
        />

        <div className="flex items-center justify-between mb-1">
          <Label className="text-xs font-medium">Max Width</Label>
          <span className="text-xs text-gray-500">{maxWidth}px</span>
        </div>
        <Slider
          value={[maxWidth]}
          min={400}
          max={1200}
          step={50}
          onValueChange={(value) => setMaxWidth(value[0])}
          className="my-1"
        />

        <div className="flex items-center justify-between mb-1">
          <Label className="text-xs font-medium">Background</Label>
          <div className="flex items-center gap-2">
            <Input
              type="color"
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
              className="w-6 h-6 p-0 border-0"
            />
            <span className="text-xs text-gray-500">{backgroundColor}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-1">
          <Label className="text-xs font-medium">Corner Radius</Label>
          <span className="text-xs text-gray-500">{borderRadius}px</span>
        </div>
        <Slider
          value={[borderRadius]}
          min={0}
          max={20}
          step={1}
          onValueChange={(value) => setBorderRadius(value[0])}
          className="my-1"
        />

        <div className="flex items-center justify-between mb-1">
          <Label className="text-xs font-medium">Shadow</Label>
          <span className="text-xs text-gray-500">{shadow}</span>
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

export default EssayEditor;
