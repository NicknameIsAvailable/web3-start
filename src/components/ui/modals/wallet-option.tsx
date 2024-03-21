import * as React from 'react';
import { Connector, useConnect } from 'wagmi';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export function WalletOptions() {
  const { connectors, connect } = useConnect();

  return (
    <div className={cn(connectors.length > 1 && 'grid grid-cols-2 gap-4')}>
      {connectors.map((connector) => (
        <WalletOption
          key={connector.uid}
          connector={connector}
          onClick={() => connect({ connector })}
        />
      ))}
    </div>
  );
}

function WalletOption({ connector, onClick }: { connector: Connector; onClick: () => void }) {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const provider = await connector.getProvider();
      setReady(!!provider);
    })();
  }, [connector]);

  return (
    <Button variant='outline' className='w-full' disabled={!ready} onClick={onClick}>
      <Image
        className='w-6 h-6 mr-4'
        width={24}
        height={24}
        src={connector.icon || ''}
        alt={connector.name}
      />
      {connector.name}
    </Button>
  );
}
