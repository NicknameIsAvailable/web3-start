import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../dialog';
import { Button } from '../button';
import { Label } from '../label';
import { Input } from '../input';
import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi';
import Image from 'next/image';
import { WalletOptions } from '@/components/ui/modals/wallet-option';

const AuthModal = () => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>Авторизоваться</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Подключение кошелька</DialogTitle>
        </DialogHeader>
        {ensAvatar && <Image alt='ENS Avatar' src={ensAvatar} />}
        {address && <div>{ensName ? `${ensName} (${address})` : address}</div>}

        <WalletOptions />
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
