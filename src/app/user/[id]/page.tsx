// app/user/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { notFound, useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/shadcn-components/button';
import UserForm from '@/components/user/UserForm';
import ErrorCard from '@/components/ErrorCard';
import { fetchUser } from '@/lib/api';
import { useLocalUsers } from '@/hooks/useLocalUsers';
import { User, UserFormValues } from '@/types/user';
import UserInfoSection from '@/components/user/UserInfoSection';
import AddressSection from '@/components/user/AddressSection';
import CompanySection from '@/components/user/CompanySection';

export default function UserDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { users, updateUser } = useLocalUsers();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userId = parseInt(params.id as string);
        if (isNaN(userId)) {
          setError('Invalid user ID');
          setLoading(false);
          return;
        }

        // Сначала проверяем локальных пользователей
        const localUser = users.find(u => u.id === userId);
        if (localUser) {
          setUser(localUser);
          setLoading(false);
          return;
        }

        // Если пользователь не найден локально, пробуем загрузить с API
        const apiUser = await fetchUser(userId);
        setUser(apiUser);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load user');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [params.id, users]);

  const handleUpdate = (formData: UserFormValues) => {
    if (!user) return;

    const updatedUser = {
      ...user,
      ...formData,
      company: {
        ...user.company,
        name: formData.company.name
      }
    };

    updateUser(user.id, updatedUser);
    setUser(updatedUser);
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="h-8 w-24 bg-gray-200 rounded animate-pulse" />
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-4 bg-gray-200 rounded animate-pulse w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <ErrorCard message={error} />;
  }

  if (!user) {
    return notFound();
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto p-4"
    >
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Button variant="outline" onClick={() => router.back()}>
            Back
          </Button>
          <Button onClick={() => setIsEditing(true)}>
            Edit User
          </Button>
        </div>

        <div className="space-y-6">
          <h1 className="text-2xl font-bold">{user.name}</h1>

          <UserInfoSection user={user} />
          <AddressSection address={user.address} />
          <CompanySection company={user.company} />

          <UserForm
            user={user}
            open={isEditing}
            onOpenChange={setIsEditing}
            onSubmit={handleUpdate}
            buttonText="Save Changes"
          />
        </div>
      </div>
    </motion.div>
  );
}