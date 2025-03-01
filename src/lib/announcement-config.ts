/**
 * Announcement Configuration
 * 
 * This file contains the configuration for the announcement banner.
 * Update this file to change the announcement message across the application.
 */

import { Sparkles } from 'lucide-react';

export const announcementConfig = {
  // Whether the announcement is enabled
  enabled: true,
  
  // The main message to display
  message: "New Image Tools are now available! Try our Meme Generator, Color Picker, and more.",
  
  // Link text and URL
  linkText: "Explore tools",
  linkUrl: "/image-tools",
  
  // Styling
  backgroundColor: "bg-black",
  textColor: "text-white",
  
  // Icon (set to null for no icon)
  icon: Sparkles,
  
  // Whether the announcement can be dismissed
  dismissible: true,
  
  // localStorage key for saving dismissal state
  // Change this key when you update the announcement to show it again to users who dismissed the previous one
  storageKey: "announcement-banner-2025-03-01"
};
