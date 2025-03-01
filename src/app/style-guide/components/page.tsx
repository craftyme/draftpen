'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function ComponentsIndexPage() {
  const components = [
    {
      name: 'Buttons',
      description: 'Button components with various styles and sizes',
      href: '/style-guide/components/buttons',
    },
    {
      name: 'Announcement Banners',
      description: 'Customizable announcement banners for displaying important messages',
      href: '/style-guide/announcement-banners',
    },
    {
      name: 'Vertical Example',
      description: 'Example of a vertical marquee component with tabbed code view',
      href: '/style-guide/components/vertical-example',
    },
    // Add more components as they are created
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-medium mb-2 tracking-tight">Components</h1>
        <p className="text-lg text-muted-foreground font-light">
          Reusable UI components for building DraftPen interfaces
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {components.map((component) => (
          <Card key={component.name} className="overflow-hidden">
            <CardHeader className="pb-3">
              <CardTitle>{component.name}</CardTitle>
              <CardDescription>{component.description}</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Link href={component.href}>
                <Button variant="outline" className="w-full justify-between group">
                  View Component
                  <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
