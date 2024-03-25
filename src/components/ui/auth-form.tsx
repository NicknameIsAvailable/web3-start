'use client';

import React from 'react';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import ProfileBadge from '@/components/ui/layout/profile-badge';

const AuthForm = () => {
  const form = useForm();

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name='username'
        render={({ field }) => (
          <FormItem>
            <FormControl>{/*<ProfileBadge />*/}</FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </Form>
  );
};

export default AuthForm;
