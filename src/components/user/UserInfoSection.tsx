import { User } from '@/types/user';

interface UserInfoSectionProps {
  user: User;
}

export default function UserInfoSection({ user }: UserInfoSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <p className="text-sm text-gray-500">Username</p>
        <p className="text-gray-700">{user.username}</p>
      </div>
      <div>
        <p className="text-sm text-gray-500">Email</p>
        <p className="text-gray-700">{user.email}</p>
      </div>
      <div>
        <p className="text-sm text-gray-500">Phone</p>
        <p className="text-gray-700">{user.phone}</p>
      </div>
      <div>
        <p className="text-sm text-gray-500">Website</p>
        <p className="text-gray-700">{user.website || '-'}</p>
      </div>
    </div>
  );
}
