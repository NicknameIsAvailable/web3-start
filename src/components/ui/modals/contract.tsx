'use client';

import React, { useState } from 'react';
import { Dialog, DialogHeader, DialogTrigger, DialogContent, DialogTitle } from '../dialog';
import { Address } from 'viem';
import { Button } from '../button';
import { useReadContract } from 'wagmi';
import { formatAddress } from '@/lib/utils';
import { config } from '@/web3/config';
import { abi } from '@/web3/abi';

interface Props {
  address: Address;
}

const Contract: React.FC<Props> = ({ address }) => {
  const contract = useReadContract({
    abi,
    address,
    functionName: 'balanceOf'
  });

  console.log(contract);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='link'>{address}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Контракт {formatAddress(address)}</DialogTitle>
        </DialogHeader>
        <div>asdasdsad</div>
      </DialogContent>
    </Dialog>
  );
};

export default Contract;
