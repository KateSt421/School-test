// lib/api.ts
import { User } from '@/types/user';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

export const fetchUsers = async (): Promise<User[]> => {
  const res = await fetch(API_URL, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
};

export const fetchUser = async (id: number): Promise<User> => {
  try {
    const res = await fetch(`${API_URL}/${id}`, { next: { revalidate: 3600 } });
    if (!res.ok) {
      // Для локальных пользователей возвращаем пустой объект с id
      return {
        id,
        name: '',
        username: '',
        email: '',
        phone: '',
        address: {
          street: '',
          suite: '',
          city: '',
          zipcode: '',
        },
        company: {
          name: '',
        },
      };
    }
    return res.json();
  } catch {
    // В случае ошибки возвращаем базовый объект пользователя
    return {
      id,
      name: '',
      username: '',
      email: '',
      phone: '',
      address: {
        street: '',
        suite: '',
        city: '',
        zipcode: '',
      },
      company: {
        name: '',
      },
    };
  }
};
