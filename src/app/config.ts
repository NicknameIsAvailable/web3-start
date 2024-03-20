import { cookieStorage, createConfig, createStorage, http } from "wagmi";
import { mainnet, sepolia } from "viem/chains";

export const config = createConfig({
  chains: [mainnet, sepolia],
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});
