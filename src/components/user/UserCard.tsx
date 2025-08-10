import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/shadcn-components/card';
import { Button } from '@/components/ui/shadcn-components/button';
import { User } from '@/types/user';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface UserCardProps {
  user: User;
  onDelete: (id: string | number) => void;
}

export default function UserCard({ user, onDelete }: UserCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
    >
      <Card className="hover:shadow-lg transition-shadow bg-gradient-to-br from-white to-gray-50 border-gray-200 rounded-lg">
        <CardHeader className="flex justify-between items-center">
          <CardTitle className="text-gray-800 font-semibold text-lg">{user.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm text-gray-600">{user.email}</p>
          <p className="text-sm text-gray-700 font-medium">{user.company?.name}</p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href={`/user/${user.id}`} passHref>
            <Button
              variant="outline"
              className="bg-blue-50 text-blue-600 hover:bg-blue-100 border-blue-200"
              asChild
            >
              <span>Details</span>
            </Button>
          </Link>
          <Button
            variant="destructive"
            className="bg-red-50 text-red-600 hover:bg-red-100 border-red-200"
            onClick={() => onDelete(user.id)}
          >
            Delete
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
