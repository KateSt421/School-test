export interface User {
  id: number | string;
  name: string;
  username: string;
  email: string;
  phone: string;
  website?: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  company: {
    name: string;
    catchPhrase?: string;
    bs?: string;
  };
}

export interface UserFormValues {
  name: string;
  username: string;
  email: string;
  phone: string;
  website?: string;
  company: {
    name: string;
  };
}
