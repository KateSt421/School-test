import { User } from '@/types/user';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';


/**
 * Фильтрация пользователей по имени (поиск)
 * @param users Массив пользователей
 * @param searchTerm Поисковый запрос
 * @returns Отфильтрованный массив пользователей
 */
export const filterUsersByName = (users: User[], searchTerm: string): User[] => {
  if (!searchTerm) return users;
  return users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

export function generateUserId(users: User[]): number {
  if (users.length === 0) return 1;
  return Math.max(...users.map(u => u.id)) + 1;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Фильтрация пользователей по компании
 * @param users Массив пользователей
 * @param companyName Название компании
 * @returns Отфильтрованный массив пользователей
 */
export const filterUsersByCompany = (users: User[], companyName: string): User[] => {
  if (!companyName) return users;
  return users.filter(user =>
    user.company.name.toLowerCase().includes(companyName.toLowerCase())
  );
};

/**
 * Комбинированная фильтрация (поиск + фильтр по компании)
 * @param users Массив пользователей
 * @param filters Объект с параметрами фильтрации
 * @returns Отфильтрованный массив пользователей
 */
export const applyUsersFilters = (
  users: User[],
  filters: {
    searchTerm?: string;
    companyName?: string;
  }
): User[] => {
  let filteredUsers = [...users];

  if (filters.searchTerm) {
    filteredUsers = filterUsersByName(filteredUsers, filters.searchTerm);
  }

  if (filters.companyName) {
    filteredUsers = filterUsersByCompany(filteredUsers, filters.companyName);
  }

  return filteredUsers;
};

/**
 * Получение уникальных компаний из списка пользователей
 * @param users Массив пользователей
 * @returns Массив уникальных названий компаний
 */
export const getUniqueCompanies = (users: User[]): string[] => {
  const companies = new Set<string>();
  users.forEach(user => companies.add(user.company.name));
  return Array.from(companies).sort();
};

/**
 * Форматирование адреса пользователя в строку
 * @param address Объект адреса
 * @returns Отформатированная строка адреса
 */
export const formatAddress = (address: User['address']): string => {
  return `${address.street}, ${address.suite}, ${address.city}, ${address.zipcode}`;
};

/**
 * Валидация email
 * @param email Строка с email
 * @returns true если email валиден
 */
export const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

/**
 * Генерация уникального ID для новых пользователей
 * @param existingUsers Массив существующих пользователей
 * @returns Уникальный отрицательный ID
 */
export const generateUniqueId = (existingUsers: User[]): number => {
  if (existingUsers.length === 0) return -1;
  const minId = Math.min(...existingUsers.map(user => user.id));
  return minId - 1;
};

/**
 * Сортировка пользователей по имени
 * @param users Массив пользователей
 * @param direction Направление сортировки (asc/desc)
 * @returns Отсортированный массив пользователей
 */
export const sortUsersByName = (users: User[], direction: 'asc' | 'desc' = 'asc'): User[] => {
  return [...users].sort((a, b) => {
    const comparison = a.name.localeCompare(b.name);
    return direction === 'asc' ? comparison : -comparison;
  });
};

/**
 * Преобразование номера телефона к единому формату
 * @param phone Номер телефона
 * @returns Отформатированный номер
 */
export const formatPhoneNumber = (phone: string): string => {
  // Удаляем все нецифровые символы
  const cleaned = phone.replace(/\D/g, '');

  // Форматируем в зависимости от длины
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  if (cleaned.length === 11) {
    return `+${cleaned[0]} (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  }

  // Возвращаем исходный вариант, если не подходит под форматы
  return phone;
};
