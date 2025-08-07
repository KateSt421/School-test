import { useState, useEffect, useCallback } from 'react';
import { User } from '@/types/user';
import { fetchUsers } from '@/lib/api';

export function useLocalUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const fetchedUsers = await fetchUsers();
        setUsers(fetchedUsers);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load users');
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const getLocalUser = useCallback((id: number) => {
    console.log(users.map(u => ({ id: u.id, type: typeof u.id })));
    return users.find(user => user.id === id);
  }, [users]);

  const addUser = (user: User) => {
    setUsers(prev => [...prev, user]);
  };

  const updateUser = (id: number, updatedUser: Partial<User>) => {
    setUsers(prev =>
      prev.map(user =>
        user.id === id ? { ...user, ...updatedUser } : user
      )
    );
  };

  const deleteUser = (id: number) => {
    setUsers(prev => prev.filter(user => user.id !== id));
  };

  return {
    users,
    loading,
    error,
    getLocalUser,
    addUser,
    updateUser,
    deleteUser,
  };
}