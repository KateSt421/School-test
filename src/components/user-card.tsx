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
    <Card className="hover:shadow-lg transition-shadow bg-gradient-to-br from-white to-gray-50 border-gray-200 rounded-lg">
      <CardHeader>
        <CardTitle className="text-gray-800 font-semibold text-lg">{user.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm text-gray-600">{user.email}</p>
        <p className="text-sm text-gray-700 font-medium">{user.company.name}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" className="bg-blue-50 text-blue-600 hover:bg-blue-100 border-blue-200" asChild>
          <Link href={`/user/${user.id}`}>Details</Link>
        </Button>
        <Button
          variant="destructive"
          className="bg-red-50 text-red-600 hover:bg-red-100 border-red-200"
          onClick={() => onDelete(user.id)}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}