// components/user/UserDetailSection.tsx
import { User } from '@/types/user';

interface UserDetailSectionProps {
  title: string;
  children: React.ReactNode;
}

export function UserDetailSection({ title, children }: UserDetailSectionProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      {children}
    </div>
  );
}

interface UserDetailItemProps {
  label: string;
  value: string | undefined;
}

export function UserDetailItem({ label, value }: UserDetailItemProps) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-gray-700">{value || '-'}</p>
    </div>
  );
}

interface UserAddressProps {
  address: User['address'];
}

export function UserAddress({ address }: UserAddressProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <UserDetailItem label="Street" value={address.street} />
      <UserDetailItem label="Suite" value={address.suite} />
      <UserDetailItem label="City" value={address.city} />
      <UserDetailItem label="Zipcode" value={address.zipcode} />
    </div>
  );
}

interface UserCompanyProps {
  company: User['company'];
}

export function UserCompany({ company }: UserCompanyProps) {
  return (
    <>
      <UserDetailItem label="Name" value={company.name} />
      {company.catchPhrase && <UserDetailItem label="Catch Phrase" value={company.catchPhrase} />}
      {company.bs && <UserDetailItem label="Business" value={company.bs} />}
    </>
  );
}
