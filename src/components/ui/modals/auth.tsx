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
        <Tabs>
          <TabsList className='grid w-full grid-cols-2'>
            <TabsTrigger value='auth'>Авторизация</TabsTrigger>
            <TabsTrigger value='registration'>Регистрация</TabsTrigger>
          </TabsList>
          <TabsContent value='auth' className='pt-4'>
            <form onSubmit={loginForm.handleSubmit(loginSubmit)} className='flex flex-col gap-4'>
              <div className='grid w-full max-w-sm items-center gap-1.5'>
                <Label htmlFor='email'>Твой никнейм</Label>
                <Input
                  {...loginForm.register('nickname', { required: true })}
                  type='login'
                  id='login'
                  placeholder='NicknameIsAvailable'
                />
              </div>
              <div className='grid w-full max-w-sm items-center gap-1.5'>
                <Label htmlFor='email'>Пароль</Label>
                <Input
                  {...loginForm.register('password', { required: true })}
                  type='password'
                  id='password'
                  placeholder='password123'
                />
              </div>
              <WalletOptions
                disabled={!loginForm.formState.isValid && !registrationForm.formState.isValid}
                type='submit'
              />
            </form>
          </TabsContent>
          <TabsContent value='registration' className='pt-4'>
            <form
              onSubmit={registrationForm.handleSubmit(registrationSubmit)}
              className='flex flex-col gap-4'
            >
              <div className='grid w-full max-w-sm items-center gap-1.5'>
                <Label htmlFor='email'>Твой никнейм</Label>
                <Input
                  {...registrationForm.register('nickname', { required: true })}
                  type='login'
                  id='login'
                  placeholder='NicknameIsAvailable'
                />
              </div>
              <div className='grid w-full max-w-sm items-center gap-1.5'>
                <Label htmlFor='email'>Пароль</Label>
                <Input
                  {...registrationForm.register('password', { required: true })}
                  type='password'
                  id='password'
                  placeholder='password123'
                />
              </div>
              <div className='grid w-full max-w-sm items-center gap-1.5'>
                <Label htmlFor='email'>Подтвердите пароль</Label>
                <Input
                  {...registrationForm.register('repeatPassword', { required: true })}
                  type='password'
                  id='password'
                  placeholder='password123'
                />
              </div>
              <WalletOptions
                disabled={!loginForm.formState.isValid && !registrationForm.formState.isValid}
                type='submit'
              />
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
