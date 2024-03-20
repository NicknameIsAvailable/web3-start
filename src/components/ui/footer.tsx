import React, { ReactNode } from 'react';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import Social from '@/components/ui/social';
import Telegram from '/public/icons/telegram.svg';
import Image from 'next/image';

type Link = {
  name: string;
  url: string;
  icon: ReactNode;
};

const Footer = () => {
  const links: Link[] = [
    {
      name: 'Github',
      url: 'https://github.com/NicknameIsAvailable/web3-start',
      icon: <GitHubLogoIcon />
    },
    {
      name: 'Telegram',
      url: 'https://t.me/NicknameIsAvailable',
      icon: <Image className='h-4 w-4' src={Telegram} alt='Telegram' />
    }
  ];

  return (
    <footer className='w-screen p-2 bg-background/70 border-t border-border backdrop-blur-xl'>
      <div className='container flex justify-between'>
        <div className='flex gap-6'>
          <h1 className='text-xl font-bold'>WEB3 Start</h1>
        </div>
        <div className='flex gap-6'>
          {links.map((link) => (
            <Social key={link.name} data={link} />
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
