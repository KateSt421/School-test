'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, UserFormValues } from '@/types/user';
import { userSchema } from '@/lib/validations';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/shadcn-components/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/shadcn-components/form';
import { Input } from '@/components/ui/shadcn-components/input';
import { Button } from '@/components/ui/shadcn-components/button';

interface UserFormProps {
  user?: User;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: UserFormValues) => void;
  buttonText?: string;
}

export default function UserForm({
  user,
  open,
  onOpenChange,
  onSubmit,
  buttonText = 'Add User',
}: UserFormProps) {
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      phone: '',
      website: '',
      company: {
        name: '',
        catchPhrase: '',
        bs: '',
      },
      address: {
        street: '',
        suite: '',
        city: '',
        zipcode: '',
      },
    },
  });

  useEffect(() => {
    if (open) {
      form.reset(user ? {
        ...user,
        website: user.website || ''
      } : {
        name: '',
        username: '',
        email: '',
        phone: '',
        website: '',
        company: {
          name: '',
          catchPhrase: '',
          bs: '',
        },
        address: {
          street: '',
          suite: '',
          city: '',
          zipcode: '',
        },
      });
    }
  }, [open, user, form]);

  return (
    <Dialog open={open} onOpenChange={(open) => {
      if (!open) form.reset();
      onOpenChange(open);
    }}>
      <DialogContent className="sm:max-w-[600px] bg-white rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-gray-800 text-xl font-semibold">
            {user ? 'Edit User' : 'Add New User'}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Name</FormLabel>
                  <FormControl>
                    <Input className="border-gray-300 focus:border-blue-500 focus:ring-blue-500" placeholder="Full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Username</FormLabel>
                  <FormControl>
                    <Input className="border-gray-300 focus:border-blue-500 focus:ring-blue-500" placeholder="Username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Email</FormLabel>
                  <FormControl>
                    <Input className="border-gray-300 focus:border-blue-500 focus:ring-blue-500" placeholder="Email" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Phone</FormLabel>
                  <FormControl>
                    <Input className="border-gray-300 focus:border-blue-500 focus:ring-blue-500" placeholder="Phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Website</FormLabel>
                  <FormControl>
                    <Input className="border-gray-300 focus:border-blue-500 focus:ring-blue-500" placeholder="Website URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="company.name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Company Name</FormLabel>
                    <FormControl>
                      <Input className="border-gray-300 focus:border-blue-500 focus:ring-blue-500" placeholder="Company name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="company.catchPhrase"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Catch Phrase</FormLabel>
                    <FormControl>
                      <Input className="border-gray-300 focus:border-blue-500 focus:ring-blue-500" placeholder="Company slogan" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Добавляем поля для адреса */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="address.street"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Street</FormLabel>
                    <FormControl>
                      <Input className="border-gray-300 focus:border-blue-500 focus:ring-blue-500" placeholder="Street" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address.suite"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Suite</FormLabel>
                    <FormControl>
                      <Input className="border-gray-300 focus:border-blue-500 focus:ring-blue-500" placeholder="Suite" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address.city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">City</FormLabel>
                    <FormControl>
                      <Input className="border-gray-300 focus:border-blue-500 focus:ring-blue-500" placeholder="City" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address.zipcode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Zipcode</FormLabel>
                    <FormControl>
                      <Input className="border-gray-300 focus:border-blue-500 focus:ring-blue-500" placeholder="Zipcode" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
                onClick={() => {
                  form.reset();
                  onOpenChange(false);
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {buttonText}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}