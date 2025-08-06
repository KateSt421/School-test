'use client';

export function SiteFooter() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 max-w-7xl">
        <p className="text-sm text-gray-600">
          Created by Katsiaryna Stankevich
        </p>
        <p className="text-sm text-gray-600">
          {new Date().getFullYear()} &copy; All rights reserved
        </p>
      </div>
    </footer>
  );
}
