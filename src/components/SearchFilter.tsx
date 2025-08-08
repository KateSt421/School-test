// components/SearchFilter.tsx
'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Input } from '@/components/ui/shadcn-components/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/shadcn-components/select';
import { User } from '@/types/user';

interface SearchFilterProps {
  users: User[];
  onFilterChange: (filteredUsers: User[]) => void;
}

export default function SearchFilter({
  users,
  onFilterChange
}: SearchFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState('');
  const [companyFilter, setCompanyFilter] = useState('all');

  useEffect(() => {
    setSearch(searchParams.get('search') || '');
    setCompanyFilter(searchParams.get('company') || 'all');
  }, [searchParams]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (search) params.set('search', search);
    else params.delete('search');

    if (companyFilter !== 'all') params.set('company', companyFilter);
    else params.delete('company');

    router.replace(`/?${params.toString()}`, { scroll: false });

    const filtered = users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase());
      const matchesCompany = companyFilter === 'all' || user.company.name === companyFilter;
      return matchesSearch && matchesCompany;
    });

    onFilterChange(filtered);
  }, [search, companyFilter, users, onFilterChange, router, searchParams]);

  const companies = Array.from(new Set(users.map(user => user.company.name)));

  return (
    <div className="flex flex-col md:flex-row gap-4 w-full">
      <Input
        placeholder="Search by name or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="flex-1"
      />

      <Select
        value={companyFilter}
        onValueChange={setCompanyFilter}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by company" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Companies</SelectItem>
          {companies.map(company => (
            <SelectItem key={company} value={company}>
              {company}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}