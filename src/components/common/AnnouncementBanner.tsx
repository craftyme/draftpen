'use client';

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

/**
 * AnnouncementBanner Component
 * 
 * A customizable banner for displaying important announcements across the application.
 * Features include customizable colors, optional icon, dismissible functionality,
 * and persistence through localStorage.
 */
interface AnnouncementBannerProps {
  /** The main message to display in the banner */
  message: string;
  /** Text for the optional link (defaults to 'Learn more') */
  linkText?: string;
  /** URL for the optional link */
  linkUrl?: string;
  /** Background color class (Tailwind) */
  backgroundColor?: string;
  /** Text color class (Tailwind) */
  textColor?: string;
  /** Optional icon to display before the message */
  icon?: React.ReactNode;
  /** Whether the banner can be dismissed (defaults to true) */
  dismissible?: boolean;
  /** localStorage key for saving dismissal state */
  storageKey?: string;
}

export default function AnnouncementBanner({
  message,
  linkText = 'Learn more',
  linkUrl = '#',
  backgroundColor = 'bg-black',
  textColor = 'text-white',
  icon,
  dismissible = true,
  storageKey = 'announcement-banner-dismissed'
}: AnnouncementBannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Only run on client-side to avoid hydration issues
    if (typeof window !== 'undefined') {
      // Check if the banner has been dismissed before
      const isDismissed = localStorage.getItem(storageKey) === 'true';
      setIsVisible(!isDismissed);
    }
  }, [storageKey]);
  
  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem(storageKey, 'true');
  };
  
  if (!isVisible) return null;
  
  return (
    <div 
      className={cn(
        'w-full py-2.5 px-4 text-center text-sm font-light relative z-50',
        backgroundColor,
        textColor
      )}
      role="alert"
      aria-live="polite"
    >
      <div className="container mx-auto flex items-center justify-center gap-1.5">
        {icon && <span className="inline-flex mr-1.5">{icon}</span>}
        <span>{message}</span>
        {linkText && linkUrl && (
          <>
            <span className="mx-1">·</span>
            <Link 
              href={linkUrl}
              className={cn(
                'underline underline-offset-2 hover:opacity-80 transition-opacity',
                textColor
              )}
            >
              {linkText} {linkUrl !== '#' && '›'}
            </Link>
          </>
        )}
      </div>
      
      {dismissible && (
        <button
          onClick={handleDismiss}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 opacity-70 hover:opacity-100 transition-opacity"
          aria-label="Dismiss announcement"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
