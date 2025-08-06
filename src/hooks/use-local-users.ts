import { useState, useEffect } from 'react';
import { User } from '@/types/user';
import { fetchUsers } from '@/lib/api';

export const useLocalUsers = () => {
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

  const addUser = (user: User) => {
    setUsers(prev => {
      // Generate a unique negative ID for local users
      const newId = prev.length > 0 ? Math.min(...prev.map(u => u.id)) - 1 : -1;
      return [{ ...user, id: newId }, ...prev];
    });
  };

  const updateUser = (id: number, updatedUser: Partial<User>) => {
    setUsers(prev =>
      prev.map(user => (user.id === id ? { ...user, ...updatedUser } : user))
    );
  };

  const deleteUser = (id: number) => {
    setUsers(prev => prev.filter(user => user.id !== id));
  };

  return { users, loading, error, addUser, updateUser, deleteUser };
};
