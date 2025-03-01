'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CodeBlock } from '@/components/docs/CodeBlock';

export default function TypographyPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-medium mb-2 tracking-tight">Typography</h1>
        <p className="text-lg text-muted-foreground font-light">
          Typography system and text styles used throughout DraftPen
        </p>
      </div>

      <div className="space-y-10">
        <section>
          <h2 className="text-2xl font-medium tracking-tight mb-4">Font Family</h2>
          <p className="text-muted-foreground font-light mb-6">
            DraftPen uses the system font stack to match the native look and feel of each platform
          </p>
          
          <Card>
            <CardContent className="p-6">
              <CodeBlock
                language="css"
                code={`/* System font stack in design-tokens.css */
:root {
  --font-family-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, 
    "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", 
    "Segoe UI Emoji", "Segoe UI Symbol";
  --font-family-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, 
    Consolas, "Liberation Mono", "Courier New", monospace;
}

/* Usage */
body {
  font-family: var(--font-family-sans);
}

code, pre {
  font-family: var(--font-family-mono);
}`}
                preview={
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <p className="text-base">
                        This text uses the system sans-serif font
                      </p>
                      <p className="text-sm font-light text-muted-foreground">
                        It automatically adapts to the user&apos;s operating system
                      </p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-md">
                      <code className="text-sm">
                        This text uses the system monospace font
                      </code>
                    </div>
                  </div>
                }
              />
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-medium tracking-tight mb-4">Font Sizes</h2>
          <p className="text-muted-foreground font-light mb-6">
            A consistent type scale for all text elements
          </p>
          
          <Card>
            <CardContent className="p-6">
              <CodeBlock
                language="css"
                code={`/* Font size variables in design-tokens.css */
:root {
  --font-size-xs: 0.75rem;    /* 12px */
  --font-size-sm: 0.875rem;   /* 14px */
  --font-size-base: 1rem;     /* 16px */
  --font-size-lg: 1.125rem;   /* 18px */
  --font-size-xl: 1.25rem;    /* 20px */
  --font-size-2xl: 1.5rem;    /* 24px */
  --font-size-3xl: 1.875rem;  /* 30px */
  --font-size-4xl: 2.25rem;   /* 36px */
  --font-size-5xl: 3rem;      /* 48px */
}

/* Usage with Tailwind classes */
.text-xs { font-size: var(--font-size-xs); }
.text-sm { font-size: var(--font-size-sm); }
.text-base { font-size: var(--font-size-base); }
.text-lg { font-size: var(--font-size-lg); }
.text-xl { font-size: var(--font-size-xl); }
.text-2xl { font-size: var(--font-size-2xl); }
.text-3xl { font-size: var(--font-size-3xl); }
.text-4xl { font-size: var(--font-size-4xl); }
.text-5xl { font-size: var(--font-size-5xl); }`}
                preview={
                  <div className="space-y-3">
                    <p className="text-xs">Extra Small (12px) - For fine print, captions</p>
                    <p className="text-sm">Small (14px) - For secondary text, labels</p>
                    <p className="text-base">Base (16px) - For body text, default size</p>
                    <p className="text-lg">Large (18px) - For emphasized body text</p>
                    <p className="text-xl">Extra Large (20px) - For subheadings</p>
                    <p className="text-2xl">2XL (24px) - For section headings</p>
                    <p className="text-3xl">3XL (30px) - For page headings</p>
                    <p className="text-4xl">4XL (36px) - For major headings</p>
                    <p className="text-5xl">5XL (48px) - For hero text</p>
                  </div>
                }
              />
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-medium tracking-tight mb-4">Font Weights</h2>
          <p className="text-muted-foreground font-light mb-6">
            Apple-inspired font weights for different text elements
          </p>
          
          <Card>
            <CardContent className="p-6">
              <CodeBlock
                language="css"
                code={`/* Font weight variables in design-tokens.css */
:root {
  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
}

/* Usage with Tailwind classes */
.font-light { font-weight: var(--font-weight-light); }
.font-normal { font-weight: var(--font-weight-normal); }
.font-medium { font-weight: var(--font-weight-medium); }
.font-semibold { font-weight: var(--font-weight-semibold); }
.font-bold { font-weight: var(--font-weight-bold); }`}
                preview={
                  <div className="space-y-3">
                    <p className="text-lg font-light">Light (300) - For body text, following Apple&apos;s thin aesthetic</p>
                    <p className="text-lg font-normal">Normal (400) - For buttons and interactive elements</p>
                    <p className="text-lg font-medium">Medium (500) - For headings and emphasis</p>
                    <p className="text-lg font-semibold">Semibold (600) - For strong emphasis</p>
                    <p className="text-lg font-bold">Bold (700) - For very strong emphasis, used sparingly</p>
                  </div>
                }
              />
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-medium tracking-tight mb-4">Line Heights</h2>
          <p className="text-muted-foreground font-light mb-6">
            Consistent line heights for optimal readability
          </p>
          
          <Card>
            <CardContent className="p-6">
              <CodeBlock
                language="css"
                code={`/* Line height variables in design-tokens.css */
:root {
  --line-height-none: 1;      /* No line height */
  --line-height-tight: 1.25;  /* Tight */
  --line-height-snug: 1.375;  /* Snug */
  --line-height-normal: 1.5;  /* Normal */
  --line-height-relaxed: 1.625; /* Relaxed */
  --line-height-loose: 2;     /* Loose */
}

/* Usage with Tailwind classes */
.leading-none { line-height: var(--line-height-none); }
.leading-tight { line-height: var(--line-height-tight); }
.leading-snug { line-height: var(--line-height-snug); }
.leading-normal { line-height: var(--line-height-normal); }
.leading-relaxed { line-height: var(--line-height-relaxed); }
.leading-loose { line-height: var(--line-height-loose); }`}
                preview={
                  <div className="space-y-6">
                    <div className="p-3 border rounded-md">
                      <p className="leading-none mb-4">
                        Line height: none (1) - This text has no additional line height, making it very compact but potentially harder to read in longer paragraphs.
                      </p>
                      <p className="leading-tight mb-4">
                        Line height: tight (1.25) - This text has tight line spacing, good for headings and short text blocks where space is at a premium.
                      </p>
                      <p className="leading-normal mb-4">
                        Line height: normal (1.5) - This text has standard line spacing, providing good readability for body text and longer paragraphs. This is the default for most text in the application.
                      </p>
                      <p className="leading-loose">
                        Line height: loose (2) - This text has generous line spacing, which can improve readability for dense content or for users who need more visual separation between lines.
                      </p>
                    </div>
                  </div>
                }
              />
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-medium tracking-tight mb-4">Letter Spacing</h2>
          <p className="text-muted-foreground font-light mb-6">
            Letter spacing (tracking) for improved readability
          </p>
          
          <Card>
            <CardContent className="p-6">
              <CodeBlock
                language="css"
                code={`/* Letter spacing variables in design-tokens.css */
:root {
  --letter-spacing-tighter: -0.05em;
  --letter-spacing-tight: -0.025em;
  --letter-spacing-normal: 0em;
  --letter-spacing-wide: 0.025em;
  --letter-spacing-wider: 0.05em;
  --letter-spacing-widest: 0.1em;
}

/* Usage with Tailwind classes */
.tracking-tighter { letter-spacing: var(--letter-spacing-tighter); }
.tracking-tight { letter-spacing: var(--letter-spacing-tight); }
.tracking-normal { letter-spacing: var(--letter-spacing-normal); }
.tracking-wide { letter-spacing: var(--letter-spacing-wide); }
.tracking-wider { letter-spacing: var(--letter-spacing-wider); }
.tracking-widest { letter-spacing: var(--letter-spacing-widest); }`}
                preview={
                  <div className="space-y-3">
                    <p className="text-lg tracking-tighter">Tighter (-0.05em) - Compact text for headlines</p>
                    <p className="text-lg tracking-tight">Tight (-0.025em) - Slightly compact text</p>
                    <p className="text-lg tracking-normal">Normal (0em) - Default letter spacing</p>
                    <p className="text-lg tracking-wide">Wide (0.025em) - Slightly expanded text</p>
                    <p className="text-lg tracking-wider">Wider (0.05em) - Expanded text for emphasis</p>
                    <p className="text-lg tracking-widest">Widest (0.1em) - Very expanded text for special cases</p>
                  </div>
                }
              />
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-medium tracking-tight mb-4">Text Styles</h2>
          <p className="text-muted-foreground font-light mb-6">
            Common text style combinations used throughout the application
          </p>
          
          <Card>
            <CardContent className="p-6">
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-medium mb-3">Headings</h3>
                  <div className="space-y-4 border rounded-md p-6">
                    <h1 className="text-3xl font-medium tracking-tight">Page Heading (H1)</h1>
                    <h2 className="text-2xl font-medium tracking-tight">Section Heading (H2)</h2>
                    <h3 className="text-xl font-medium">Subsection Heading (H3)</h3>
                    <h4 className="text-lg font-medium">Component Heading (H4)</h4>
                    <h5 className="text-base font-medium">Minor Heading (H5)</h5>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium mb-3">Body Text</h3>
                  <div className="space-y-4 border rounded-md p-6">
                    <p className="text-lg text-muted-foreground font-light">
                      Large body text - Used for introductory paragraphs and important content.
                      The light weight (300) follows Apple&apos;s design aesthetic.
                    </p>
                    <p className="text-base text-muted-foreground font-light">
                      Standard body text - The default text style for most content in the application.
                      It uses a light weight for a clean, minimal look.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Small body text - Used for secondary information, captions, and helper text.
                      It uses the normal weight (400) for better readability at small sizes.
                    </p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium mb-3">Interactive Text</h3>
                  <div className="space-y-4 border rounded-md p-6">
                    <button className="text-primary font-normal hover:underline">Button Text</button>
                    <div className="text-sm font-normal text-muted-foreground">Label Text</div>
                    <div className="text-sm font-normal text-destructive">Error Message</div>
                    <div className="text-sm font-normal text-green-600">Success Message</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-medium tracking-tight mb-4">Usage Guidelines</h2>
          <p className="text-muted-foreground font-light mb-6">
            Best practices for using typography in the DraftPen interface
          </p>
          
          <Card>
            <CardContent className="p-6">
              <ul className="list-disc list-inside space-y-2 text-muted-foreground font-light ml-4">
                <li>Use lighter font weights (300) for most body text to achieve the Apple-inspired aesthetic</li>
                <li>Reserve medium weights (500) for headings and important UI elements</li>
                <li>Maintain a clear hierarchy with consistent heading sizes</li>
                <li>Use muted text colors for secondary information</li>
                <li>Ensure sufficient contrast between text and background colors</li>
                <li>Apply proper line height for optimal readability (1.5 for body text)</li>
                <li>Use letter spacing judiciously - tighter for headings, normal or slightly wider for body text</li>
                <li>Limit the number of font sizes on a single page to maintain visual harmony</li>
                <li>Consider responsive typography that scales appropriately on different devices</li>
              </ul>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
