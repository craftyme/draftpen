'use client';

import React from 'react';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';

interface ToolCategory {
  title: string;
  description: string;
  path: string;
  tools: Tool[];
}

interface Tool {
  name: string;
  description: string;
  path: string;
}

const ToolsPage = () => {
  const categories: ToolCategory[] = [
    {
      title: 'Image Converter',
      description: 'Convert images between different formats',
      path: '/image-converter',
      tools: [
        { name: 'HEIC to JPG', description: 'Convert Apple HEIC photos to JPG format', path: '/image-converter/heic-to-jpg' },
        { name: 'JPG to PNG', description: 'Convert JPG images to PNG format', path: '/image-converter/jpg-to-png' },
        { name: 'PDF to JPG', description: 'Convert PDF documents to JPG images', path: '/image-converter/pdf-to-jpg' },
        { name: 'PDF to PNG', description: 'Convert PDF documents to PNG images', path: '/image-converter/pdf-to-png' },
        { name: 'PNG to JPG', description: 'Convert PNG images to JPG format', path: '/image-converter/png-to-jpg' },
        { name: 'PNG to SVG', description: 'Convert PNG images to scalable vector graphics', path: '/image-converter/png-to-svg' },
        { name: 'SVG Converter', description: 'Convert to and from SVG format', path: '/image-converter/svg-converter' },
        { name: 'WebP to JPG', description: 'Convert WebP images to JPG format', path: '/image-converter/webp-to-jpg' },
      ],
    },
    {
      title: 'Image Tools',
      description: 'Edit and enhance your images',
      path: '/image-tools',
      tools: [
        { name: 'Bulk Image Resizer', description: 'Resize multiple images at once', path: '/image-tools/bulk-image-resizer' },
        { name: 'Collage Maker', description: 'Create beautiful photo collages', path: '/image-tools/collage-maker' },
        { name: 'Color Picker', description: 'Extract colors from images', path: '/image-tools/color-picker' },
        { name: 'Crop Image', description: 'Crop images to your desired dimensions', path: '/image-tools/crop-image' },
        { name: 'Flip Image', description: 'Flip images horizontally or vertically', path: '/image-tools/flip-image' },
        { name: 'Image Compressor', description: 'Reduce image file size while preserving quality', path: '/image-tools/image-compressor' },
        { name: 'Image Enlarger', description: 'Enlarge images without losing quality', path: '/image-tools/image-enlarger' },
        { name: 'Image Resizer', description: 'Resize images to specific dimensions', path: '/image-tools/image-resizer' },
        { name: 'Meme Generator', description: 'Create custom memes with your images', path: '/image-tools/meme-generator' },
        { name: 'Rotate Image', description: 'Rotate images to any angle', path: '/image-tools/rotate-image' },
      ],
    },
    {
      title: 'PDF Tools',
      description: 'Work with PDF documents',
      path: '/pdf-tools',
      tools: [
        { name: 'Compress PDF', description: 'Reduce PDF file size', path: '/pdf-tools/compress' },
        { name: 'PDF Converter', description: 'Convert PDFs to other formats', path: '/pdf-tools/converter' },
        { name: 'Image to PDF', description: 'Convert images to PDF documents', path: '/pdf-tools/image-to-pdf' },
        { name: 'JPG to PDF', description: 'Convert JPG images to PDF documents', path: '/pdf-tools/jpg-to-pdf' },
        { name: 'PDF to GIF', description: 'Convert PDF pages to animated GIFs', path: '/pdf-tools/pdf-to-gif' },
        { name: 'PNG to PDF', description: 'Convert PNG images to PDF documents', path: '/pdf-tools/png-to-pdf' },
      ],
    },
    {
      title: 'Social Proof',
      description: 'Generate social proof elements',
      path: '/social-proof',
      tools: [
        { name: 'Capterra Reviews', description: 'Create Capterra review widgets', path: '/social-proof/capterra' },
        { name: 'G2 Reviews', description: 'Generate G2 review displays', path: '/social-proof/g2' },
        { name: 'Testimonials', description: 'Design custom testimonial displays', path: '/social-proof/testimonial' },
        { name: 'Trustpilot', description: 'Create Trustpilot review widgets', path: '/social-proof/trustpilot' },
      ],
    },
    {
      title: 'Content Generators',
      description: 'Create shareable content',
      path: '#',
      tools: [
        { name: 'Tweet Generator', description: 'Create beautiful tweet images', path: '/tweet' },
        { name: 'Code Snippets', description: 'Generate code snippet images', path: '/code' },
        { name: 'Essay Formatter', description: 'Format essays for sharing', path: '/essay' },
        { name: 'Carousel Creator', description: 'Create image carousels for social media', path: '/carousel' },
      ],
    },
  ];

  return (
    <MainLayout activeTab="tools">
      <div className="py-12 px-4 max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <h1 className="text-4xl font-medium tracking-tight mb-4">All Draftpen Tools</h1>
          <p className="text-xl text-muted-foreground font-light max-w-3xl mx-auto">
            Explore our complete collection of tools for creating, converting, and sharing beautiful visuals
          </p>
        </div>

        <div className="space-y-24">
          {categories.map((category) => (
            <div key={category.title} className="space-y-8">
              <div className="border-b pb-2">
                <Link href={category.path} className="group">
                  <h2 className="text-2xl font-medium tracking-tight inline-flex items-center">
                    {category.title}
                    <svg className="ml-1 w-5 h-5 opacity-0 group-hover:opacity-70 transition-opacity" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                    </svg>
                  </h2>
                  <p className="text-muted-foreground font-light mt-1">{category.description}</p>
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
                {category.tools.map((tool) => (
                  <Link 
                    href={tool.path} 
                    key={tool.path}
                    className="group"
                  >
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium tracking-tight group-hover:text-blue-600 transition-colors">
                        {tool.name}
                      </h3>
                      <p className="text-sm text-muted-foreground font-light">{tool.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default ToolsPage;
