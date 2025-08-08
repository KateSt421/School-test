
// components/user/CompanySection.tsx
import { User } from '@/types/user';

interface CompanySectionProps {
  company: User['company'];
}

export default function CompanySection({ company }: CompanySectionProps) {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Company</h2>
      <div>
        <p className="text-sm text-gray-500">Name</p>
        <p className="text-gray-700">{company.name}</p>
      </div>
      {company.catchPhrase && (
        <div className="mt-4">
          <p className="text-sm text-gray-500">Catch Phrase</p>
          <p className="text-gray-700">{company.catchPhrase}</p>
        </div>
      )}
      {company.bs && (
        <div className="mt-4">
          <p className="text-sm text-gray-500">Business</p>
          <p className="text-gray-700">{company.bs}</p>
        </div>
      )}
    </div>
  );
}