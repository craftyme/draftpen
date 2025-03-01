'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CodeBlock } from '@/components/docs/CodeBlock';

export default function UtilitiesPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-medium mb-2 tracking-tight">Utility Classes</h1>
        <p className="text-lg text-muted-foreground font-light">
          Reusable utility classes for common styling patterns
        </p>
      </div>

      <div className="space-y-10">
        <section>
          <h2 className="text-2xl font-medium tracking-tight mb-4">Layout Utilities</h2>
          <p className="text-muted-foreground font-light mb-6">
            Helper classes for common layout patterns
          </p>
          
          <Card>
            <CardContent className="p-6">
              <CodeBlock
                language="html"
                code={`<!-- Flex container utilities -->
<div class="flex-container">...</div>
<div class="flex-row">...</div>
<div class="flex-col">...</div>
<div class="items-center">...</div>
<div class="justify-between">...</div>
<div class="gap-4">...</div>

<!-- Grid utilities -->
<div class="grid-container">...</div>
<div class="grid-cols-2">...</div>
<div class="grid-cols-3">...</div>
<div class="grid-gap-4">...</div>`}
                preview={
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 border rounded-md">
                      <div className="w-16 h-16 bg-muted rounded-md"></div>
                      <div className="w-16 h-16 bg-muted rounded-md"></div>
                      <div className="w-16 h-16 bg-muted rounded-md"></div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 p-4 border rounded-md">
                      <div className="h-16 bg-muted rounded-md"></div>
                      <div className="h-16 bg-muted rounded-md"></div>
                      <div className="h-16 bg-muted rounded-md"></div>
                    </div>
                  </div>
                }
              />
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-medium tracking-tight mb-4">Spacing Utilities</h2>
          <p className="text-muted-foreground font-light mb-6">
            Consistent spacing classes for margins and padding
          </p>
          
          <Card>
            <CardContent className="p-6">
              <CodeBlock
                language="html"
                code={`<!-- Margin utilities -->
<div class="m-0">No margin</div>
<div class="m-1">Extra small margin (0.25rem)</div>
<div class="m-2">Small margin (0.5rem)</div>
<div class="m-4">Medium margin (1rem)</div>
<div class="m-6">Large margin (1.5rem)</div>
<div class="m-8">Extra large margin (2rem)</div>

<!-- Padding utilities -->
<div class="p-0">No padding</div>
<div class="p-1">Extra small padding (0.25rem)</div>
<div class="p-2">Small padding (0.5rem)</div>
<div class="p-4">Medium padding (1rem)</div>
<div class="p-6">Large padding (1.5rem)</div>
<div class="p-8">Extra large padding (2rem)</div>

<!-- Directional spacing -->
<div class="mt-4">Margin top</div>
<div class="mr-4">Margin right</div>
<div class="mb-4">Margin bottom</div>
<div class="ml-4">Margin left</div>
<div class="mx-4">Horizontal margin</div>
<div class="my-4">Vertical margin</div>

<div class="pt-4">Padding top</div>
<div class="pr-4">Padding right</div>
<div class="pb-4">Padding bottom</div>
<div class="pl-4">Padding left</div>
<div class="px-4">Horizontal padding</div>
<div class="py-4">Vertical padding</div>`}
                preview={
                  <div className="space-y-4">
                    <div className="flex space-x-4">
                      <div className="p-1 border border-dashed rounded-md">
                        <div className="w-8 h-8 bg-muted rounded-md"></div>
                      </div>
                      <div className="p-2 border border-dashed rounded-md">
                        <div className="w-8 h-8 bg-muted rounded-md"></div>
                      </div>
                      <div className="p-4 border border-dashed rounded-md">
                        <div className="w-8 h-8 bg-muted rounded-md"></div>
                      </div>
                      <div className="p-6 border border-dashed rounded-md">
                        <div className="w-8 h-8 bg-muted rounded-md"></div>
                      </div>
                    </div>
                    <div className="flex space-x-4">
                      <div className="px-4 border border-dashed rounded-md">
                        <div className="w-8 h-8 bg-muted rounded-md"></div>
                      </div>
                      <div className="py-4 border border-dashed rounded-md">
                        <div className="w-8 h-8 bg-muted rounded-md"></div>
                      </div>
                    </div>
                  </div>
                }
              />
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-medium tracking-tight mb-4">Typography Utilities</h2>
          <p className="text-muted-foreground font-light mb-6">
            Text styling and formatting classes
          </p>
          
          <Card>
            <CardContent className="p-6">
              <CodeBlock
                language="html"
                code={`<!-- Text sizes -->
<p class="text-xs">Extra small text</p>
<p class="text-sm">Small text</p>
<p class="text-base">Base text size</p>
<p class="text-lg">Large text</p>
<p class="text-xl">Extra large text</p>
<p class="text-2xl">2XL text</p>
<p class="text-3xl">3XL text</p>

<!-- Font weights -->
<p class="font-light">Light weight (300)</p>
<p class="font-normal">Normal weight (400)</p>
<p class="font-medium">Medium weight (500)</p>
<p class="font-semibold">Semibold weight (600)</p>
<p class="font-bold">Bold weight (700)</p>

<!-- Text alignment -->
<p class="text-left">Left aligned text</p>
<p class="text-center">Center aligned text</p>
<p class="text-right">Right aligned text</p>

<!-- Text colors -->
<p class="text-primary">Primary color text</p>
<p class="text-muted-foreground">Muted text</p>
<p class="text-destructive">Destructive/error text</p>`}
                preview={
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <p className="text-xs">Extra small text</p>
                      <p className="text-sm">Small text</p>
                      <p className="text-base">Base text size</p>
                      <p className="text-lg">Large text</p>
                      <p className="text-xl">Extra large text</p>
                    </div>
                    <div className="space-y-1">
                      <p className="font-light">Light weight (300)</p>
                      <p className="font-normal">Normal weight (400)</p>
                      <p className="font-medium">Medium weight (500)</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-primary">Primary color text</p>
                      <p className="text-muted-foreground">Muted text</p>
                      <p className="text-destructive">Destructive/error text</p>
                    </div>
                  </div>
                }
              />
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-medium tracking-tight mb-4">Visual Utilities</h2>
          <p className="text-muted-foreground font-light mb-6">
            Classes for borders, shadows, and visual effects
          </p>
          
          <Card>
            <CardContent className="p-6">
              <CodeBlock
                language="html"
                code={`<!-- Border utilities -->
<div class="border">Default border</div>
<div class="border-2">Thicker border</div>
<div class="border-0">No border</div>
<div class="rounded-none">No border radius</div>
<div class="rounded-sm">Small border radius</div>
<div class="rounded">Default border radius</div>
<div class="rounded-md">Medium border radius</div>
<div class="rounded-lg">Large border radius</div>
<div class="rounded-full">Full/circular border radius</div>

<!-- Shadow utilities -->
<div class="shadow-none">No shadow</div>
<div class="shadow-sm">Small shadow</div>
<div class="shadow">Default shadow</div>
<div class="shadow-md">Medium shadow</div>
<div class="shadow-lg">Large shadow</div>

<!-- Opacity utilities -->
<div class="opacity-0">Invisible (opacity 0)</div>
<div class="opacity-25">25% opacity</div>
<div class="opacity-50">50% opacity</div>
<div class="opacity-75">75% opacity</div>
<div class="opacity-100">Fully visible (opacity 100)</div>`}
                preview={
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <div className="p-4 border rounded-sm bg-background">Small radius</div>
                      <div className="p-4 border rounded-md bg-background">Medium radius</div>
                      <div className="p-4 border rounded-lg bg-background">Large radius</div>
                      <div className="p-4 border rounded-full bg-background">Full radius</div>
                    </div>
                    <div className="space-y-4">
                      <div className="p-4 shadow-sm rounded-md bg-background">Small shadow</div>
                      <div className="p-4 shadow rounded-md bg-background">Default shadow</div>
                      <div className="p-4 shadow-md rounded-md bg-background">Medium shadow</div>
                      <div className="p-4 shadow-lg rounded-md bg-background">Large shadow</div>
                    </div>
                  </div>
                }
              />
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-medium tracking-tight mb-4">Responsive Utilities</h2>
          <p className="text-muted-foreground font-light mb-6">
            Classes for responsive design across different screen sizes
          </p>
          
          <Card>
            <CardContent className="p-6">
              <CodeBlock
                language="html"
                code={`<!-- Responsive display -->
<div class="hidden sm:block">Hidden on mobile, visible on small screens and up</div>
<div class="block md:hidden">Visible on mobile, hidden on medium screens and up</div>

<!-- Responsive layout -->
<div class="flex-col lg:flex-row">Column on mobile, row on large screens</div>
<div class="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  Responsive grid columns (1 on mobile, 2 on medium, 3 on large)
</div>

<!-- Responsive spacing -->
<div class="p-2 md:p-4 lg:p-6">Padding increases with screen size</div>
<div class="gap-2 md:gap-4 lg:gap-6">Gap increases with screen size</div>

<!-- Responsive typography -->
<p class="text-sm md:text-base lg:text-lg">Text size increases with screen size</p>
<h2 class="text-xl md:text-2xl lg:text-3xl">Heading size increases with screen size</h2>`}
                preview={
                  <div className="space-y-4">
                    <div className="p-4 border rounded-md bg-background">
                      <p className="text-sm md:text-base lg:text-lg">Responsive text example</p>
                      <p className="text-xs text-muted-foreground">(Resize window to see changes)</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 border rounded-md bg-background">
                        <p>Responsive grid item 1</p>
                      </div>
                      <div className="p-4 border rounded-md bg-background">
                        <p>Responsive grid item 2</p>
                      </div>
                    </div>
                  </div>
                }
              />
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
