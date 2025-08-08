
// hooks/useScrollRestoration.ts
'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export function useScrollRestoration() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const key = `${pathname}?${searchParams.toString()}`;
    const savedPosition = sessionStorage.getItem(key);

    if (savedPosition) {
      window.scrollTo(0, Number(savedPosition));
    }

    return () => {
      sessionStorage.setItem(key, window.scrollY.toString());
    };
  }, [pathname, searchParams]);
}