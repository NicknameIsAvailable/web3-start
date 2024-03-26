'use client';

import { AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { DropdownMenuContent } from '@/components/ui/dropdown-menu';
import { config } from '@/web3/config';
import { Avatar } from '@radix-ui/react-avatar';
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { ChevronDown } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useAccount, useBalance, useReadContract, useSwitchChain } from 'wagmi';
import { Chain } from 'viem';
import { getBalance, GetBalanceReturnType } from '@wagmi/core';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import Contract from '@/components/ui/modals/contract';
import Link from 'next/link';
import { formatAddress } from '@/lib/utils';
import ClickToCopy from '@/components/ui/click-to-copy';

const Page = () => {
  const [balance, setBalance] = useState<GetBalanceReturnType>();

  const account = useAccount({
    config
  });

  const { connector } = account;

  const { data } = useBalance({
    address: account.address
  });

  const { chains, switchChain } = useSwitchChain();

  const handleChangeChain = async (chain: Chain) => {
    switchChain({ chainId: chain.id });
  };

  const chainContracts = Object.entries(account?.chain?.contracts || {});

  return (
    <section className='container mx-auto flex flex-col gap-4'>
      <div className='flex justify-between items-center w-full'>
        <div className='flex gap-2 items-center'>
          <Avatar>
            <AvatarImage src={connector?.icon} alt={account.address} />
            <AvatarFallback>{account.address?.slice(3, 6)}</AvatarFallback>
          </Avatar>
          <ClickToCopy value={account.address}>
            <h1 className='text-2xl'>{formatAddress(account.address)}</h1>
          </ClickToCopy>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant='outline'>
              <ChevronDown className='mr-2' />
              {account?.chain?.name}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {chains.map((chain) => (
              <DropdownMenuItem
                onClick={() => handleChangeChain(chain)}
                className='p-2'
                key={chain.id}
              >
                {chain.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {data && (
        <Card className='p-4 flex flex-col gap-2'>
          <span className='text-xl font-bold'>Баланс</span>
          <span className='text-2xl font-bold'>
            {data?.formatted} {data?.symbol}
          </span>
        </Card>
      )}
      <h2 className='text-4xl font-bold'>{account?.chain?.name}</h2>
      <hr />
      <h3 className='text-3xl font-bold'>Контракты</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Имя</TableHead>
            <TableHead>Адрес контракта</TableHead>
            <TableHead>Блок создан</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {chainContracts.map((contract) => (
            <TableRow key={contract[0]}>
              <TableCell>{contract[0]}</TableCell>
              <TableCell>
                {contract[1].address ? (
                  <Link
                    href={`https://etherscan.io/address/${contract[1].address}`}
                    target='_blank'
                  >
                    <Button variant='link'>{contract[1].address || '-'}</Button>
                  </Link>
                ) : (
                  <span className='text-center'>-</span>
                )}
              </TableCell>
              <TableCell>
                {contract[1].blockCreated || <span className='text-center'>-</span>}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};

export default Page;
