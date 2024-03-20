import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatAddress = (addr: string | undefined, length?: number) => {
  return `${addr?.substring(0, length || 8)}...`;
};

export async function getAccount() {
  let accounts;
  await window?.ethereum
    ?.request({
      method: 'eth_requestAccounts'
    })
    .catch((err) => {
      if (err.code === 4001) {
        console.log('Please connect to MetaMask.');
      } else {
        console.error(err);
      }
    })
    .then((response) => (accounts = response));

  return accounts;
}
