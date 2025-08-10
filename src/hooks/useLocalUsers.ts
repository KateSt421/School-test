'use client';

import { useState } from 'react';
import { User, UserFormValues } from '@/types/user';

const STORAGE_KEY = 'localUsers';

export function useLocalUsers() {
  const readFromStorage = (): User[] => {
    if (typeof window === 'undefined') return [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      return JSON.parse(raw) as User[];
    } catch (e) {
      console.error('useLocalUsers: parse error', e);
      return [];
    }
  };

  const [users, setUsers] = useState<User[]>(() => readFromStorage());

  const saveToStorage = (next: User[]) => {
    setUsers(next);
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      }
    } catch (e) {
      console.error('useLocalUsers: save error', e);
    }
  };

  const addUser = (formData: UserFormValues) => {
    const newUser: User = {
      id: String(Date.now()),
      name: formData.name,
      username: formData.username,
      email: formData.email,
      phone: formData.phone,
      website: formData.website || '',
      address: {
        street: '',
        suite: '',
        city: '',
        zipcode: '',
      },
      company: {
        name: formData.company?.name || '',
        catchPhrase: '',
        bs: '',
      },
    };

    saveToStorage([...users, newUser]);
    return newUser;
  };

  const updateUser = (id: number | string, updatedUser: User) => {
    const idStr = String(id);
    const idx = users.findIndex(u => String(u.id) === idStr);

    if (idx === -1) {
      saveToStorage([...users, { ...updatedUser, id: idStr }]);
    } else {
      const next = users.slice();
      next[idx] = { ...next[idx], ...updatedUser, id: idStr };
      saveToStorage(next);
    }
  };

  const deleteUser = (id: number | string) => {
    const idStr = String(id);
    saveToStorage(users.filter(u => String(u.id) !== idStr));
  };

  const getUser = (id: number | string) => {
    const idStr = String(id);
    return users.find(u => String(u.id) === idStr);
  };

  return {
    users,
    addUser,
    updateUser,
    deleteUser,
    getUser,
  };
}

export default useLocalUsers;
