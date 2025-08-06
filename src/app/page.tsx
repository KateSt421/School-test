'use client';

import { Suspense, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/shadcn-components/button';
import UserCard from '@/components/user-card';
import SearchFilter from '@/components/search-filter';
import SkeletonLoader from '@/components/skeleton-loader';
import ErrorCard from '@/components/error-card';
import UserForm from '@/components/user-form';
import { useLocalUsers } from '@/hooks/use-local-users';
import { User } from '@/types/user'; // Импорт типа User

export default function HomePage() {
  const { users, loading, error, addUser, deleteUser } = useLocalUsers();
  const [showModal, setShowModal] = useState(false);

  if (error) return <ErrorCard message={error} />;

  const handleAddUser = (userData: Omit<User, 'id'>) => {
    const newUser: User = {
      ...userData,
      id: generateNewUserId(users), // Функция генерации нового ID
      address: userData.address || { street: '', suite: '', city: '', zipcode: '' },
      company: userData.company || { name: '', catchPhrase: '', bs: '' }
    };
    addUser(newUser);
    setShowModal(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto p-4"
    >
      <h1 className="text-3xl font-bold mb-6">User Management</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <SearchFilter />
        <Button onClick={() => setShowModal(true)}>
          Add User
        </Button>
      </div>

      <Suspense fallback={<SkeletonLoader count={5} />}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading ? (
            <SkeletonLoader count={5} />
          ) : (
            users.map(user => (
              <UserCard
                key={user.id}
                user={user}
                onDelete={deleteUser}
              />
            ))
          )}
        </div>
      </Suspense>

      <UserForm
        open={showModal}
        onOpenChange={setShowModal}
        onSubmit={handleAddUser}
      />
    </motion.div>
  );
}

// Вспомогательная функция для генерации ID
function generateNewUserId(users: User[]): number {
  return users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
}