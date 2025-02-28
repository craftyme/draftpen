'use client';

import React, { useState, useRef } from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { exportAsImage, copyToClipboard } from '@/lib/utils/export';
import SocialProofLayout from '@/components/layout/SocialProofLayout';
import { Star } from 'lucide-react';

/* eslint-disable @next/next/no-img-element */

const G2ReviewEditor = () => {
  // State for the review content
  const [title, setTitle] = useState('"We doubled our affiliate revenue in 4-5 months with Rewardful"');
  const [content, setContent] = useState('Rewardful is simple, cost-effective, and integrates seamlessly with Stripe, making it incredibly easy to manage affiliates and payouts. We transitioned from Impact to Rewardful, and it was the best decision for our affiliate program. Rewardful streamlined our operations with an intuitive interface and automation features. Both our team and affiliates can track performance effortlessly, reducing manual work and allowing us to focus on growth.');
  const [highlightedText, setHighlightedText] = useState('We transitioned from Impact to Rewardful, and it was the best decision for our affiliate program.');
  const [date, setDate] = useState('Feb 13, 2025');
  
  // State for the reviewer details
  const [reviewerName, setReviewerName] = useState('Marc Thomas');
  const [reviewerTitle, setReviewerTitle] = useState('Senior Growth Marketer at Podia');
  const [reviewerImage, setReviewerImage] = useState('');
  const [showReviewerImage, setShowReviewerImage] = useState(true);
  
  // State for the company details
  const [companyLogo, setCompanyLogo] = useState('');
  const [showCompanyLogo, setShowCompanyLogo] = useState(true);
  
  // State for styling
  const [backgroundColor, setBackgroundColor] = useState('#0A1A2A');
  const [textColor, setTextColor] = useState('#FFFFFF');
  const [highlightColor, setHighlightColor] = useState('#4A5E73');
  const [borderRadius, setBorderRadius] = useState(8);
  const [padding, setPadding] = useState(40);
  const [starRating, setStarRating] = useState(5);
  
  // Refs for export
  const exportContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  // Handle export
  const handleExport = () => {
    if (exportContainerRef.current) {
      exportAsImage(exportContainerRef.current, 'g2-review.png');
    }
  };

  // Handle copy to clipboard
  const handleCopy = () => {
    if (exportContainerRef.current) {
      copyToClipboard(exportContainerRef.current);
    }
  };

  // Handle reviewer image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setReviewerImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle company logo upload
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCompanyLogo(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Format content with highlighted text
  const formattedContent = () => {
    if (!highlightedText || !content.includes(highlightedText)) {
      return <div>{content}</div>;
    }
    
    const parts = content.split(highlightedText);
    return (
      <div>
        {parts[0]}
        <span className="px-1 py-0.5" style={{ backgroundColor: highlightColor }}>
          {highlightedText}
        </span>
        {parts[1]}
      </div>
    );
  };

  // Canvas content
  const canvasContent = (
    <div
      ref={exportContainerRef}
      className="shadow-md rounded-xl overflow-hidden mx-auto w-full max-w-2xl"
      style={{
        backgroundColor: backgroundColor,
        color: textColor,
        padding: `${padding}px`,
        borderRadius: `${borderRadius}px`,
      }}
    >
      {/* Review header */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              fill={i < starRating ? '#FF3E00' : 'none'}
              color={i < starRating ? '#FF3E00' : '#6B7280'}
              className="w-6 h-6 mr-1"
            />
          ))}
        </div>
        <div className="text-sm opacity-80">{date}</div>
        {showCompanyLogo && companyLogo && (
          <div className="ml-auto">
            <img 
              src={companyLogo} 
              alt="Company Logo" 
              className="h-12 w-auto"
              style={{ maxHeight: '48px' }}
            />
          </div>
        )}
      </div>

      {/* Review title */}
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      
      {/* Review content */}
      <div className="text-lg mb-6 leading-relaxed">{formattedContent()}</div>
      
      {/* Reviewer info */}
      <div className="flex items-center mt-8">
        {showReviewerImage && reviewerImage ? (
          <img 
            src={reviewerImage} 
            alt={reviewerName} 
            className="w-12 h-12 rounded-full mr-4 object-cover"
          />
        ) : (
          <div 
            className="w-12 h-12 rounded-full mr-4 flex items-center justify-center text-xl font-bold"
            style={{ backgroundColor: highlightColor }}
          >
            {reviewerName.charAt(0)}
          </div>
        )}
        <div>
          <div className="font-bold">{reviewerName}</div>
          <div className="text-sm opacity-80">{reviewerTitle}</div>
        </div>
      </div>
    </div>
  );

  // Controls content
  const controlsContent = (
    <>
      <div className="space-y-2">
        <h3 className="text-xs font-medium mb-2">Review Content</h3>
        <div className="space-y-2">
          <Label className="text-xs font-medium">Title</Label>
          <Textarea
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter review title..."
            className="text-sm min-h-[50px]"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-medium">Content</Label>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter review content..."
            className="text-sm min-h-[100px]"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-medium">Highlighted Text</Label>
          <Textarea
            value={highlightedText}
            onChange={(e) => setHighlightedText(e.target.value)}
            placeholder="Text to highlight (must be in content)..."
            className="text-sm min-h-[50px]"
          />
          <div className="flex items-center gap-2">
            <Label className="text-xs font-medium">Highlight Color</Label>
            <Input
              type="color"
              value={highlightColor}
              onChange={(e) => setHighlightColor(e.target.value)}
              className="w-6 h-6 p-0 border-0"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-medium">Date</Label>
          <Input
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="Review date..."
            className="text-sm"
          />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-xs font-medium mb-2">Reviewer Details</h3>
        <div className="space-y-2">
          <Label className="text-xs font-medium">Name</Label>
          <Input
            value={reviewerName}
            onChange={(e) => setReviewerName(e.target.value)}
            placeholder="Reviewer name..."
            className="text-sm"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-medium">Title & Company</Label>
          <Input
            value={reviewerTitle}
            onChange={(e) => setReviewerTitle(e.target.value)}
            placeholder="Reviewer title and company..."
            className="text-sm"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-xs font-medium">Profile Image</Label>
            <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => fileInputRef.current?.click()}>
              Upload
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="show-reviewer-image" className="text-xs font-medium">
              Show Profile Image
            </Label>
            <Switch
              id="show-reviewer-image"
              checked={showReviewerImage}
              onCheckedChange={setShowReviewerImage}
            />
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-xs font-medium">Company Logo</Label>
            <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => logoInputRef.current?.click()}>
              Upload
            </Button>
            <input
              ref={logoInputRef}
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="hidden"
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="show-company-logo" className="text-xs font-medium">
              Show Company Logo
            </Label>
            <Switch
              id="show-company-logo"
              checked={showCompanyLogo}
              onCheckedChange={setShowCompanyLogo}
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-xs font-medium mb-2">Rating</h3>
        <div className="flex items-center justify-between mb-1">
          <Label className="text-xs font-medium">Stars</Label>
          <span className="text-xs text-gray-500">{starRating}/5</span>
        </div>
        <Slider
          value={[starRating]}
          min={1}
          max={5}
          step={1}
          onValueChange={(value) => setStarRating(value[0])}
          className="my-1"
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-xs font-medium mb-2">Appearance</h3>
        <div className="flex items-center justify-between mb-1">
          <Label className="text-xs font-medium">Background Color</Label>
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
          <Label className="text-xs font-medium">Border Radius</Label>
          <span className="text-xs text-gray-500">{borderRadius}px</span>
        </div>
        <Slider
          value={[borderRadius]}
          min={0}
          max={24}
          step={1}
          onValueChange={(value) => setBorderRadius(value[0])}
          className="my-1"
        />
      </div>
    </>
  );

  const renderReview = () => canvasContent;
  const renderControls = () => controlsContent;

  return (
    <SocialProofLayout
      onExport={handleExport}
      onCopy={handleCopy}
      ControlPanel={renderControls()}
    >
      {renderReview()}
    </SocialProofLayout>
  );
};

export default G2ReviewEditor;
