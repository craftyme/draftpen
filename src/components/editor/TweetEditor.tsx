import React, { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { exportAsImage, copyToClipboard } from '@/lib/utils/export';
import EditorLayout from '@/components/layout/EditorLayout';
import { BadgeCheck, Heart, MessageCircle, Repeat } from 'lucide-react';

const TweetEditor = () => {
  // State for tweet content and settings
  const [content, setContent] = useState('Just released Draftpen - a browser-based tool for creating and editing professional-quality visual assets, focusing on screenshot beautification, code snippets, and social proof generators.');
  const [name, setName] = useState('Tomas Laurinavicius');
  const [username, setUsername] = useState('tomaslaucom');
  const [isVerified, setIsVerified] = useState(true);
  const [likes, setLikes] = useState('42');
  const [retweets, setRetweets] = useState('12');
  const [replies, setReplies] = useState('5');
  const [date, setDate] = useState('6:30 PM · Feb 28, 2025');
  
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [padding, setPadding] = useState(24);
  const [borderRadius, setBorderRadius] = useState(12);
  const [fontSize, setFontSize] = useState(15);

  // Refs
  const exportRef = useRef<HTMLDivElement>(null);

  // Export functions
  const handleExport = () => {
    exportAsImage(exportRef.current, 'tweet.png');
  };

  const handleCopy = () => {
    copyToClipboard(exportRef.current)
      .then((success) => {
        if (success) {
          alert('Image copied to clipboard!');
        } else {
          alert('Failed to copy image. Please try downloading instead.');
        }
      });
  };

  // Theme styles
  const themeStyles = {
    bg: isDarkTheme ? '#15202b' : 'white',
    text: isDarkTheme ? 'white' : 'black',
    textSecondary: isDarkTheme ? '#8899a6' : '#536471',
    border: isDarkTheme ? '#38444d' : '#eff3f4',
  };

  // Canvas component
  const Canvas = () => (
    <div 
      ref={exportRef}
      style={{
        padding: `${padding}px`,
        backgroundColor: themeStyles.bg,
        borderRadius: `${borderRadius}px`,
        color: themeStyles.text,
        fontSize: `${fontSize}px`,
        maxWidth: '500px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      }}
    >
      <div className="flex items-start">
        <div 
          className="w-12 h-12 rounded-full mr-3 flex-shrink-0"
          style={{ 
            backgroundColor: isDarkTheme ? '#192734' : '#e1e8ed',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <span style={{ fontSize: '18px' }}>{name.charAt(0)}</span>
        </div>
        
        <div style={{ width: 'calc(100% - 60px)' }}>
          <div className="flex items-center">
            <span style={{ fontWeight: 'bold', marginRight: '4px' }}>{name}</span>
            {isVerified && (
              <BadgeCheck 
                size={16} 
                style={{ 
                  marginRight: '4px',
                  color: '#1d9bf0'
                }} 
              />
            )}
            <span 
              style={{ 
                color: themeStyles.textSecondary,
                marginRight: '4px'
              }}
            >
              @{username}
            </span>
          </div>
          
          <div style={{ marginTop: '4px', wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>
            {content}
          </div>
          
          <div 
            style={{ 
              marginTop: '12px',
              color: themeStyles.textSecondary,
              fontSize: `${fontSize - 1}px`
            }}
          >
            {date}
          </div>
          
          <div 
            style={{ 
              marginTop: '12px',
              paddingTop: '12px',
              borderTop: `1px solid ${themeStyles.border}`,
              display: 'flex'
            }}
          >
            <div 
              style={{ 
                display: 'flex',
                alignItems: 'center',
                marginRight: '16px'
              }}
            >
              <MessageCircle size={16} style={{ marginRight: '4px' }} /> {replies}
            </div>
            <div 
              style={{ 
                display: 'flex',
                alignItems: 'center',
                marginRight: '16px'
              }}
            >
              <Repeat size={16} style={{ marginRight: '4px' }} /> {retweets}
            </div>
            <div 
              style={{ 
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <Heart size={16} style={{ marginRight: '4px' }} /> {likes}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Controls component
  const Controls = () => (
    <>
      <Card className="p-4">
        <h3 className="text-lg font-medium mb-2">Tweet Content</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm block mb-1">Tweet Text</label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="h-24"
              placeholder="What's happening?"
              maxLength={280}
            />
            <div className="text-right text-sm text-gray-500 mt-1">
              {content.length}/280
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm block mb-1">Name</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Display Name"
              />
            </div>
            <div>
              <label className="text-sm block mb-1">Username</label>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username"
              />
            </div>
          </div>

          <div>
            <label className="text-sm block mb-1">Date</label>
            <Input
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="Time and Date"
            />
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-sm block mb-1">Likes</label>
              <Input
                value={likes}
                onChange={(e) => setLikes(e.target.value)}
                placeholder="Likes"
              />
            </div>
            <div>
              <label className="text-sm block mb-1">Retweets</label>
              <Input
                value={retweets}
                onChange={(e) => setRetweets(e.target.value)}
                placeholder="Retweets"
              />
            </div>
            <div>
              <label className="text-sm block mb-1">Replies</label>
              <Input
                value={replies}
                onChange={(e) => setReplies(e.target.value)}
                placeholder="Replies"
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <label className="text-sm">Verified Badge</label>
            <Switch
              checked={isVerified}
              onCheckedChange={setIsVerified}
            />
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="text-lg font-medium mb-2">Appearance</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm">Dark Theme</label>
            <Switch
              checked={isDarkTheme}
              onCheckedChange={setIsDarkTheme}
            />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm">Padding</label>
              <span className="text-sm">{padding}px</span>
            </div>
            <Slider 
              value={[padding]} 
              min={12} 
              max={48} 
              step={4}
              onValueChange={(value) => setPadding(value[0])} 
            />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm">Border Radius</label>
              <span className="text-sm">{borderRadius}px</span>
            </div>
            <Slider 
              value={[borderRadius]} 
              min={0} 
              max={24} 
              step={2}
              onValueChange={(value) => setBorderRadius(value[0])} 
            />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm">Font Size</label>
              <span className="text-sm">{fontSize}px</span>
            </div>
            <Slider 
              value={[fontSize]} 
              min={12} 
              max={24} 
              step={1}
              onValueChange={(value) => setFontSize(value[0])} 
            />
          </div>
        </div>
      </Card>
    </>
  );

  return (
    <EditorLayout
      onExport={handleExport}
      onCopy={handleCopy}
      ControlPanel={<Controls />}
    >
      <Canvas />
    </EditorLayout>
  );
};

export default TweetEditor;
