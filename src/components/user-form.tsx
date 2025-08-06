import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, UserFormValues } from '@/types/user';
import { userSchema, UserFormSchema } from '@/lib/validations';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/shadcn-components/dialog';
import {
  Form,
  // FormControl, FormField, FormItem, FormLabel, FormMessage 
} from '@/components/ui/shadcn-components/form';
// import { Input } from '@/components/ui/shadcn-components/input';
// import { Button } from '@/components/ui/shadcn-components/button';

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
  const form = useForm<UserFormSchema>({
    resolver: zodResolver(userSchema),
    defaultValues: user ? {
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
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{user ? 'Edit User' : 'Add New User'}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Все FormField остаются без изменений */}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
