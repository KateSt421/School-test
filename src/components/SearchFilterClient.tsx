'use client';

import { Suspense } from 'react';
import { User } from '@/types/user';
import SearchFilter from './SearchFilter';

interface SearchFilterClientProps {
  users: User[];
  onFilterChange: (filteredUsers: User[]) => void;
}

export default function SearchFilterClient({
  users,
  onFilterChange
}: SearchFilterClientProps) {
  return (
    <Suspense fallback={<div className="flex-1 h-10 bg-gray-200 rounded animate-pulse" />}>
      <SearchFilter users={users} onFilterChange={onFilterChange} />
    </Suspense>
  );
}