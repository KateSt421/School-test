// app/not-found.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/shadcn-components/button';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <div className="max-w-md space-y-6">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold">404</h1>
          <h2 className="text-2xl font-semibold">Page Not Found</h2>
          <p>The page you&apos;re looking for doesn&apos;t exist.</p>
        </div>
        <Button asChild variant="default">
          <Link href="/">Go to Homepage</Link>
        </Button>
      </div>
    </div>
  );
}