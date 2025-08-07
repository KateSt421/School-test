'use client';

import { useState, useEffect } from 'react';
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
  const { users } = useLocalUsers();
  const [search, setSearch] = useState('');
  const [companyFilter, setCompanyFilter] = useState<string>('all');

  // Получаем уникальные компании для фильтра
  const companies = Array.from(new Set(users.map(user => user.company.name)));

  // Фильтрация пользователей
  useEffect(() => {
    const filtered = users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase());
      const matchesCompany = companyFilter === 'all' || user.company.name === companyFilter;

      return matchesSearch && matchesCompany;
    });

    onFilterChange(filtered);
  }, [search, companyFilter, users, onFilterChange]);

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