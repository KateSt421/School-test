'use client';

import { useEffect, useState, useCallback } from 'react';
import { notFound, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/shadcn-components/button';
import UserForm from '@/components/user-form';
import ErrorCard from '@/components/error-card';
import { fetchUser } from '@/lib/api';
import { useLocalUsers } from '@/hooks/use-local-users';
import { User } from '@/types/user';

export default function UserDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { users, updateUser } = useLocalUsers();
  const id = parseInt(params.id);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const loadUser = useCallback(async () => {
    try {
      setLoading(true);
      const localUser = users.find(user => user.id === id);

      if (localUser) {
        setUser(localUser);
      } else {
        const apiUser = await fetchUser(id);
        setUser(apiUser);
      }

      if (!localUser && !user) {
        notFound();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load user');
    } finally {
      setLoading(false);
    }
  }, [id, users, user]); // Добавляем user в зависимости

  useEffect(() => {
    loadUser();
  }, [loadUser]); // Используем мемоизированную функцию

  const handleBack = () => {
    router.back();
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
        <Button variant="outline" className="mb-6" onClick={handleBack}>
          Back
        </Button>

        <div className="space-y-4">
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
          <p>Website: {user.website}</p>
          <p>Company: {user.company.name}</p>

          <div className="mt-4">
            <h2 className="text-xl font-semibold">Address</h2>
            <p>{user.address.street}, {user.address.suite}</p>
            <p>{user.address.city}, {user.address.zipcode}</p>
          </div>

          <UserForm
            user={user}
            open={isFormOpen}
            onOpenChange={setIsFormOpen}
            onSubmit={(data) => {
              updateUser(user.id, data);
              setIsFormOpen(false); // Закрываем форму после сохранения
            }}
            buttonText="Save Changes"
          />
        </div>
      </div>
    </motion.div>
  );
}
