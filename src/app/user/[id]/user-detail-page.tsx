'use client';

import type { Metadata } from 'next';
import { useEffect, useState } from 'react';
import { notFound, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/shadcn-components/button';
import UserForm from '@/components/user-form';
import ErrorCard from '@/components/error-card';
import { useLocalUsers } from '@/hooks/use-local-users';
import { User } from '@/types/user';

interface PageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  return {
    title: `User ${params.id}`,
  };
}

export default function UserDetailPage({ params }: PageProps) {
  // 1. Все хуки вызываются в начале компонента
  const router = useRouter();
  const { getLocalUser, updateUser } = useLocalUsers();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // 2. Парсим ID и проверяем его валидность
  const id = parseInt(params.id);
  const isValidId = !isNaN(id);

  // 3. useEffect идет после всех хуков, но до любых условных возвратов
  useEffect(() => {
    if (!isValidId) {
      router.replace('/404');
      return;
    }

    const loadUser = async () => {
      try {
        setLoading(true);
        setError(null);
        const localUser = getLocalUser(id);

        if (!localUser) {
          router.replace('/404');
          return;
        }

        setUser(localUser);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load user');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [id, isValidId, getLocalUser, router]);

  // 4. Условные возвраты только после всех хуков
  if (!isValidId) {
    return notFound();
  }

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

  const handleBack = () => {
    router.push('/');
  };

  const handleUpdateUser = (updatedData: Partial<User>) => {
    updateUser(user.id, updatedData);
    setUser(prev => ({ ...prev!, ...updatedData }));
    setIsFormOpen(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto p-4 max-w-4xl"
    >
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-start mb-6">
          <Button
            variant="outline"
            onClick={handleBack}
            className="border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Back to Users
          </Button>
          <Button
            onClick={() => setIsFormOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Edit User
          </Button>
        </div>

        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Personal Info</h2>
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

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Company</h2>
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="text-gray-700">{user.company.name}</p>
              </div>
              {user.company.catchPhrase && (
                <div>
                  <p className="text-sm text-gray-500">Catch Phrase</p>
                  <p className="text-gray-700">{user.company.catchPhrase}</p>
                </div>
              )}
              {user.company.bs && (
                <div>
                  <p className="text-sm text-gray-500">Business</p>
                  <p className="text-gray-700">{user.company.bs}</p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Address</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Street</p>
                <p className="text-gray-700">{user.address.street}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Suite</p>
                <p className="text-gray-700">{user.address.suite}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">City</p>
                <p className="text-gray-700">{user.address.city}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Zipcode</p>
                <p className="text-gray-700">{user.address.zipcode}</p>
              </div>
            </div>
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