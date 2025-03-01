'use client';

import React from 'react';
import AnnouncementBanner from '@/components/common/AnnouncementBanner';
import { announcementConfig } from '@/lib/announcement-config';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, Gift, Star, Download, Clock } from 'lucide-react';

export default function AnnouncementBannersPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-medium mb-6">Announcement Banners</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Customizable announcement banners for displaying important messages to users.
      </p>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Current Live Banner</CardTitle>
            <CardDescription>The banner currently displayed across the application</CardDescription>
          </CardHeader>
          <CardContent className="border rounded-md overflow-hidden">
            <AnnouncementBanner 
              message={announcementConfig.message}
              linkText={announcementConfig.linkText}
              linkUrl={announcementConfig.linkUrl}
              backgroundColor={announcementConfig.backgroundColor}
              textColor={announcementConfig.textColor}
              icon={announcementConfig.icon && <announcementConfig.icon size={16} />}
              dismissible={false}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>DraftPen Announcement Examples</CardTitle>
            <CardDescription>Examples of announcements relevant to DraftPen</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border rounded-md overflow-hidden">
              <AnnouncementBanner 
                message="New PDF conversion tools are now available!"
                linkText="Try them now"
                linkUrl="/pdf-tools"
                backgroundColor="bg-blue-600"
                textColor="text-white"
                icon={<Download size={16} />}
                dismissible={false}
              />
            </div>
            
            <div className="border rounded-md overflow-hidden">
              <AnnouncementBanner 
                message="Limited time offer: Upgrade to DraftPen Pro for 50% off."
                linkText="Get the deal"
                linkUrl="#"
                backgroundColor="bg-green-600"
                textColor="text-white"
                icon={<Gift size={16} />}
                dismissible={false}
              />
            </div>
            
            <div className="border rounded-md overflow-hidden">
              <AnnouncementBanner 
                message="Scheduled maintenance on March 5th, 2025. Some features may be unavailable."
                linkText="More details"
                linkUrl="#"
                backgroundColor="bg-amber-500"
                textColor="text-black"
                icon={<Clock size={16} />}
                dismissible={false}
              />
            </div>
            
            <div className="border rounded-md overflow-hidden">
              <AnnouncementBanner 
                message="DraftPen has been featured as Apple's App of the Day!"
                linkText="Read more"
                linkUrl="#"
                backgroundColor="bg-purple-600"
                textColor="text-white"
                icon={<Star size={16} />}
                dismissible={false}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Dismissible Banner</CardTitle>
            <CardDescription>Banner that can be dismissed by the user</CardDescription>
          </CardHeader>
          <CardContent className="border rounded-md overflow-hidden">
            <AnnouncementBanner 
              message="This is a dismissible announcement. Click the X to close it."
              linkText="Learn how it works"
              linkUrl="#"
              backgroundColor="bg-gray-800"
              textColor="text-white"
              icon={<Bell size={16} />}
              dismissible={true}
              storageKey="demo-dismissible-banner"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
