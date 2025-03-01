'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CodeBlock } from '@/components/docs/CodeBlock';

export default function ButtonsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-medium mb-2 tracking-tight">Buttons</h1>
        <p className="text-lg text-muted-foreground font-light">
          Button components with various styles and sizes
        </p>
      </div>

      <div className="space-y-10">
        <section>
          <h2 className="text-2xl font-medium tracking-tight mb-4">Button Variants</h2>
          <p className="text-muted-foreground font-light mb-6">
            Different button styles for various use cases
          </p>
          
          <Card>
            <CardContent className="p-6">
              <CodeBlock
                language="tsx"
                code={`<Button>Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
<Button variant="destructive">Destructive</Button>`}
                preview={
                  <div className="flex flex-wrap gap-4">
                    <Button>Default</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="link">Link</Button>
                    <Button variant="destructive">Destructive</Button>
                  </div>
                }
              />
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-medium tracking-tight mb-4">Button Sizes</h2>
          <p className="text-muted-foreground font-light mb-6">
            Different button sizes for various contexts
          </p>
          
          <Card>
            <CardContent className="p-6">
              <CodeBlock
                language="tsx"
                code={`<Button size="sm">Small</Button>
<Button>Default</Button>
<Button size="lg">Large</Button>`}
                preview={
                  <div className="flex flex-wrap gap-4 items-center">
                    <Button size="sm">Small</Button>
                    <Button>Default</Button>
                    <Button size="lg">Large</Button>
                  </div>
                }
              />
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-medium tracking-tight mb-4">Button States</h2>
          <p className="text-muted-foreground font-light mb-6">
            Different button states including disabled and loading
          </p>
          
          <Card>
            <CardContent className="p-6">
              <CodeBlock
                language="tsx"
                code={`<Button>Default</Button>
<Button disabled>Disabled</Button>
<Button variant="outline" disabled>Disabled Outline</Button>`}
                preview={
                  <div className="flex flex-wrap gap-4 items-center">
                    <Button>Default</Button>
                    <Button disabled>Disabled</Button>
                    <Button variant="outline" disabled>Disabled Outline</Button>
                  </div>
                }
              />
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-medium tracking-tight mb-4">Usage Guidelines</h2>
          <p className="text-muted-foreground font-light mb-6">
            Best practices for using buttons in the DraftPen interface
          </p>
          
          <Card>
            <CardContent className="p-6">
              <ul className="list-disc list-inside space-y-2 text-muted-foreground font-light ml-4">
                <li>Use the primary button for the main action on a page or in a form</li>
                <li>Use secondary or outline buttons for alternative actions</li>
                <li>Limit the number of primary buttons on a page to avoid confusion</li>
                <li>Use destructive buttons for actions that delete or remove data</li>
                <li>Ensure button text clearly describes the action (e.g., &quot;Save Changes&quot; instead of &quot;Submit&quot;)</li>
                <li>Maintain consistent button styling throughout the application</li>
                <li>Use appropriate button sizes based on context and importance</li>
              </ul>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
