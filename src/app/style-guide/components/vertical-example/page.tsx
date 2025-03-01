'use client';

import React from 'react';
import { CodeBlock } from '@/components/docs/CodeBlock';
import { Card, CardContent } from '@/components/ui/card';

const exampleCode = `import { cn } from "@/lib/utils";
import { Marquee } from "@/registry/magicui/marquee";

const reviews = [
  {
    name: "Jack",
    username: "@jack",
    body: "I've never seen anything like this before. It's amazing. I love it.",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "Jill",
    username: "@jill",
    body: "I don't know what to say. I'm speechless. This is amazing.",
    img: "https://avatar.vercel.sh/jill",
  },
  {
    name: "Mary",
    username: "@mary",
    body: "This is exactly what I've been looking for. Thank you!",
    img: "https://avatar.vercel.sh/mary",
  },
  {
    name: "James",
    username: "@james",
    body: "The best tool I've used in years. Highly recommended!",
    img: "https://avatar.vercel.sh/james",
  },
];

export function VerticalMarquee() {
  return (
    <div className="h-[400px] w-full overflow-hidden rounded-md border">
      <Marquee
        pauseOnHover
        className="h-full [--duration:20s]"
        reverse
        vertical
      >
        {reviews.map((review, i) => (
          <div
            key={i}
            className={cn(
              "flex w-full shrink-0 flex-col items-center gap-2 p-4",
              i % 2 === 0 ? "bg-muted/50" : "bg-background"
            )}
          >
            <img
              src={review.img}
              alt={review.name}
              className="h-12 w-12 rounded-full object-cover"
            />
            <div className="flex flex-col items-center text-center">
              <div className="font-medium">{review.name}</div>
              <div className="text-sm text-muted-foreground">
                {review.username}
              </div>
              <div className="text-sm text-muted-foreground mt-2">
                {review.body}
              </div>
            </div>
          </div>
        ))}
      </Marquee>
    </div>
  );
}`;

const VerticalMarqueePreview = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="h-[400px] w-full max-w-[300px] overflow-hidden rounded-md border bg-muted/50">
        <div className="flex h-full flex-col">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`flex w-full shrink-0 flex-col items-center gap-2 p-4 ${
                i % 2 === 0 ? "bg-muted/50" : "bg-background"
              }`}
            >
              <div className="h-12 w-12 rounded-full bg-muted"></div>
              <div className="flex flex-col items-center text-center">
                <div className="h-4 w-20 rounded bg-muted"></div>
                <div className="mt-1 h-3 w-16 rounded bg-muted"></div>
                <div className="mt-2 h-3 w-full rounded bg-muted"></div>
                <div className="mt-1 h-3 w-full rounded bg-muted"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function VerticalExamplePage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-medium mb-2 tracking-tight">Vertical Example</h1>
        <p className="text-lg text-muted-foreground font-light">
          Example of a vertical marquee component with tabbed code view
        </p>
      </div>

      <div className="space-y-10">
        <section>
          <h2 className="text-2xl font-medium tracking-tight mb-4">Vertical Marquee</h2>
          <p className="text-muted-foreground font-light mb-6">
            A vertical scrolling marquee component that showcases reviews or testimonials
          </p>
          
          <Card>
            <CardContent className="p-6">
              <CodeBlock
                code={exampleCode}
                language="tsx"
                preview={<VerticalMarqueePreview />}
                showLineNumbers={true}
              />
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
