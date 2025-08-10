'use client';

import { Suspense, useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/shadcn-components/button';
import UserCard from '@/components/user/UserCard';
import UserForm from '@/components/user/UserForm';
import SkeletonLoader from '@/components/SkeletonLoader';
import { useLocalUsers } from '@/hooks/useLocalUsers';
import { User, UserFormValues } from '@/types/user';
import { motion } from 'framer-motion';
import ErrorCard from '@/components/ErrorCard';
import SearchFilterClient from '@/components/SearchFilterClient';
import { fetchUsers } from '@/lib/api';

const FILTER_IDS_KEY = 'users.filter.ids';

export default function HomePage() {
  const [showModal, setShowModal] = useState(false);
  const { users: localUsers, deleteUser, addUser } = useLocalUsers();
  const [apiUsers, setApiUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const apiData = await fetchUsers();
        const normalized = apiData.map(u => ({
          ...u,
          id: String(u.id),
        }));
        setApiUsers(normalized);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load users');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const mergedUsers = useMemo(() => {
    const localIds = new Set(localUsers.map(u => String(u.id)));
    return [
      ...localUsers,
      ...apiUsers.filter(u => !localIds.has(String(u.id))),
    ];
  }, [localUsers, apiUsers]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      setFilteredUsers(mergedUsers);
      return;
    }

    const raw = sessionStorage.getItem(FILTER_IDS_KEY);
    if (!raw) {
      setFilteredUsers(mergedUsers);
      return;
    }

    try {
      const ids: string[] = JSON.parse(raw);
      if (!Array.isArray(ids) || ids.length === 0) {
        setFilteredUsers(mergedUsers);
        return;
      }

      const idSet = new Set(ids);
      const present = mergedUsers.filter(u => idSet.has(String(u.id)));
      const orderIndex = (id: string) => ids.indexOf(id);
      present.sort((a, b) => orderIndex(String(a.id)) - orderIndex(String(b.id)));

      const localIdSet = new Set(localUsers.map(u => String(u.id)));
      const locals = present.filter(u => localIdSet.has(String(u.id)));
      const apiPart = present.filter(u => !localIdSet.has(String(u.id)));

      setFilteredUsers([...locals, ...apiPart]);
    } catch {
      setFilteredUsers(mergedUsers);
    }
  }, [mergedUsers, localUsers]);

  const handleFilterChange = (filtered: User[]) => {
    if (typeof window !== 'undefined') {
      const ids = filtered.map(u => String(u.id));
      const showAll = ids.length === mergedUsers.length &&
        ids.every((id, idx) => String(mergedUsers[idx].id) === id);
      if (showAll) {
        sessionStorage.removeItem(FILTER_IDS_KEY);
      } else {
        sessionStorage.setItem(FILTER_IDS_KEY, JSON.stringify(ids));
      }
    }

    const localIds = new Set(localUsers.map(u => String(u.id)));
    const locals = filtered.filter(u => localIds.has(String(u.id)));
    const apiPart = filtered.filter(u => !localIds.has(String(u.id)));
    setFilteredUsers([...locals, ...apiPart]);
  };

  const handleAddUser = (formData: UserFormValues) => {
    const newUser: User = {
      id: String(Date.now()),
      name: formData.name,
      username: formData.username,
      email: formData.email,
      phone: formData.phone,
      website: formData.website || '',
      address: { street: '', suite: '', city: '', zipcode: '' },
      company: { name: formData.company.name, catchPhrase: '', bs: '' },
    };
    addUser(newUser);
    setShowModal(false);

    sessionStorage.removeItem(FILTER_IDS_KEY);
  };

  const handleDeleteUser = (id: string | number) => {
    if (localUsers.some(u => String(u.id) === String(id))) {
      deleteUser(id);
    } else {
      setApiUsers(prev => prev.filter(user => String(user.id) !== String(id)));
    }
  };

  if (error) {
    return <ErrorCard message={error} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-6 max-w-7xl"
    >
      <h1 className="text-3xl font-bold mb-6 text-gray-800">User Management</h1>
      <div className="flex flex-col md:flex-row gap-4 mb-6 items-start md:items-center">
        <SearchFilterClient users={mergedUsers} onFilterChange={handleFilterChange} />
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
              <UserCard key={user.id} user={user} onDelete={handleDeleteUser} />
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

