import { Button } from '@/components/ui/shadcn-components/button';
import { RocketIcon } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4 text-center">
      <div className="max-w-md space-y-6">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold tracking-tight text-foreground">404</h1>
          <h2 className="text-2xl font-semibold text-muted-foreground">
            Page Not Found
          </h2>
          <p className="text-muted-foreground">
            Oops! The page you`&apos;`re looking for doesn`&apos;`t exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild variant="default" size="lg">
            <Link href="/" className="flex items-center gap-2">
              <RocketIcon className="h-4 w-4" />
              Go to Homepage
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/users">
              Browse Users
            </Link>
          </Button>
        </div>

        <div className="pt-8 text-xs text-muted-foreground">
          <p>If you believe this is an error, please contact support.</p>
        </div>
      </div>
    </div>
  );
}
