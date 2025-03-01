# Dynamic Sitemap Generator for DraftPen

This document explains how the dynamic sitemap generation works in DraftPen.

## Overview

DraftPen uses Next.js's built-in sitemap generation functionality to create a dynamic sitemap that automatically includes all pages in the application. This helps search engines discover and index all content, improving SEO.

## Implementation

The sitemap implementation consists of two main components:

1. **Configuration File**: `/src/lib/sitemap-config.ts`
2. **Sitemap Generator**: `/src/app/sitemap.ts`
3. **Robots.txt Generator**: `/src/app/robots.ts`

### Configuration File

The configuration file defines:

- The site URL (`https://draftpen.com`)
- Paths to exclude from the sitemap (e.g., API routes)
- Priority settings for different types of pages

### Sitemap Generator

The sitemap generator:

1. Scans the app directory to find all page files
2. Converts file paths to URL paths
3. Assigns appropriate priority and change frequency based on the page type
4. Generates a sitemap in the format required by search engines

### Robots.txt Generator

The robots.txt file:

1. Allows search engines to crawl all pages except API routes
2. References the sitemap URL for search engines to discover

## How It Works

When Next.js builds the application, it automatically:

1. Executes the sitemap generator
2. Creates a sitemap.xml file at the root of the site
3. Creates a robots.txt file at the root of the site

## Page Priorities

Pages are assigned different priorities based on their type:

- Home page: 1.0 (highest priority)
- Tools directory: 0.9
- Tool categories: 0.8
- Tool pages: 0.7
- Content pages: 0.6
- Other pages: 0.5 (default)

## Change Frequency

- Home page: daily
- All other pages: weekly

## Excluded Paths

The following paths are excluded from the sitemap:

- `/_not-found`
- `/api`

## Automatic Updates

The sitemap automatically updates when new pages are added to the application. No manual updates are needed.

## Testing

You can view the generated sitemap at `https://draftpen.com/sitemap.xml` after deployment.
