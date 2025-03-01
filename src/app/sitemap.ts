import { MetadataRoute } from 'next';
import path from 'path';
import fs from 'fs';
import { SITE_URL, EXCLUDED_PATHS, PAGE_PRIORITIES } from '@/lib/sitemap-config';

// Function to scan directory and find all page files
function scanDirectory(dir: string, basePath = ''): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  const routes: string[] = [];
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.join(basePath, entry.name);
    
    // Skip node_modules and hidden directories
    if (entry.name.startsWith('.') || entry.name === 'node_modules') {
      continue;
    }
    
    if (entry.isDirectory()) {
      // If it's a directory, scan it recursively
      routes.push(...scanDirectory(fullPath, relativePath));
    } else if (
      // Check if it's a page file
      (entry.name === 'page.js' || entry.name === 'page.tsx') &&
      // Skip route groups (directories starting with parentheses)
      !relativePath.split(path.sep).some(part => part.startsWith('('))
    ) {
      // Convert file path to route path
      const routePath = '/' + basePath
        .replace(/\/page$/, '') // Remove trailing /page
        .replace(/\\/g, '/');   // Convert backslashes to forward slashes
      
      routes.push(routePath === '//' ? '/' : routePath);
    }
  }
  
  return routes;
}

// Determine page type and priority
function getPageConfig(path: string): { priority: number } {
  // Home page
  if (path === '/') {
    return { priority: PAGE_PRIORITIES.home };
  }
  
  // Tool directory
  if (path === '/tools') {
    return { priority: PAGE_PRIORITIES.tools };
  }
  
  // Tool categories
  if (
    path === '/image-converter' || 
    path === '/image-tools' || 
    path === '/pdf-tools' || 
    path === '/social-proof'
  ) {
    return { priority: PAGE_PRIORITIES.toolCategories };
  }
  
  // Tool pages
  if (
    path.startsWith('/image-converter/') || 
    path.startsWith('/image-tools/') || 
    path.startsWith('/pdf-tools/') || 
    path.startsWith('/social-proof/')
  ) {
    return { priority: PAGE_PRIORITIES.toolPages };
  }
  
  // Content pages
  if (
    path === '/tweet' || 
    path === '/code' || 
    path === '/essay' || 
    path === '/carousel' || 
    path === '/changelog' || 
    path === '/updates'
  ) {
    return { priority: PAGE_PRIORITIES.contentPages };
  }
  
  // Other pages
  return { priority: PAGE_PRIORITIES.other };
}

export default function sitemap(): MetadataRoute.Sitemap {
  // Get the app directory path
  const appDir = path.join(process.cwd(), 'src', 'app');
  
  // Scan for all page files
  const routes = scanDirectory(appDir);
  
  // Generate sitemap entries
  const sitemap: MetadataRoute.Sitemap = routes
    .filter(route => !EXCLUDED_PATHS.some(excluded => route.startsWith(excluded)))
    .map(route => {
      const { priority } = getPageConfig(route);
      
      // Ensure the URL has the correct format
      // For the root path ('/'), use the site URL without trailing slash
      const url = route === '/' 
        ? SITE_URL.slice(0, -1) // Remove trailing slash for root
        : `${SITE_URL}${route.substring(1)}`; // Remove leading slash from route since SITE_URL has trailing slash
      
      return {
        url,
        lastModified: new Date(),
        changeFrequency: route === '/' ? 'daily' : 'weekly',
        priority,
      };
    });
  
  return sitemap;
}
