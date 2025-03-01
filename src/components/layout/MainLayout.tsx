import React from 'react';
import Link from 'next/link';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { 
  Github, 
  Image, 
  Code, 
  Twitter, 
  FileText, 
  Layers, 
  Award, 
  Sparkles,
  Palette,
  FileType
} from 'lucide-react';

interface MainLayoutProps {
  children: React.ReactNode;
  activeTab: string;
}

const MainLayout = ({ children, activeTab }: MainLayoutProps) => {
  return (
    <div className="flex flex-col h-screen">
      <header className="py-2 px-4 border-b flex items-center justify-between nav-backdrop sticky top-0 z-50 h-[60px] shrink-0">
        <Link href="/" className="flex items-center gap-1">
          <svg width="16" height="16" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M20 0C31.0457 0 40 8.9543 40 20C40 31.0457 31.0457 40 20 40C8.9543 40 0 31.0457 0 20C0 8.9543 8.9543 0 20 0ZM35 20C35 28.2843 28.2843 35 20 35V5C28.2843 5 35 11.7157 35 20Z" fill="#0071e3"/>
          </svg>
          <span className="font-medium text-sm tracking-tight">Draftpen</span>
        </Link>
        <Tabs defaultValue={activeTab} className="w-auto main-tabs">
          <TabsList className="h-9 bg-transparent p-1 rounded-lg">
            <TabsTrigger 
              value="screenshot" 
              asChild 
              className="h-7 rounded transition-all"
            >
              <Link href="/" className="icon-nav">
                <Image className="h-4 w-4" aria-label="Screenshot icon" />
                <span className="text-xs font-normal">Screenshot</span>
              </Link>
            </TabsTrigger>
            <TabsTrigger 
              value="code" 
              asChild 
              className="h-7 rounded transition-all"
            >
              <Link href="/code" className="icon-nav">
                <Code className="h-4 w-4" aria-label="Code icon" />
                <span className="text-xs font-normal">Code</span>
              </Link>
            </TabsTrigger>
            <TabsTrigger 
              value="tweet" 
              asChild 
              className="h-7 rounded transition-all"
            >
              <Link href="/tweet" className="icon-nav">
                <Twitter className="h-4 w-4" aria-label="Twitter icon" />
                <span className="text-xs font-normal">Tweet</span>
              </Link>
            </TabsTrigger>
            <TabsTrigger 
              value="essay" 
              asChild 
              className="h-7 rounded transition-all"
            >
              <Link href="/essay" className="icon-nav">
                <FileText className="h-4 w-4" aria-label="Essay icon" />
                <span className="text-xs font-normal">Essay</span>
              </Link>
            </TabsTrigger>
            <TabsTrigger 
              value="carousel" 
              asChild 
              className="h-7 rounded transition-all"
            >
              <Link href="/carousel" className="icon-nav">
                <Layers className="h-4 w-4" aria-label="Carousel icon" />
                <span className="text-xs font-normal">Carousel</span>
              </Link>
            </TabsTrigger>
            <TabsTrigger 
              value="social-proof" 
              asChild 
              className="h-7 rounded transition-all"
            >
              <Link href="/social-proof" className="icon-nav">
                <Award className="h-4 w-4" aria-label="Social Proof icon" />
                <span className="text-xs font-normal">Social Proof</span>
              </Link>
            </TabsTrigger>
            <TabsTrigger 
              value="changelog" 
              asChild 
              className="h-7 rounded transition-all"
            >
              <Link href="/changelog" className="icon-nav">
                <Sparkles className="h-4 w-4" aria-label="Changelog icon" />
                <span className="text-xs font-normal">Changelog</span>
              </Link>
            </TabsTrigger>
            <TabsTrigger 
              value="style-guide" 
              asChild 
              className="h-7 rounded transition-all"
            >
              <Link href="/style-guide" className="icon-nav">
                <Palette className="h-4 w-4" aria-label="Style Guide icon" />
                <span className="text-xs font-normal">Style Guide</span>
              </Link>
            </TabsTrigger>
            <TabsTrigger 
              value="pdf-tools" 
              asChild 
              className="h-7 rounded transition-all"
            >
              <Link href="/pdf-tools" className="icon-nav">
                <FileType className="h-4 w-4" aria-label="PDF Tools icon" />
                <span className="text-xs font-normal">PDF Tools</span>
              </Link>
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a 
            href="https://github.com/craftyme/draftpen" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-xs text-[#86868b] hover:text-[#1d1d1f] dark:text-gray-400 dark:hover:text-gray-200 font-light"
          >
            <Github className="h-4 w-4 mr-1" aria-label="GitHub icon" />
            <span>GitHub</span>
          </a>
        </div>
      </header>
      <main className="flex-1 overflow-auto">
        {children}
      </main>
      <footer className="py-2 px-4 border-t flex items-center justify-between flex-wrap gap-2 text-xs text-[#86868b] dark:text-gray-400 font-light shrink-0">
        <div>
          {new Date().getFullYear()} &copy; Draftpen - Craft beautiful shareable visuals from your content. Standing on the shoulders of giants.
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#86868b]">Built by</span>
          <div className="flex items-center gap-1">
            <svg width="14" height="14" viewBox="0 0 154 154" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
              <rect width="154" height="154" rx="77" fill="#0A0A0A"></rect>
              <path d="M77.8 106.2C71.9667 106.2 66.85 105.033 62.45 102.7C58.05 100.333 54.6333 97.05 52.2 92.85C49.8 88.65 48.6 83.8 48.6 78.3C48.6 72.7333 49.8 67.9167 52.2 63.85C54.6333 59.75 58.05 56.5667 62.45 54.3C66.85 52.0333 71.9667 50.9 77.8 50.9C82.1667 50.9 86.0333 51.55 89.4 52.85C92.7667 54.1167 95.5833 55.8 97.85 57.9C100.117 60 101.833 62.3 103 64.8C104.167 67.3 104.75 69.7833 104.75 72.25C104.75 72.2833 104.75 72.35 104.75 72.45C104.75 72.5167 104.75 72.5833 104.75 72.65H89.4C89.4 72.45 89.3833 72.2667 89.35 72.1C89.35 71.9 89.3167 71.7 89.25 71.5C88.9833 70.1 88.4 68.7833 87.5 67.55C86.6 66.3167 85.3333 65.3167 83.7 64.55C82.1 63.75 80.1 63.35 77.7 63.35C75.1333 63.35 72.8333 63.9167 70.8 65.05C68.8 66.1833 67.2167 67.8667 66.05 70.1C64.8833 72.3 64.3 75.0333 64.3 78.3C64.3 81.5 64.8833 84.2667 66.05 86.6C67.2167 88.9 68.8 90.6667 70.8 91.9C72.8333 93.1333 75.1333 93.75 77.7 93.75C80.3333 93.75 82.4833 93.35 84.15 92.55C85.8167 91.7167 87.0667 90.6167 87.9 89.25C88.7333 87.85 89.2333 86.3167 89.4 84.65H104.75C104.75 87.1167 104.167 89.6333 103 92.2C101.867 94.7333 100.167 97.05 97.9 99.15C95.6667 101.25 92.8667 102.95 89.5 104.25C86.1333 105.55 82.2333 106.2 77.8 106.2Z" fill="white"></path>
            </svg>
            <a 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-xs font-normal text-zinc-900 dark:text-zinc-100 hover:text-zinc-700 dark:hover:text-zinc-300" 
              href="https://craftled.com/"
            >
              Craftled
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
