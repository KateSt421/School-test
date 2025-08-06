import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/shadcn-components/card';
import { Button } from '@/components/ui/shadcn-components/button';
import { User } from '@/types/user';
import Link from 'next/link';

interface UserCardProps {
  user: User;
  onDelete: (id: number) => void;
}

export default function UserCard({ user, onDelete }: UserCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle>{user.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm text-gray-600">{user.email}</p>
        <p className="text-sm">{user.company.name}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" asChild>
          <Link href={`/user/${user.id}`}>Details</Link>
        </Button>
        <Button
          variant="destructive"
          onClick={() => onDelete(user.id)}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
