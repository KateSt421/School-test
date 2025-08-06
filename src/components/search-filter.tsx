'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/shadcn-components/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/shadcn-components/select';
import { useLocalUsers } from '@/hooks/use-local-users';

export default function SearchFilter() {
  const { users } = useLocalUsers();
  const [search, setSearch] = useState('');
  const [companyFilter, setCompanyFilter] = useState<string>('all'); // Используем 'all' вместо пустой строки

  // Получаем уникальные компании для фильтра
  const companies = Array.from(new Set(users.map(user => user.company.name)));

  return (
    <div className="flex flex-col md:flex-row gap-4 w-full">
      <Input
        placeholder="Search by name..."
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