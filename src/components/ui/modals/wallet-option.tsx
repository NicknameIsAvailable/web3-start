import * as React from 'react';
import { Connector, useConnect } from 'wagmi';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface WalletOptionsProps {
  label?: string;
  disabled?: boolean;
  type?: 'reset' | 'button' | 'submit' | undefined;
  sideFunction?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

interface WalletOptionProps {
  label?: string;
  disabled?: boolean;
  type?: 'reset' | 'button' | 'submit' | undefined;
  connector: Connector;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const WalletOptions: React.FC<WalletOptionsProps> = ({
  label,
  disabled,
  type,
  sideFunction
}) => {
  const { connectors, connect } = useConnect();

  const handleConnect = (connector: Connector, event: React.MouseEvent<HTMLButtonElement>) => {
    connect({ connector });
    if (sideFunction) sideFunction(event);
  };

  return (
    <div className={cn(connectors.length > 1 && 'grid grid-cols-2 gap-4')}>
      {connectors.map((connector) => (
        <WalletOption
          disabled={disabled}
          key={connector.uid}
          type={type}
          connector={connector}
          label={label}
          onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
            handleConnect(connector, event);
          }}
        />
      ))}
    </div>
  );
};

const WalletOption: React.FC<WalletOptionProps> = ({
  label,
  connector,
  onClick,
  disabled,
  type
}) => {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const provider = await connector.getProvider();
      setReady(!!provider);
    })();
  }, [connector]);

  return (
    <Button type={type} disabled={disabled || !ready} className='w-full' onClick={onClick}>
      <Image
        className='w-6 h-6 mr-4'
        width={24}
        height={24}
        src={connector.icon || ''}
        alt={connector.name}
      />
      {label} {connector.name}
    </Button>
  );
};
