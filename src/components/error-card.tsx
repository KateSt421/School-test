import { Alert, AlertTitle, AlertDescription } from '@/components/ui/shadcn-components/alert';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

interface ErrorCardProps {
  message: string;
}

export default function ErrorCard({ message }: ErrorCardProps) {
  return (
    <Alert variant="destructive" className="max-w-2xl mx-auto my-8">
      <ExclamationTriangleIcon className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}
