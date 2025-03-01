'use client';

import React from 'react';
import { CodeBlock } from '@/components/docs/CodeBlock';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import Link from 'next/link';

export default function StyleGuidePage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-medium mb-2 tracking-tight">Draftpen Style Guide</h1>
        <p className="text-lg text-muted-foreground font-light">
          A comprehensive guide to DraftPen&apos;s design system
        </p>
      </div>

      <div className="space-y-8">
        <section className="space-y-4">
          <h2 className="text-2xl font-medium tracking-tight">Introduction</h2>
          <p className="text-muted-foreground font-light">
            This style guide documents the design system used throughout DraftPen. It follows Apple&apos;s design principles
            of clarity, deference, and depth to create a clean, minimal, and professional user experience.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Design Tokens</CardTitle>
                <CardDescription>
                  Core design variables like colors, typography, spacing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Centralized design tokens ensure consistency across the application.
                </p>
                <Link href="/style-guide/design-tokens">
                  <Button variant="outline" size="sm">Explore Tokens</Button>
                </Link>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Components</CardTitle>
                <CardDescription>
                  Reusable UI components with examples
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Browse our library of UI components with interactive examples and code snippets.
                </p>
                <Link href="/style-guide/components">
                  <Button variant="outline" size="sm">View Components</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-medium tracking-tight">Apple-Inspired Design</h2>
          <p className="text-muted-foreground font-light">
            DraftPen follows Apple&apos;s design principles with these key characteristics:
          </p>
          
          <ul className="list-disc list-inside space-y-2 text-muted-foreground font-light ml-4">
            <li>Clean, minimal UI with reduced visual noise</li>
            <li>Thinner fonts (300 for body, 400 for buttons, 500 for headings)</li>
            <li>Subtle animations with Apple&apos;s cubic-bezier timing</li>
            <li>Translucent backdrops with blur effects</li>
            <li>Minimal shadows replaced with subtle borders</li>
          </ul>
          
          <div className="mt-6">
            <CodeBlock
              language="css"
              code={`/* Example of design tokens */
:root {
  /* Colors */
  --color-primary: #0071e3;
  --color-background: #f5f5f7;
  --color-text: #1d1d1f;
  
  /* Typography */
  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  
  /* Animations */
  --transition-standard: all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
}`}
            />
          </div>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-medium tracking-tight">Getting Started</h2>
          <p className="text-muted-foreground font-light">
            Use the sidebar navigation to explore different sections of the style guide. Each component
            includes interactive examples, code snippets, and usage guidelines.
          </p>
          
          <div className="flex flex-wrap gap-3 mt-4">
            <Link href="/style-guide/design-tokens/colors">
              <Button variant="outline" size="sm">Colors</Button>
            </Link>
            <Link href="/style-guide/design-tokens/typography">
              <Button variant="outline" size="sm">Typography</Button>
            </Link>
            <Link href="/style-guide/components/buttons">
              <Button variant="outline" size="sm">Buttons</Button>
            </Link>
            <Link href="/style-guide/components/cards">
              <Button variant="outline" size="sm">Cards</Button>
            </Link>
            <Link href="/style-guide/announcement-banners">
              <Button variant="outline" size="sm">Announcements</Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
