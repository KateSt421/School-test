'use client';

export function SiteFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="container flex h-16 items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Created by Katsiaryna Stankevich
        </p>
        <p className="text-sm text-muted-foreground">
          {new Date().getFullYear()} &copy; All rights reserved
        </p>
      </div>
    </footer>
  );
}
