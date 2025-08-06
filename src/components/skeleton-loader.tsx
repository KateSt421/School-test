import { Skeleton } from '@/components/ui/shadcn-components/skeleton';

interface SkeletonLoaderProps {
  count?: number;
}

export default function SkeletonLoader({ count = 5 }: SkeletonLoaderProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      ))}
    </>
  );
}
