'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/shadcn-components/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/shadcn-components/select';
import { useLocalUsers } from '@/hooks/useLocalUsers';
import { User } from '@/types/user';

interface SearchFilterProps {
  onFilterChange: (filteredUsers: User[]) => void;
}

export default function SearchFilter({ onFilterChange }: SearchFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { users } = useLocalUsers();

  // Инициализация состояния из URL параметров
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [companyFilter, setCompanyFilter] = useState(
    searchParams.get('company') || 'all'
  );

  // Получаем уникальные компании для фильтра
  const companies = Array.from(new Set(users.map(user => user.company.name)));

  // Обновление URL и фильтрация при изменении параметров
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (search) {
      params.set('search', search);
    } else {
      params.delete('search');
    }

    if (companyFilter !== 'all') {
      params.set('company', companyFilter);
    } else {
      params.delete('company');
    }

    // Сохраняем в URL без перезагрузки страницы
    router.replace(`/?${params.toString()}`, { scroll: false });

    // Применяем фильтры
    const filtered = users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase());
      const matchesCompany = companyFilter === 'all' || user.company.name === companyFilter;
      return matchesSearch && matchesCompany;
    });

    onFilterChange(filtered);
  }, [search, companyFilter, users, onFilterChange, router, searchParams]);

  return (
    <div className="flex flex-col md:flex-row gap-4 w-full">
      <Input
        placeholder="Search by name or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="flex-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
      />

      <Select
        value={companyFilter}
        onValueChange={setCompanyFilter}
      >
        <SelectTrigger className="w-[180px] border-gray-300 focus:border-blue-500 focus:ring-blue-500">
          <SelectValue placeholder="Filter by company" />
        </SelectTrigger>
        <SelectContent className="bg-white border-gray-300">
          <SelectItem value="all">All Companies</SelectItem>
          {companies.map(company => (
            <SelectItem
              key={company}
              value={company}
              className="hover:bg-blue-50 focus:bg-blue-50"
            >
              {company}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}