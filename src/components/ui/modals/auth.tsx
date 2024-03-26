'use client';

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '../dialog';
import { Button } from '../button';
import { Label } from '../label';
import { Input } from '../input';
import { useAccount, useConnect, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi';
import { WalletOptions } from '@/components/ui/modals/wallet-option';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type Login = {
  nickname: string;
  password: string;
};

type Registration = {
  nickname: string;
  password: string;
  repeatPassword: string;
};

const AuthModal = () => {
  const loginForm = useForm<Login>();
  const registrationForm = useForm<Registration>();

  const loginSubmit: SubmitHandler<Login> = (data) => {};
  const registrationSubmit: SubmitHandler<Registration> = (data) => {};

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>Авторизоваться</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>Авторизация</DialogHeader>
        <WalletOptions
          disabled={!loginForm.formState.isValid && !registrationForm.formState.isValid}
          type='submit'
        />
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
