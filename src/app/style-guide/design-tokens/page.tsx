'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function DesignTokensIndexPage() {
  const tokenCategories = [
    {
      name: 'Colors',
      description: 'Color palette and semantic color tokens',
      href: '/style-guide/design-tokens/colors',
    },
    {
      name: 'Typography',
      description: 'Font families, sizes, weights, and text styles',
      href: '/style-guide/design-tokens/typography',
    },
    {
      name: 'Spacing',
      description: 'Margin, padding, and layout spacing values',
      href: '/style-guide/design-tokens/spacing',
    },
    {
      name: 'Borders & Shadows',
      description: 'Border widths, radii, and shadow definitions',
      href: '/style-guide/design-tokens/borders-shadows',
    },
    // Add more token categories as needed
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-medium mb-2 tracking-tight">Design Tokens</h1>
        <p className="text-lg text-muted-foreground font-light">
          Core design variables that define the visual language of DraftPen
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tokenCategories.map((category) => (
          <Card key={category.name} className="overflow-hidden">
            <CardHeader className="pb-3">
              <CardTitle>{category.name}</CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Link href={category.href}>
                <Button variant="outline" className="w-full justify-between group">
                  View Tokens
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
