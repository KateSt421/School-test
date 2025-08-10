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

const STORAGE_KEY = 'searchFilterState';

export default function SearchFilter({ users, onFilterChange }: SearchFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState('');
  const [companyFilter, setCompanyFilter] = useState('all');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const urlSearch = searchParams.get('search') || '';
    const urlCompany = searchParams.get('company') || '';

    if (urlSearch || urlCompany) {
      setSearch(urlSearch);
      setCompanyFilter(urlCompany || 'all');
    } else {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored) as { search: string; company: string };
          setSearch(parsed.search || '');
          setCompanyFilter(parsed.company || 'all');
        } catch {
          /* ignore */
        }
      }
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps*/
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ search, company: companyFilter })
    );

    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (companyFilter !== 'all') params.set('company', companyFilter);

    const newQuery = params.toString();
    const currentQuery = searchParams.toString();

    if (newQuery !== currentQuery) {
      router.replace(`/?${newQuery}`, { scroll: false });
    }

    const filtered = users.filter(user => {
      const matchesSearch =
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase());

      const matchesCompany =
        companyFilter === 'all' ||
        (user.company?.name || '').toLowerCase() === companyFilter.toLowerCase();

      return matchesSearch && matchesCompany;
    });

    onFilterChange(filtered);
    /* eslint-disable-next-line react-hooks/exhaustive-deps*/
  }, [search, companyFilter, users]);

  const companies = Array.from(
    new Set(users.map(user => user.company?.name || '').filter(Boolean))
  );

  return (
    <div className="flex flex-col md:flex-row gap-4 w-full">
      <Input
        placeholder="Search by name or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="flex-1"
      />

      <Select value={companyFilter} onValueChange={setCompanyFilter}>
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