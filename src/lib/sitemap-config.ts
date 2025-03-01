// Site URL
export const SITE_URL = 'https://draftpen.com/';

// Define paths that should be excluded from the sitemap
export const EXCLUDED_PATHS = [
  '/_not-found',
  '/api',
];

// Page priorities
export const PAGE_PRIORITIES = {
  home: 1.0,
  tools: 0.9,
  toolCategories: 0.8,
  toolPages: 0.7,
  contentPages: 0.6,
  other: 0.5,
};

// Define the priority and change frequency for different types of pages
export const SITEMAP_CONFIGS = {
  home: {
    priority: 1.0,
    changefreq: 'daily',
  },
  tools: {
    priority: 0.9,
    changefreq: 'weekly',
  },
  toolCategory: {
    priority: 0.8,
    changefreq: 'weekly',
  },
  toolPage: {
    priority: 0.7,
    changefreq: 'weekly',
  },
  content: {
    priority: 0.6,
    changefreq: 'weekly',
  },
  other: {
    priority: 0.5,
    changefreq: 'monthly',
  },
};
