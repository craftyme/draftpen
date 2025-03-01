'use client';

import React from 'react';
import AnnouncementBanner from '@/components/common/AnnouncementBanner';
import { announcementConfig } from '@/lib/announcement-config';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, Gift, Download, Clock } from 'lucide-react';
import { CodeBlock } from '@/components/docs/CodeBlock';

export default function AnnouncementBannersPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-medium mb-2 tracking-tight">Announcement Banners</h1>
        <p className="text-lg text-muted-foreground font-light">
          Customizable announcement banners for displaying important messages to users
        </p>
      </div>

      <div className="space-y-10">
        <section>
          <h2 className="text-2xl font-medium tracking-tight mb-4">Current Live Banner</h2>
          <p className="text-muted-foreground font-light mb-6">
            The banner currently displayed across the application
          </p>
          
          <Card>
            <CardContent className="p-6">
              <CodeBlock
                language="tsx"
                code={`// Configuration in /src/lib/announcement-config.ts
export const announcementConfig = {
  message: "${announcementConfig.message}",
  linkText: "${announcementConfig.linkText}",
  linkUrl: "${announcementConfig.linkUrl}",
  backgroundColor: "${announcementConfig.backgroundColor}",
  textColor: "${announcementConfig.textColor}",
  icon: Download,  // Lucide icon component
  dismissible: false,
};

// Usage in MainLayout.tsx
import AnnouncementBanner from '@/components/common/AnnouncementBanner';
import { announcementConfig } from '@/lib/announcement-config';

<AnnouncementBanner 
  message={announcementConfig.message}
  linkText={announcementConfig.linkText}
  linkUrl={announcementConfig.linkUrl}
  backgroundColor={announcementConfig.backgroundColor}
  textColor={announcementConfig.textColor}
  icon={announcementConfig.icon && <announcementConfig.icon size={16} />}
  dismissible={announcementConfig.dismissible}
/>`}
                preview={
                  <div className="w-full">
                    <AnnouncementBanner 
                      message={announcementConfig.message}
                      linkText={announcementConfig.linkText}
                      linkUrl={announcementConfig.linkUrl}
                      backgroundColor={announcementConfig.backgroundColor}
                      textColor={announcementConfig.textColor}
                      icon={announcementConfig.icon && <announcementConfig.icon size={16} />}
                      dismissible={false}
                    />
                  </div>
                }
              />
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-medium tracking-tight mb-4">Component API</h2>
          <p className="text-muted-foreground font-light mb-6">
            The AnnouncementBanner component accepts the following props:
          </p>
          
          <Card>
            <CardContent className="p-6">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-4 font-medium">Prop</th>
                    <th className="text-left py-2 px-4 font-medium">Type</th>
                    <th className="text-left py-2 px-4 font-medium">Default</th>
                    <th className="text-left py-2 px-4 font-medium">Description</th>
                  </tr>
                </thead>
                <tbody className="font-light">
                  <tr className="border-b">
                    <td className="py-2 px-4"><code>message</code></td>
                    <td className="py-2 px-4"><code>string</code></td>
                    <td className="py-2 px-4">Required</td>
                    <td className="py-2 px-4">The announcement message to display</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4"><code>linkText</code></td>
                    <td className="py-2 px-4"><code>string</code></td>
                    <td className="py-2 px-4">Optional</td>
                    <td className="py-2 px-4">Text for the call-to-action link</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4"><code>linkUrl</code></td>
                    <td className="py-2 px-4"><code>string</code></td>
                    <td className="py-2 px-4">Optional</td>
                    <td className="py-2 px-4">URL for the call-to-action link</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4"><code>backgroundColor</code></td>
                    <td className="py-2 px-4"><code>string</code></td>
                    <td className="py-2 px-4"><code>bg-blue-600</code></td>
                    <td className="py-2 px-4">Tailwind background color class</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4"><code>textColor</code></td>
                    <td className="py-2 px-4"><code>string</code></td>
                    <td className="py-2 px-4"><code>text-white</code></td>
                    <td className="py-2 px-4">Tailwind text color class</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4"><code>icon</code></td>
                    <td className="py-2 px-4"><code>ReactNode</code></td>
                    <td className="py-2 px-4">Optional</td>
                    <td className="py-2 px-4">Icon to display next to the message</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4"><code>dismissible</code></td>
                    <td className="py-2 px-4"><code>boolean</code></td>
                    <td className="py-2 px-4"><code>false</code></td>
                    <td className="py-2 px-4">Whether the banner can be dismissed</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4"><code>storageKey</code></td>
                    <td className="py-2 px-4"><code>string</code></td>
                    <td className="py-2 px-4"><code>announcement-dismissed</code></td>
                    <td className="py-2 px-4">localStorage key for dismissal state</td>
                  </tr>
                </tbody>
              </table>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-medium tracking-tight mb-4">Examples</h2>
          <p className="text-muted-foreground font-light mb-6">
            Various examples of announcement banners for different use cases
          </p>
          
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Feature Announcement</CardTitle>
                <CardDescription>Announcing a new feature or tool</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <CodeBlock
                  language="tsx"
                  code={`<AnnouncementBanner 
  message="New PDF conversion tools are now available!"
  linkText="Try them now"
  linkUrl="/pdf-tools"
  backgroundColor="bg-blue-600"
  textColor="text-white"
  icon={<Download size={16} />}
  dismissible={false}
/>`}
                  preview={
                    <div className="w-full">
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
                  }
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Promotional Banner</CardTitle>
                <CardDescription>Special offers and promotions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <CodeBlock
                  language="tsx"
                  code={`<AnnouncementBanner 
  message="Limited time offer: Upgrade to DraftPen Pro for 50% off."
  linkText="Get the deal"
  linkUrl="#"
  backgroundColor="bg-green-600"
  textColor="text-white"
  icon={<Gift size={16} />}
  dismissible={false}
/>`}
                  preview={
                    <div className="w-full">
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
                  }
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Alert Banner</CardTitle>
                <CardDescription>Important alerts and notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <CodeBlock
                  language="tsx"
                  code={`<AnnouncementBanner 
  message="Scheduled maintenance on March 5th, 2025. Some features may be unavailable."
  linkText="More details"
  linkUrl="#"
  backgroundColor="bg-amber-500"
  textColor="text-black"
  icon={<Clock size={16} />}
  dismissible={false}
/>`}
                  preview={
                    <div className="w-full">
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
                  }
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Dismissible Banner</CardTitle>
                <CardDescription>Banner that can be dismissed by the user</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <CodeBlock
                  language="tsx"
                  code={`<AnnouncementBanner 
  message="This is a dismissible announcement. Click the X to close it."
  linkText="Learn how it works"
  linkUrl="#"
  backgroundColor="bg-gray-800"
  textColor="text-white"
  icon={<Bell size={16} />}
  dismissible={true}
  storageKey="demo-dismissible-banner"
/>`}
                  preview={
                    <div className="w-full">
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
                    </div>
                  }
                />
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
