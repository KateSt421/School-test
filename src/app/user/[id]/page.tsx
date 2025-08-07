'use client';

import { useEffect, useState, use } from 'react';
import { notFound, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/shadcn-components/button';
import UserForm from '@/components/user/UserForm';
import ErrorCard from '@/components/ErrorCard';
import { fetchUser } from '@/lib/api';
import { useLocalUsers } from '@/hooks/useLocalUsers';
import { User } from '@/types/user';

export default function UserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { users, updateUser } = useLocalUsers();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const { id } = use(params);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userId = parseInt(id);
        if (isNaN(userId)) {
          setError('Invalid user ID');
          return;
        }

        const localUser = users.find(u => u.id === userId);
        if (localUser) {
          setUser(localUser);
          return;
        }

        const apiUser = await fetchUser(userId);
        setUser(apiUser);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load user');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [id, users]);

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

  const handleUpdate = (updatedData: Partial<User>) => {
    updateUser(user.id, updatedData);
    setUser(prev => ({ ...prev!, ...updatedData }));
    setIsEditing(false);
  };

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

        <div className="space-y-4">
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

function UserInfoSection({ user }: { user: User }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <p className="text-sm text-gray-500">Username</p>
        <p>{user.username}</p>
      </div>
      <div>
        <p className="text-sm text-gray-500">Email</p>
        <p>{user.email}</p>
      </div>
      <div>
        <p className="text-sm text-gray-500">Phone</p>
        <p>{user.phone}</p>
      </div>
      <div>
        <p className="text-sm text-gray-500">Website</p>
        <p>{user.website || '-'}</p>
      </div>
    </div>
  );
}

function AddressSection({ address }: { address: User['address'] }) {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-2">Address</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Street</p>
          <p>{address.street}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Suite</p>
          <p>{address.suite}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">City</p>
          <p>{address.city}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Zipcode</p>
          <p>{address.zipcode}</p>
        </div>
      </div>
    </div>
  );
}

function CompanySection({ company }: { company: User['company'] }) {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-2">Company</h2>
      <div>
        <p className="text-sm text-gray-500">Name</p>
        <p>{company.name}</p>
      </div>
      {company.catchPhrase && (
        <div className="mt-2">
          <p className="text-sm text-gray-500">Catch Phrase</p>
          <p>{company.catchPhrase}</p>
        </div>
      )}
      {company.bs && (
        <div className="mt-2">
          <p className="text-sm text-gray-500">Business</p>
          <p>{company.bs}</p>
        </div>
      )}
    </div>
  );
}