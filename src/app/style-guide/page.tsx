'use client';

import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

export default function StyleGuidePage() {
  return (
    <MainLayout activeTab="style-guide">
      <div className="max-w-5xl mx-auto py-8 px-4">
        <div className="mb-12">
          <h1 className="text-3xl font-medium mb-2 tracking-tight">Draftpen Style Guide</h1>
          <p className="text-lg text-muted-foreground font-light">
            A comprehensive guide to Draftpen&apos;s design system
          </p>
        </div>

        <Tabs defaultValue="typography">
          <TabsList className="mb-8">
            <TabsTrigger value="typography">Typography</TabsTrigger>
            <TabsTrigger value="colors">Colors</TabsTrigger>
            <TabsTrigger value="components">Components</TabsTrigger>
            <TabsTrigger value="spacing">Spacing</TabsTrigger>
          </TabsList>

          <TabsContent value="typography">
            <Card>
              <CardHeader>
                <CardTitle>Typography</CardTitle>
                <CardDescription>
                  Draftpen uses a clean, minimal text styling system with thinner fonts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-10">
                <div>
                  <h4 className="text-sm font-medium mb-4">Font Weights</h4>
                  <div className="space-y-4">
                    <div className="flex flex-col gap-1">
                      <p className="font-light">font-light (300) - Body text, paragraphs</p>
                      <p className="font-normal">font-normal (400) - Button text, UI elements</p>
                      <p className="font-medium">font-medium (500) - Headings, titles</p>
                      <p className="font-semibold">font-semibold (600) - Rarely used</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-4">Headings</h4>
                  <div className="space-y-4">
                    <h1 className="text-4xl font-medium tracking-tight">Heading 1 (text-4xl)</h1>
                    <h2 className="text-3xl font-medium tracking-tight">Heading 2 (text-3xl)</h2>
                    <h3 className="text-2xl font-medium tracking-tight">Heading 3 (text-2xl)</h3>
                    <h4 className="text-xl font-medium tracking-tight">Heading 4 (text-xl)</h4>
                    <h5 className="text-lg font-medium tracking-tight">Heading 5 (text-lg)</h5>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-4">Body Text</h4>
                  <div className="space-y-4">
                    <p className="text-lg font-light">Large text (text-lg)</p>
                    <p className="text-base font-light">Base text (text-base)</p>
                    <p className="text-sm font-light">Small text (text-sm)</p>
                    <p className="text-xs font-light">Extra small text (text-xs)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="colors">
            <Card>
              <CardHeader>
                <CardTitle>Color Palette</CardTitle>
                <CardDescription>
                  Apple-inspired colors for a clean, professional look
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div>
                  <h4 className="text-sm font-medium mb-4">Primary Colors</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex flex-col">
                      <div className="w-full h-24 rounded-md bg-[#0071e3]"></div>
                      <p className="text-sm mt-2">Primary Blue</p>
                      <code className="text-xs">#0071e3</code>
                    </div>
                    <div className="flex flex-col">
                      <div className="w-full h-24 rounded-md bg-[#f5f5f7]"></div>
                      <p className="text-sm mt-2">Light Gray</p>
                      <code className="text-xs">#f5f5f7</code>
                    </div>
                    <div className="flex flex-col">
                      <div className="w-full h-24 rounded-md bg-[#1d1d1f]"></div>
                      <p className="text-sm mt-2">Dark Gray</p>
                      <code className="text-xs">#1d1d1f</code>
                    </div>
                    <div className="flex flex-col">
                      <div className="w-full h-24 rounded-md bg-[#86868b]"></div>
                      <p className="text-sm mt-2">Text Gray</p>
                      <code className="text-xs">#86868b</code>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-4">UI Colors</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex flex-col">
                      <div className="w-full h-12 rounded-md bg-background border"></div>
                      <p className="text-sm mt-2">Background</p>
                      <code className="text-xs">bg-background</code>
                    </div>
                    <div className="flex flex-col">
                      <div className="w-full h-12 rounded-md bg-foreground"></div>
                      <p className="text-sm mt-2">Foreground</p>
                      <code className="text-xs">bg-foreground</code>
                    </div>
                    <div className="flex flex-col">
                      <div className="w-full h-12 rounded-md bg-card border"></div>
                      <p className="text-sm mt-2">Card</p>
                      <code className="text-xs">bg-card</code>
                    </div>
                    <div className="flex flex-col">
                      <div className="w-full h-12 rounded-md bg-muted"></div>
                      <p className="text-sm mt-2">Muted</p>
                      <code className="text-xs">bg-muted</code>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="components">
            <Card>
              <CardHeader>
                <CardTitle>Components</CardTitle>
                <CardDescription>
                  Reusable UI components with Apple-inspired styling
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-10">
                <div>
                  <h4 className="text-sm font-medium mb-4">Buttons</h4>
                  <div className="flex flex-wrap gap-4">
                    <div className="space-y-2">
                      <Button>Default Button</Button>
                      <p className="text-xs">Default</p>
                    </div>
                    <div className="space-y-2">
                      <Button variant="secondary">Secondary</Button>
                      <p className="text-xs">Secondary</p>
                    </div>
                    <div className="space-y-2">
                      <Button variant="outline">Outline</Button>
                      <p className="text-xs">Outline</p>
                    </div>
                    <div className="space-y-2">
                      <Button variant="ghost">Ghost</Button>
                      <p className="text-xs">Ghost</p>
                    </div>
                    <div className="space-y-2">
                      <Button variant="link">Link</Button>
                      <p className="text-xs">Link</p>
                    </div>
                    <div className="space-y-2">
                      <Button variant="destructive">Destructive</Button>
                      <p className="text-xs">Destructive</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-4">Button Sizes</h4>
                  <div className="flex flex-wrap gap-4 items-center">
                    <div className="space-y-2">
                      <Button size="sm">Small</Button>
                      <p className="text-xs">Small</p>
                    </div>
                    <div className="space-y-2">
                      <Button>Default</Button>
                      <p className="text-xs">Default</p>
                    </div>
                    <div className="space-y-2">
                      <Button size="lg">Large</Button>
                      <p className="text-xs">Large</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-4">Interaction States</h4>
                  <div className="flex flex-wrap gap-4 items-center">
                    <div className="space-y-2">
                      <Button className="hover:no-underline">Hover me</Button>
                      <p className="text-xs">Hover State</p>
                    </div>
                    <div className="space-y-2">
                      <Button disabled>Disabled</Button>
                      <p className="text-xs">Disabled</p>
                    </div>
                    <div className="space-y-2">
                      <a href="#" className="text-primary hover:underline">Link Style</a>
                      <p className="text-xs">Link Hover</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm font-light mb-2">Cursor Styles:</p>
                    <ul className="list-disc pl-5 text-sm font-light">
                      <li>All clickable elements display a hand cursor (pointer)</li>
                      <li>Disabled elements display the default cursor</li>
                      <li>Text inputs display the text cursor</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-4">Cards</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Card Title</CardTitle>
                        <CardDescription>Card description with lighter text</CardDescription>
                      </CardHeader>
                      <CardContent>
                        Card content with font-light for a clean, minimal look.
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Interactive Card</CardTitle>
                        <CardDescription>With interactive elements inside</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button className="w-full mt-2">Action Button</Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-4">Badges</h4>
                  <div className="flex flex-wrap gap-4">
                    <div className="space-y-2">
                      <Badge>Default</Badge>
                      <p className="text-xs">Default</p>
                    </div>
                    <div className="space-y-2">
                      <Badge variant="secondary">Secondary</Badge>
                      <p className="text-xs">Secondary</p>
                    </div>
                    <div className="space-y-2">
                      <Badge variant="outline">Outline</Badge>
                      <p className="text-xs">Outline</p>
                    </div>
                    <div className="space-y-2">
                      <Badge variant="destructive">Destructive</Badge>
                      <p className="text-xs">Destructive</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-4">Form Elements</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm mb-2">Input</p>
                      <Input placeholder="Type here..." />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-4">Tabs</h4>
                  <div className="space-y-6">
                    <div>
                      <p className="text-sm mb-2">Default Tabs</p>
                      <Tabs defaultValue="tab1" className="w-full">
                        <TabsList>
                          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                          <TabsTrigger value="tab3">Tab 3</TabsTrigger>
                        </TabsList>
                        <TabsContent value="tab1" className="p-4 mt-2 border rounded-md">
                          Tab 1 content
                        </TabsContent>
                        <TabsContent value="tab2" className="p-4 mt-2 border rounded-md">
                          Tab 2 content
                        </TabsContent>
                        <TabsContent value="tab3" className="p-4 mt-2 border rounded-md">
                          Tab 3 content
                        </TabsContent>
                      </Tabs>
                    </div>
                    
                    <div>
                      <p className="text-sm mb-2">Secondary Navigation Tabs</p>
                      <div className="border-b">
                        <Tabs defaultValue="tab1" className="w-auto">
                          <TabsList className="h-8 bg-transparent p-1 rounded-lg">
                            <TabsTrigger value="tab1" className="h-6 rounded transition-all text-xs px-3 py-1">
                              First Tab
                            </TabsTrigger>
                            <TabsTrigger value="tab2" className="h-6 rounded transition-all text-xs px-3 py-1">
                              Second Tab
                            </TabsTrigger>
                            <TabsTrigger value="tab3" className="h-6 rounded transition-all text-xs px-3 py-1">
                              Third Tab
                            </TabsTrigger>
                          </TabsList>
                        </Tabs>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="spacing">
            <Card>
              <CardHeader>
                <CardTitle>Spacing System</CardTitle>
                <CardDescription>
                  Consistent spacing using Tailwind&apos;s scale
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div>
                  <h4 className="text-sm font-medium mb-4">Spacing Scale</h4>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-4 h-4 bg-[#0071e3]"></div>
                      <p className="text-sm">1 (0.25rem - 4px)</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-6 h-6 bg-[#0071e3]"></div>
                      <p className="text-sm">1.5 (0.375rem - 6px)</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-[#0071e3]"></div>
                      <p className="text-sm">2 (0.5rem - 8px)</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#0071e3]"></div>
                      <p className="text-sm">3 (0.75rem - 12px)</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-[#0071e3]"></div>
                      <p className="text-sm">4 (1rem - 16px)</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-24 h-24 bg-[#0071e3]"></div>
                      <p className="text-sm">6 (1.5rem - 24px)</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-4">Layout Guidelines</h4>
                  <div className="space-y-2 font-light">
                    <p>• Card padding: p-6 (1.5rem - 24px)</p>
                    <p>• Default gap between elements: gap-4 (1rem - 16px)</p>
                    <p>• Button padding: px-4 py-2 (1rem × 0.5rem)</p>
                    <p>• Section spacing: my-8 (2rem - 32px)</p>
                    <p>• Container padding: px-4 (1rem - 16px)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
