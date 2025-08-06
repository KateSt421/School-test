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

export type UserFormValues = {
  id?: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website?: string;
  address: Address;
  company: Company;
};