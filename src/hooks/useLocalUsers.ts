import { useState, useEffect, useCallback } from 'react';
import { User } from '@/types/user';
import { fetchUsers } from '@/lib/api';

const LOCAL_STORAGE_KEY = 'users';

export function useLocalUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Загрузка данных
  useEffect(() => {
    const loadUsers = async () => {
      try {
        // Пробуем загрузить из localStorage
        const savedUsers = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (savedUsers) {
          setUsers(JSON.parse(savedUsers));
          setLoading(false);
          return;
        }

        // Если в localStorage нет, загружаем с API
        const fetchedUsers = await fetchUsers();
        setUsers(fetchedUsers);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(fetchedUsers));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load users');
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  // Сохраняем в localStorage при изменении
  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(users));
    }
  }, [users]);

  const getLocalUser = useCallback((id: number) => {
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