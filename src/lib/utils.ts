import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { web3 } from '@/web3';

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

export const getBnbBalance = async () => {
  try {
    if (!window.ethereum) {
      console.error('MetaMask is not installed.');
      return;
    }

    const bnbBalance = await window.ethereum.request({
      method: 'eth_getBalance',
      params: [window.ethereum.selectedAddress, 'latest']
    });

    return bnbBalance;
  } catch (error) {
    console.error('Error fetching BNB balance:', error);
    return '0';
  }
};

export const getAccounts = async () => {
  try {
    const accounts = await web3.eth.getAccounts();
    return accounts;
  } catch (e) {
    console.log('Error getting accounts: ', e);
    return [];
  }
};
