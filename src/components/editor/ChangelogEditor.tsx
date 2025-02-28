import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { exportAsImage, copyToClipboard } from '@/lib/utils/export';
import EditorLayout from '@/components/layout/EditorLayout';
import { PlusCircle } from 'lucide-react';
import {
  ColorPicker,
  FormSection,
  SliderControl,
  SwitchControl
} from '@/components/common';

const ChangelogEditor = () => {
  // State for changelog content 
  const [version, setVersion] = useState('1.0.0');
  const [title, setTitle] = useState('Draftpen');
  const [subtitle, setSubtitle] = useState('First Release');
  
  // Changelog entries
  const [changelogType, setChangelogType] = useState('features');
  const [entries, setEntries] = useState({
    features: [
      'Beautiful screenshot editor with multiple templates',
      'Code snippet beautifier with syntax highlighting',
      'Social proof generators (G2, Trustpilot, Testimonials)',
      'Tweet and social media content creator',
      'Carousel image generator for product demos'
    ],
    fixes: [
      'Fixed image rendering issues in export',
      'Resolved layout problems in Firefox and Safari'
    ],
    improvements: [
      'Added dark mode support across all editors',
      'Optimized export quality for better image resolution',
      'Enhanced responsive layout for all screen sizes'
    ]
  });
  
  // New entry drafts
  const [newFeature, setNewFeature] = useState('');
  const [newFix, setNewFix] = useState('');
  const [newImprovement, setNewImprovement] = useState('');
  
  // State for styling
  const [gradientStart, setGradientStart] = useState('#6b46c1');
  const [gradientEnd, setGradientEnd] = useState('#e53e3e');
  const [textColor, setTextColor] = useState('#ffffff');
  const [borderRadius, setBorderRadius] = useState(8);
  const [showMockUI, setShowMockUI] = useState(true);
  
  // Refs for export
  const exportContainerRef = useRef<HTMLDivElement>(null);
  
  const handleAddEntry = () => {
    let entryText = '';
    const currentEntries = [...entries[changelogType as keyof typeof entries]];
    
    if (changelogType === 'features' && newFeature.trim()) {
      entryText = newFeature.trim();
      setNewFeature('');
    } else if (changelogType === 'fixes' && newFix.trim()) {
      entryText = newFix.trim();
      setNewFix('');
    } else if (changelogType === 'improvements' && newImprovement.trim()) {
      entryText = newImprovement.trim();
      setNewImprovement('');
    }
    
    if (entryText) {
      setEntries({
        ...entries,
        [changelogType]: [...currentEntries, entryText]
      });
    }
  };
  
  const handleRemoveEntry = (type: keyof typeof entries, index: number) => {
    const newEntries = [...entries[type]];
    newEntries.splice(index, 1);
    setEntries({
      ...entries,
      [type]: newEntries
    });
  };
  
  const handleExportImage = () => {
    exportAsImage(exportContainerRef.current, `${title}-changelog.png`);
  };
  
  const handleCopyToClipboard = () => {
    copyToClipboard(exportContainerRef.current);
  };
  
  const EntryList = ({ type, items }: { type: keyof typeof entries; items: string[] }) => (
    <div>
      {items.map((item, index) => (
        <div
          key={index}
          className="group flex items-start mb-2 text-sm text-white"
        >
          <div className="flex-1">{item}</div>
          <button
            onClick={() => handleRemoveEntry(type, index)}
            className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity text-white/70 hover:text-white"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
  
  // Render the changelog content
  const renderChangelog = () => (
    <div 
      className="w-[800px] h-[600px] rounded-lg flex overflow-hidden"
      style={{ 
        background: `linear-gradient(to right, ${gradientStart}, ${gradientEnd})`,
        color: textColor,
        borderRadius: `${borderRadius}px`,
      }}
      ref={exportContainerRef}
    >
      {/* Left content - Changelog */}
      <div className="flex-1 p-10">
        <div
          className="mb-4 border border-white/30 text-white px-3 py-1 rounded-full text-sm inline-block"
        >
          v{version}
        </div>
        
        <h1 className="text-4xl font-bold mb-1">{title}</h1>
        <h2 className="text-xl font-medium mb-6 opacity-90">{subtitle}</h2>
        
        <div className="grid grid-cols-2 gap-12">
          {/* Features Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">✨ New Features</h3>
            <EntryList type="features" items={entries.features} />
          </div>
          
          <div>
            {/* Fixes Column */}
            <h3 className="text-lg font-semibold mb-4">🐛 Bug Fixes</h3>
            <EntryList type="fixes" items={entries.fixes} />
            
            {/* Improvements Column */}
            <h3 className="text-lg font-semibold mb-4 mt-8">🚀 Improvements</h3>
            <EntryList type="improvements" items={entries.improvements} />
          </div>
        </div>
      </div>
      
      {/* Right content - Mock UI (conditionally rendered) */}
      {showMockUI && (
        <div className="w-[280px] bg-white/5 backdrop-blur-sm border-l border-white/10 p-6 flex flex-col">
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full">
              {/* Mock UI Elements */}
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-3 opacity-70">Set Global AI Rules</h3>
                <div className="bg-white/10 rounded-md p-3 mb-2">
                  <div className="h-3 w-3/4 bg-white/20 rounded mb-2"></div>
                  <div className="h-3 w-1/2 bg-white/20 rounded"></div>
                </div>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="w-full mt-2 bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white"
                >
                  Edit Rules
                </Button>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-3 opacity-70">Memory Settings</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs opacity-70">Auto-save memories</span>
                    <div className="h-4 w-8 rounded-full bg-white/30"></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs opacity-70">Use workspace memories</span>
                    <div className="h-4 w-8 rounded-full bg-white/30"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom tabs */}
          <div className="mt-4 border-t border-white/10 pt-4">
            <div className="flex space-x-2">
              <div className="px-3 py-1 rounded bg-white/20 text-xs font-medium">General</div>
              <div className="px-3 py-1 rounded text-xs font-medium opacity-60">Workspace</div>
              <div className="px-3 py-1 rounded text-xs font-medium opacity-60">Project</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
  
  // Controls for the editor
  const renderControls = () => (
    <>
      <FormSection title="Content">
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <div className="text-xs mb-1 block">Version</div>
              <Input
                value={version}
                onChange={(e) => setVersion(e.target.value)}
                className="h-8"
                placeholder="1.0.0"
              />
            </div>
            <div>
              <div className="text-xs mb-1 block">Title</div>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="h-8"
                placeholder="Product Name"
              />
            </div>
          </div>
          <div>
            <div className="text-xs mb-1 block">Subtitle</div>
            <Input
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="h-8"
              placeholder="Update description"
            />
          </div>
        </div>
      </FormSection>
    
      <FormSection title="Changelog Entries">
        <Tabs defaultValue="features" value={changelogType} onValueChange={setChangelogType}>
          <TabsList className="w-full">
            <TabsTrigger value="features" className="flex-1">Features</TabsTrigger>
            <TabsTrigger value="fixes" className="flex-1">Fixes</TabsTrigger>
            <TabsTrigger value="improvements" className="flex-1">Improvements</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="mt-2">
          {changelogType === 'features' && (
            <div className="flex items-center gap-2">
              <Input
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                placeholder="Add a new feature"
                className="h-8"
                onKeyDown={(e) => e.key === 'Enter' && handleAddEntry()}
              />
              <Button size="sm" variant="outline" onClick={handleAddEntry} className="h-8 px-2">
                <PlusCircle className="h-4 w-4" />
              </Button>
            </div>
          )}
          
          {changelogType === 'fixes' && (
            <div className="flex items-center gap-2">
              <Input
                value={newFix}
                onChange={(e) => setNewFix(e.target.value)}
                placeholder="Add a bug fix"
                className="h-8"
                onKeyDown={(e) => e.key === 'Enter' && handleAddEntry()}
              />
              <Button size="sm" variant="outline" onClick={handleAddEntry} className="h-8 px-2">
                <PlusCircle className="h-4 w-4" />
              </Button>
            </div>
          )}
          
          {changelogType === 'improvements' && (
            <div className="flex items-center gap-2">
              <Input
                value={newImprovement}
                onChange={(e) => setNewImprovement(e.target.value)}
                placeholder="Add an improvement"
                className="h-8"
                onKeyDown={(e) => e.key === 'Enter' && handleAddEntry()}
              />
              <Button size="sm" variant="outline" onClick={handleAddEntry} className="h-8 px-2">
                <PlusCircle className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
        
        <div className="mt-3">
          <Card className="p-3 bg-slate-50 dark:bg-slate-900 max-h-[200px] overflow-y-auto">
            {changelogType === 'features' && entries.features.length === 0 && (
              <p className="text-sm text-gray-500 text-center py-2">No features added yet</p>
            )}
            {changelogType === 'fixes' && entries.fixes.length === 0 && (
              <p className="text-sm text-gray-500 text-center py-2">No fixes added yet</p>
            )}
            {changelogType === 'improvements' && entries.improvements.length === 0 && (
              <p className="text-sm text-gray-500 text-center py-2">No improvements added yet</p>
            )}
            
            {changelogType === 'features' && (
              <div className="space-y-1">
                {entries.features.map((feature, index) => (
                  <div key={index} className="flex items-center justify-between group">
                    <span className="text-sm">{feature}</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleRemoveEntry('features', index)}
                      className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100"
                    >
                      ✕
                    </Button>
                  </div>
                ))}
              </div>
            )}
            
            {changelogType === 'fixes' && (
              <div className="space-y-1">
                {entries.fixes.map((fix, index) => (
                  <div key={index} className="flex items-center justify-between group">
                    <span className="text-sm">{fix}</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleRemoveEntry('fixes', index)}
                      className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100"
                    >
                      ✕
                    </Button>
                  </div>
                ))}
              </div>
            )}
            
            {changelogType === 'improvements' && (
              <div className="space-y-1">
                {entries.improvements.map((improvement, index) => (
                  <div key={index} className="flex items-center justify-between group">
                    <span className="text-sm">{improvement}</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleRemoveEntry('improvements', index)}
                      className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100"
                    >
                      ✕
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </FormSection>
      
      <FormSection title="Appearance">
        <div className="space-y-3">
          <ColorPicker 
            label="Gradient Start" 
            value={gradientStart} 
            onChange={setGradientStart} 
          />
          
          <ColorPicker 
            label="Gradient End" 
            value={gradientEnd} 
            onChange={setGradientEnd} 
          />
          
          <ColorPicker 
            label="Text Color" 
            value={textColor} 
            onChange={setTextColor} 
          />
          
          <SliderControl
            label="Border Radius"
            value={borderRadius}
            onChange={setBorderRadius}
            min={0}
            max={20}
            step={1}
          />
          
          <SwitchControl
            id="show-mock-ui"
            label="Show UI Preview"
            checked={showMockUI}
            onCheckedChange={setShowMockUI}
          />
        </div>
      </FormSection>
    </>
  );
  
  return (
    <EditorLayout
      onExport={handleExportImage}
      onCopy={handleCopyToClipboard}
      ControlPanel={renderControls()}
    >
      {renderChangelog()}
    </EditorLayout>
  );
};

export default ChangelogEditor;
