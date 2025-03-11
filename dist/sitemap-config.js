"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONTENT_PAGES =
  exports.TOOL_CATEGORIES =
  exports.EXCLUDED_PATHS =
  exports.SITEMAP_CONFIGS =
  exports.SITE_URL =
    void 0;
exports.SITE_URL = "https://draftpen.com";
// Define the priority and change frequency for different types of pages
exports.SITEMAP_CONFIGS = {
  home: {
    priority: 1.0,
    changefreq: "daily",
  },
  tools: {
    priority: 0.9,
    changefreq: "weekly",
  },
  toolCategory: {
    priority: 0.8,
    changefreq: "weekly",
  },
  toolPage: {
    priority: 0.7,
    changefreq: "weekly",
  },
  content: {
    priority: 0.6,
    changefreq: "weekly",
  },
  other: {
    priority: 0.5,
    changefreq: "monthly",
  },
};
// Define paths that should be excluded from the sitemap
exports.EXCLUDED_PATHS = ["/_not-found", "/api"];
// Define all tool categories and their pages
exports.TOOL_CATEGORIES = [
  {
    path: "/image-converter",
    type: "toolCategory",
    subpaths: [
      { path: "/image-converter/heic-to-jpg", type: "toolPage" },
      { path: "/image-converter/jpg-to-png", type: "toolPage" },
      { path: "/image-converter/pdf-to-jpg", type: "toolPage" },
      { path: "/image-converter/pdf-to-png", type: "toolPage" },
      { path: "/image-converter/png-to-jpg", type: "toolPage" },
      { path: "/image-converter/png-to-svg", type: "toolPage" },
      { path: "/image-converter/svg-converter", type: "toolPage" },
      { path: "/image-converter/webp-to-jpg", type: "toolPage" },
    ],
  },
  {
    path: "/image-tools",
    type: "toolCategory",
    subpaths: [
      { path: "/image-tools/bulk-image-resizer", type: "toolPage" },
      { path: "/image-tools/collage-maker", type: "toolPage" },
      { path: "/image-tools/color-picker", type: "toolPage" },
      { path: "/image-tools/crop-image", type: "toolPage" },
      { path: "/image-tools/flip-image", type: "toolPage" },
      { path: "/image-tools/image-compressor", type: "toolPage" },
      { path: "/image-tools/image-enlarger", type: "toolPage" },
      { path: "/image-tools/image-resizer", type: "toolPage" },
      { path: "/image-tools/meme-generator", type: "toolPage" },
      { path: "/image-tools/rotate-image", type: "toolPage" },
    ],
  },
  {
    path: "/pdf-tools",
    type: "toolCategory",
    subpaths: [
      { path: "/pdf-tools/compress", type: "toolPage" },
      { path: "/pdf-tools/converter", type: "toolPage" },
      { path: "/pdf-tools/image-to-pdf", type: "toolPage" },
      { path: "/pdf-tools/jpg-to-pdf", type: "toolPage" },
      { path: "/pdf-tools/pdf-to-gif", type: "toolPage" },
      { path: "/pdf-tools/png-to-pdf", type: "toolPage" },
    ],
  },
  {
    path: "/ebook-tools",
    type: "toolCategory",
    subpaths: [
      { path: "/ebook-tools/epub-to-mobi", type: "toolPage" },
      { path: "/ebook-tools/mobi-to-epub", type: "toolPage" },
      { path: "/ebook-tools/pdf-to-epub", type: "toolPage" },
      { path: "/ebook-tools/pdf-to-mobi", type: "toolPage" },
      { path: "/ebook-tools/azw-to-epub", type: "toolPage" },
      { path: "/ebook-tools/azw-to-mobi", type: "toolPage" },
      { path: "/ebook-tools/epub-to-pdf", type: "toolPage" },
      { path: "/ebook-tools/mobi-to-pdf", type: "toolPage" },
    ],
  },
  {
    path: "/social-proof",
    type: "toolCategory",
    subpaths: [
      { path: "/social-proof/capterra", type: "toolPage" },
      { path: "/social-proof/g2", type: "toolPage" },
      { path: "/social-proof/testimonial", type: "toolPage" },
      { path: "/social-proof/trustpilot", type: "toolPage" },
    ],
  },
];
// Define standalone content pages
exports.CONTENT_PAGES = [
  { path: "/tools", type: "tools" },
  { path: "/tweet", type: "content" },
  { path: "/code", type: "content" },
  { path: "/essay", type: "content" },
  { path: "/carousel", type: "content" },
  { path: "/changelog", type: "content" },
  { path: "/updates", type: "content" },
  { path: "/style-guide", type: "other" },
];
