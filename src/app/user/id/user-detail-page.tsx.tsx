'use client';

import { useEffect, useState } from 'react';
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
  const { users, updateUser } = useLocalUsers(); // Теперь updateUser доступен
  const id = parseInt(params.id);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        setError(null);

        const localUser = users.find(user => user.id === id);

        if (localUser) {
          setUser(localUser);
        } else {
          const apiUser = await fetchUser(id);
          setUser(apiUser);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load user');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [id, users]);

  const handleBack = () => {
    router.back();
  };

  const handleUpdateUser = (updatedData: Partial<User>) => {
    if (!user) return;

    // Обновляем и в локальном состоянии, и в глобальном хранилище
    updateUser(user.id, updatedData);
    setUser(prev => prev ? { ...prev, ...updatedData } : null);
    setIsFormOpen(false);
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
        <div className="flex justify-between items-start mb-6">
          <Button variant="outline" onClick={handleBack}>
            Back
          </Button>
          <Button onClick={() => setIsFormOpen(true)}>
            Edit User
          </Button>
        </div>

        <div className="space-y-4">
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-medium">Username:</p>
              <p>{user.username}</p>
            </div>
            <div>
              <p className="font-medium">Email:</p>
              <p>{user.email}</p>
            </div>
            <div>
              <p className="font-medium">Phone:</p>
              <p>{user.phone}</p>
            </div>
            <div>
              <p className="font-medium">Website:</p>
              <p>{user.website || '-'}</p>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Company</h2>
            <p>{user.company.name}</p>
            {user.company.catchPhrase && (
              <p className="text-muted-foreground">{user.company.catchPhrase}</p>
            )}
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Address</h2>
            <p>{user.address.street}, {user.address.suite}</p>
            <p>{user.address.city}, {user.address.zipcode}</p>
          </div>
        </div>

        <UserForm
          user={user}
          open={isFormOpen}
          onOpenChange={setIsFormOpen}
          onSubmit={handleUpdateUser}
          buttonText="Save Changes"
        />
      </div>
    </motion.div>
  );
}
