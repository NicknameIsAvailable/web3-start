import { cookieStorage, createConfig, createStorage, http } from 'wagmi';
import { mainnet, optimism, sepolia, zora } from 'viem/chains';

export const config = createConfig({
  chains: [mainnet, sepolia, optimism, zora],
  ssr: true,
  storage: createStorage({
    storage: cookieStorage
  }),
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [optimism.id]: http(),
    [zora.id]: http()
  }
});
