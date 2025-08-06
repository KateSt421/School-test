'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/shadcn-components/button';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 max-w-7xl">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-lg font-bold text-gray-800">User App</span>
        </Link>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" asChild className="hover:bg-blue-50">
            <a
              href="https://jsonplaceholder.typicode.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Public API is used
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}