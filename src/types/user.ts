export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
}

export interface Company {
  name: string;
  catchPhrase?: string;
  bs?: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website?: string;
  company: Company;
}

export interface UserFormValues {
  id?: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website?: string;
  company: {
    name: string;
  };
}
export type UserFormData = Omit<User, 'id'> & { id?: number };