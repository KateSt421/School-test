import { User } from '@/types/user';

interface AddressSectionProps {
  address: User['address'];
}

export default function AddressSection({ address }: AddressSectionProps) {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Address</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Street</p>
          <p className="text-gray-700">{address.street || '-'}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Suite</p>
          <p className="text-gray-700">{address.suite || '-'}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">City</p>
          <p className="text-gray-700">{address.city || '-'}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Zipcode</p>
          <p className="text-gray-700">{address.zipcode || '-'}</p>
        </div>
      </div>
    </div>
  );
}