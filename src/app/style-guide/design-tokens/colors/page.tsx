'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CodeBlock } from '@/components/docs/CodeBlock';

export default function ColorsPage() {
  // Apple-inspired color palette
  const coreColors = [
    { name: 'Primary Blue', value: '#0071e3', variable: '--color-primary' },
    { name: 'Light Gray', value: '#f5f5f7', variable: '--color-background' },
    { name: 'Dark Gray', value: '#1d1d1f', variable: '--color-text' },
    { name: 'Medium Gray', value: '#86868b', variable: '--color-muted' },
    { name: 'Success Green', value: '#28cd41', variable: '--color-success' },
    { name: 'Warning Orange', value: '#ff9f0a', variable: '--color-warning' },
    { name: 'Destructive Red', value: '#ff3b30', variable: '--color-destructive' },
  ];

  const semanticColors = [
    { name: 'Background', value: 'var(--color-background)', description: 'Page backgrounds' },
    { name: 'Foreground', value: 'var(--color-text)', description: 'Primary text color' },
    { name: 'Muted', value: 'var(--color-muted)', description: 'Secondary text, borders' },
    { name: 'Muted Background', value: 'rgba(0,0,0,0.03)', description: 'Subtle backgrounds' },
    { name: 'Primary', value: 'var(--color-primary)', description: 'Buttons, links, accents' },
    { name: 'Primary Foreground', value: 'white', description: 'Text on primary color' },
    { name: 'Destructive', value: 'var(--color-destructive)', description: 'Error states, delete actions' },
    { name: 'Success', value: 'var(--color-success)', description: 'Success states, confirmations' },
    { name: 'Warning', value: 'var(--color-warning)', description: 'Warning states, alerts' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-medium mb-2 tracking-tight">Colors</h1>
        <p className="text-lg text-muted-foreground font-light">
          Color palette and semantic color tokens used throughout DraftPen
        </p>
      </div>

      <div className="space-y-10">
        <section>
          <h2 className="text-2xl font-medium tracking-tight mb-4">Core Color Palette</h2>
          <p className="text-muted-foreground font-light mb-6">
            Apple-inspired base colors that form the foundation of the design system
          </p>
          
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {coreColors.map((color) => (
                  <div key={color.name} className="flex items-center space-x-4">
                    <div 
                      className="w-16 h-16 rounded-md border" 
                      style={{ backgroundColor: color.value }}
                    />
                    <div>
                      <p className="font-medium">{color.name}</p>
                      <p className="text-sm text-muted-foreground">{color.value}</p>
                      <p className="text-sm font-mono">{color.variable}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-medium tracking-tight mb-4">Semantic Colors</h2>
          <p className="text-muted-foreground font-light mb-6">
            Functional color tokens that map to specific UI purposes
          </p>
          
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {semanticColors.map((color) => (
                  <div key={color.name} className="flex items-center space-x-4">
                    <div 
                      className="w-16 h-16 rounded-md border" 
                      style={{ 
                        backgroundColor: color.value.startsWith('var') ? 
                          `rgb(var(${color.value.replace('var(', '').replace(')', '')}))` : 
                          color.value 
                      }}
                    />
                    <div className="flex-1">
                      <p className="font-medium">{color.name}</p>
                      <p className="text-sm text-muted-foreground">{color.description}</p>
                      <p className="text-sm font-mono">{color.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-medium tracking-tight mb-4">Color Variables</h2>
          <p className="text-muted-foreground font-light mb-6">
            CSS custom properties defined in design-tokens.css
          </p>
          
          <Card>
            <CardContent className="p-6">
              <CodeBlock
                language="css"
                code={`:root {
  /* Core colors */
  --color-primary: #0071e3;
  --color-background: #f5f5f7;
  --color-text: #1d1d1f;
  --color-muted: #86868b;
  --color-success: #28cd41;
  --color-warning: #ff9f0a;
  --color-destructive: #ff3b30;
  
  /* Semantic mappings */
  --background: var(--color-background);
  --foreground: var(--color-text);
  --muted: var(--color-muted);
  --muted-foreground: var(--color-muted);
  --muted-background: rgba(0,0,0,0.03);
  --primary: var(--color-primary);
  --primary-foreground: white;
  --destructive: var(--color-destructive);
  --destructive-foreground: white;
  --success: var(--color-success);
  --success-foreground: white;
  --warning: var(--color-warning);
  --warning-foreground: var(--color-text);
  
  /* Dark mode overrides would be defined here */
}`}
              />
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-medium tracking-tight mb-4">Usage Guidelines</h2>
          <p className="text-muted-foreground font-light mb-6">
            Best practices for using colors in the DraftPen interface
          </p>
          
          <Card>
            <CardContent className="p-6">
              <ul className="list-disc list-inside space-y-2 text-muted-foreground font-light ml-4">
                <li>Always use semantic color tokens instead of hard-coded values</li>
                <li>Use the primary blue sparingly for important actions and focus states</li>
                <li>Maintain sufficient contrast ratios between text and background colors (minimum 4.5:1)</li>
                <li>Use light grays for backgrounds and subtle UI elements</li>
                <li>Reserve destructive red for critical actions like deletion</li>
                <li>Use success green for confirmation and completion states</li>
                <li>Use warning orange for alerting users to potential issues</li>
                <li>Apply colors consistently across similar UI elements</li>
                <li>Consider color blindness and accessibility when designing interfaces</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-medium tracking-tight mb-4">Examples</h2>
          <p className="text-muted-foreground font-light mb-6">
            Examples of color usage in common UI components
          </p>
          
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Buttons</h3>
                  <div className="flex flex-wrap gap-3">
                    <button className="px-4 py-2 bg-primary text-white rounded-md">Primary Button</button>
                    <button className="px-4 py-2 bg-muted/20 text-foreground rounded-md border">Secondary Button</button>
                    <button className="px-4 py-2 bg-destructive text-white rounded-md">Destructive Button</button>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Text</h3>
                  <div className="space-y-2">
                    <p className="text-foreground">Primary text - high contrast for readability</p>
                    <p className="text-muted-foreground">Secondary text - lower contrast for less important content</p>
                    <p className="text-primary">Accent text - for links and emphasized content</p>
                    <p className="text-destructive">Error text - for error messages and warnings</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Backgrounds</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="p-4 bg-background border rounded-md">Default background</div>
                    <div className="p-4 bg-muted/10 border rounded-md">Muted background</div>
                    <div className="p-4 bg-primary/10 border rounded-md">Primary tint background</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
