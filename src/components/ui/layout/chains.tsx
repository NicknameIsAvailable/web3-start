'use client';

import React from 'react';
import { useChains } from 'wagmi';
import { config } from '@/web3/config';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../collapsible';
import { Button } from '../button';
import { ChevronsUpDown } from 'lucide-react';

const Chains = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const chains = useChains({
    config
  });

  console.log(123, chains);

  if (chains)
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className='w-[350px] space-y-2'>
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
          <div className='rounded-md border px-4 py-3 font-mono text-sm'>{chains[0]?.name}</div>
        )}

        <CollapsibleContent className='space-y-2'>
          {chains.map((chain: any) => (
            <div key={chain.name} className='rounded-md border px-4 py-3 font-mono text-sm'>
              {chain.name}
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>
    );
};

export default Chains;
