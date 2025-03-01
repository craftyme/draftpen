"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scanAppDirectory = scanAppDirectory;
exports.generateSitemapEntries = generateSitemapEntries;
exports.generateSitemapXml = generateSitemapXml;
exports.writeSitemap = writeSitemap;
// Register module aliases for script execution
require("module-alias/register");
// Add path alias
const module_alias_1 = require("module-alias");
(0, module_alias_1.addAliases)({
    '@': require('path').join(process.cwd(), 'src')
});
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const glob_1 = require("glob");
const sitemap_config_1 = require("./sitemap-config");
/**
 * Scans the app directory to find all page.tsx files and extracts their routes
 */
function scanAppDirectory() {
    const appDir = path_1.default.join(process.cwd(), 'src', 'app');
    const pageFiles = (0, glob_1.globSync)('**/page.tsx', { cwd: appDir });
    return pageFiles.map(file => {
        // Convert file path to URL path
        const urlPath = '/' + file
            .replace('/page.tsx', '')
            .replace('page.tsx', '');
        return urlPath;
    });
}
/**
 * Determines the type of a page based on its path
 */
function getPageType(pagePath) {
    if (pagePath === '/')
        return 'home';
    if (pagePath === '/tools')
        return 'tools';
    // Check if it's a tool category
    if (sitemap_config_1.TOOL_CATEGORIES.some(category => category.path === pagePath)) {
        return 'toolCategory';
    }
    // Check if it's a tool page
    for (const category of sitemap_config_1.TOOL_CATEGORIES) {
        if (category.subpaths.some(subpath => subpath.path === pagePath)) {
            return 'toolPage';
        }
    }
    // Check if it's a content page
    const contentPage = sitemap_config_1.CONTENT_PAGES.find(page => page.path === pagePath);
    if (contentPage) {
        return contentPage.type;
    }
    return 'other';
}
/**
 * Generates sitemap entries for all pages
 */
function generateSitemapEntries() {
    const today = new Date().toISOString().split('T')[0];
    const allPaths = scanAppDirectory();
    const entries = [];
    // Add home page
    entries.push({
        url: sitemap_config_1.SITE_URL,
        lastmod: today,
        changefreq: sitemap_config_1.SITEMAP_CONFIGS.home.changefreq,
        priority: sitemap_config_1.SITEMAP_CONFIGS.home.priority,
    });
    // Process all other paths
    for (const pagePath of allPaths) {
        // Skip excluded paths
        if (sitemap_config_1.EXCLUDED_PATHS.some(excludedPath => pagePath.startsWith(excludedPath))) {
            continue;
        }
        // Skip the home page (already added)
        if (pagePath === '/') {
            continue;
        }
        const pageType = getPageType(pagePath);
        const config = sitemap_config_1.SITEMAP_CONFIGS[pageType];
        entries.push({
            url: `${sitemap_config_1.SITE_URL}${pagePath}`,
            lastmod: today,
            changefreq: config.changefreq,
            priority: config.priority,
        });
    }
    return entries;
}
/**
 * Generates the XML sitemap content
 */
function generateSitemapXml() {
    const entries = generateSitemapEntries();
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    for (const entry of entries) {
        xml += '  <url>\n';
        xml += `    <loc>${entry.url}</loc>\n`;
        xml += `    <lastmod>${entry.lastmod}</lastmod>\n`;
        xml += `    <changefreq>${entry.changefreq}</changefreq>\n`;
        xml += `    <priority>${entry.priority}</priority>\n`;
        xml += '  </url>\n';
    }
    xml += '</urlset>';
    return xml;
}
/**
 * Writes the sitemap to the public directory
 */
function writeSitemap() {
    const xml = generateSitemapXml();
    const outputPath = path_1.default.join(process.cwd(), 'public', 'sitemap.xml');
    fs_1.default.writeFileSync(outputPath, xml);
    console.log(`Sitemap generated at ${outputPath}`);
}
