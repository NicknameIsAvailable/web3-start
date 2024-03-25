'use client';

import React, { useEffect, useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { MenuIcon } from 'lucide-react';
import { LanguageToggler } from '@/components/ui/language-toggler';
import { ThemeToggler } from '@/components/ui/theme-toggler';
import { Card } from '@/components/ui/card';
import { useSDK } from '@metamask/sdk-react';
import MetamaskLogo from '/public/icons/metamask.svg';
import Image from 'next/image';
import { cn, formatAddress, getAccount } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import EthLogo from '/public/icons/eth.svg';
import BnbLogo from '/public/icons/bnb.svg';
import { getBnbBalance } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from '../navigation-menu';
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import Link from 'next/link';
import { useAccount, useBalance, useChains, useConnect } from 'wagmi';
import { getBalance } from '@wagmi/core';
import { config } from '@/web3/config';
import Chains from '@/components/ui/layout/chains';

const LayoutDrawer = () => {
  const { address } = useAccount();

  const account = useAccount({
    config
  });

  const { data } = useBalance({ address });
  const { connector } = account;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='outline' size='icon'>
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className='py-6 flex flex-col gap-3 w-full justify-center items-center'>
          {account && address && (
            <Card className='flex flex-col gap-2 items-center p-4'>
              <div className='flex gap-3'>
                <Image
                  className='w-8 h-8 mr-4'
                  width={48}
                  height={48}
                  src={connector?.icon || ''}
                  alt={connector?.name || ''}
                />
                <h5 className='text-xl'>{formatAddress(address, 20) || ''}</h5>
              </div>
              <div className='w-full flex gap-2'>
                <Badge className='flex-1 flex items-center justify-center'>
                  <EthLogo className='mr-4 h-8 w-8' />
                  {`${data?.formatted} ${data?.symbol}` || '0x0'}
                </Badge>
              </div>
            </Card>
          )}

          <Chains />

          <NavigationMenu className='w-full'>
            <NavigationMenuList className='flex justify-center flex-col w-full gap-2'>
              <NavigationMenuItem className='w-full'>
                <Link href='/nft' legacyBehavior passHref className='w-full'>
                  <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), 'w-full')}>
                    My NFTs
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem className='w-full'>
                <Link href='/chats' legacyBehavior passHref className='w-full'>
                  <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), 'w-full')}>
                    Chats
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <SheetFooter>
          <div className='flex w-full justify-center gap-6 border-t border-border pt-3 mt-3'>
            <LanguageToggler />
            <ThemeToggler />
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default LayoutDrawer;
