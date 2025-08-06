'use client';

import { Suspense, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/shadcn-components/button';
import UserCard from '@/components/user-card';
import SearchFilter from '@/components/search-filter';
import SkeletonLoader from '@/components/skeleton-loader';
import ErrorCard from '@/components/error-card';
import UserForm from '@/components/user-form';
import { useLocalUsers } from '@/hooks/use-local-users';
import { User, UserFormValues } from '@/types/user';

export default function HomePage() {
  const { users, loading, error, addUser, deleteUser } = useLocalUsers();
  const [showModal, setShowModal] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  // Инициализация отфильтрованных пользователей
  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  const handleAddUser = (formData: UserFormValues) => {
    const newUser: User = {
      ...formData,
      id: generateNewUserId(users),
      address: formData.address,
      company: formData.company
    };
    addUser(newUser);
    setShowModal(false);
  };

  if (error) return <ErrorCard message={error} />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-6 max-w-7xl"
    >
      <h1 className="text-3xl font-bold mb-6 text-gray-800">User Management</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6 items-start md:items-center">
        <SearchFilter onFilterChange={setFilteredUsers} />
        <Button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Add User
        </Button>
      </div>

      <Suspense fallback={<SkeletonLoader count={5} />}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading ? (
            <SkeletonLoader count={5} />
          ) : (
            filteredUsers.map(user => (
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

function generateNewUserId(users: User[]): number {
  return users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
}