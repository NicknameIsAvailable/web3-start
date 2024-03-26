'use client';

import React from 'react';
import { useAccount, useChains, useSwitchChain } from 'wagmi';
import { config } from '@/web3/config';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../collapsible';
import { Button } from '../button';
import { ChevronsUpDown } from 'lucide-react';
import { Chain } from 'viem';

const Chains = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const chains = useChains({
    config
  });

  const { chain } = useAccount();

  const { switchChain } = useSwitchChain();

  const handleChangeChain = (chain: Chain) => {
    switchChain({
      chainId: chain.id
    });
  };

  if (chains)
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className='w-full space-y-2'>
        <div className='flex items-center justify-between space-x-4 px-4'>
          <h4 className='text-sm font-semibold'>Chains</h4>
          <CollapsibleTrigger asChild>
            <Button variant='ghost' size='sm' className='w-9 p-0'>
              <ChevronsUpDown className='h-4 w-4' />
              <span className='sr-only'>Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        {!isOpen && (
          <div className='rounded-md border px-4 py-3 font-mono text-sm'>{chain?.name}</div>
        )}

        <CollapsibleContent className='space-y-2'>
          {chains.map((chain: any) => (
            <Button
              variant='ghost'
              className='w-full'
              onClick={() => handleChangeChain(chain)}
              key={chain.name}
            >
              {chain.name}
            </Button>
          ))}
        </CollapsibleContent>
      </Collapsible>
    );
};

export default Chains;
