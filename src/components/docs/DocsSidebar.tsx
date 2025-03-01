'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

interface DocsSidebarProps {
  className?: string;
}

interface NavItem {
  title: string;
  href: string;
  icon?: React.ReactNode;
  children?: NavItem[];
  isExpanded?: boolean;
}

const navItems: NavItem[] = [
  {
    title: 'Introduction',
    href: '/style-guide',
  },
  {
    title: 'Design Tokens',
    href: '/style-guide/design-tokens',
    children: [
      { title: 'Colors', href: '/style-guide/design-tokens/colors' },
      { title: 'Typography', href: '/style-guide/design-tokens/typography' },
      { title: 'Spacing', href: '/style-guide/design-tokens/spacing' },
      { title: 'Shadows', href: '/style-guide/design-tokens/shadows' },
      { title: 'Borders', href: '/style-guide/design-tokens/borders' },
    ],
  },
  {
    title: 'Components',
    href: '/style-guide/components',
    children: [
      { title: 'Buttons', href: '/style-guide/components/buttons' },
      { title: 'Cards', href: '/style-guide/components/cards' },
      { title: 'Inputs', href: '/style-guide/components/inputs' },
      { title: 'Tabs', href: '/style-guide/components/tabs' },
      { title: 'Badges', href: '/style-guide/components/badges' },
      { title: 'Dropdowns', href: '/style-guide/components/dropdowns' },
      { title: 'Modals', href: '/style-guide/components/modals' },
      { title: 'Alerts', href: '/style-guide/components/alerts' },
    ],
  },
  {
    title: 'Patterns',
    href: '/style-guide/patterns',
    children: [
      { title: 'Forms', href: '/style-guide/patterns/forms' },
      { title: 'Navigation', href: '/style-guide/patterns/navigation' },
      { title: 'Layouts', href: '/style-guide/patterns/layouts' },
    ],
  },
  {
    title: 'Utilities',
    href: '/style-guide/utilities',
  },
  {
    title: 'Announcements',
    href: '/style-guide/announcement-banners',
  },
];

export function DocsSidebar({ className }: DocsSidebarProps) {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = React.useState<Record<string, boolean>>({});

  // Initialize expanded state based on current path
  React.useEffect(() => {
    const newExpandedState: Record<string, boolean> = {};
    
    navItems.forEach(item => {
      if (item.children) {
        const shouldExpand = item.children.some(child => 
          pathname === child.href || pathname.startsWith(child.href + '/')
        );
        newExpandedState[item.href] = shouldExpand;
      }
    });
    
    setExpandedItems(newExpandedState);
  }, [pathname]);

  const toggleExpanded = (href: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [href]: !prev[href]
    }));
  };

  return (
    <div className={cn("w-64 h-full overflow-y-auto py-6 px-3 border-r", className)}>
      <div className="mb-6 px-3">
        <h2 className="text-lg font-medium tracking-tight">Style Guide</h2>
        <p className="text-sm text-muted-foreground font-light">
          DraftPen design system
        </p>
      </div>
      <nav className="space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          const isExpanded = expandedItems[item.href];
          
          return (
            <div key={item.href} className="space-y-1">
              {item.children ? (
                <button
                  onClick={() => toggleExpanded(item.href)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-light transition-colors",
                    isActive 
                      ? "bg-accent text-accent-foreground" 
                      : "hover:bg-muted"
                  )}
                >
                  <span>{item.title}</span>
                  <ChevronDown 
                    className={cn(
                      "h-4 w-4 transition-transform", 
                      isExpanded ? "transform rotate-180" : ""
                    )} 
                  />
                </button>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center rounded-md px-3 py-2 text-sm font-light transition-colors",
                    isActive 
                      ? "bg-accent text-accent-foreground" 
                      : "hover:bg-muted"
                  )}
                >
                  {item.title}
                </Link>
              )}
              
              {item.children && isExpanded && (
                <div className="ml-4 border-l pl-2 pt-1">
                  {item.children.map((child) => {
                    const isChildActive = pathname === child.href;
                    
                    return (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={cn(
                          "flex items-center rounded-md px-3 py-1.5 text-sm font-light transition-colors",
                          isChildActive 
                            ? "bg-accent/50 text-accent-foreground" 
                            : "hover:bg-muted"
                        )}
                      >
                        {child.title}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
}
