'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { formatAddress } from '@/lib/utils';
import AuthModal from '@/components/ui/modals/auth';
import { useAccount, useDisconnect } from 'wagmi';
import { config } from '@/web3/config';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { disconnect } from '@wagmi/core';

const ProfileBadge = () => {
  const { address } = useAccount();

  const account = useAccount({
    config
  });

  const connector = account.connector;
  const handleDisconnect = async () => {
    await disconnect(config);
  };

  return (
    <>
      {address && account ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Badge className='cursor-pointer'>
              <Image
                className='w-6 h-6 mr-4'
                width={24}
                height={24}
                src={connector?.icon || ''}
                alt={connector?.name || ''}
              />
              {formatAddress(address)}
            </Badge>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={handleDisconnect}>
              <LogOut className='w-6 h-6 mr-4' />
              Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <AuthModal />
      )}
    </>
  );
};

export default ProfileBadge;
