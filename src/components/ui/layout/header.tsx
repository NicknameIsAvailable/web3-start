import React from 'react';
import { ThemeToggler } from '@/components/ui/theme-toggler';
import ProfileBadge from '@/components/ui/layout/profile-badge';
import Link from 'next/link';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '../sheet';
import { Button } from '../button';
import { MenuIcon } from 'lucide-react';
import { LanguageToggler } from '@/components/ui/language-toggler';
import LayoutDrawer from '@/components/ui/layout/layout-drawer';

const Header = () => {
  return (
    <>
      <div className='h-16 w-screen' />
      <header className='top-0 fixed w-screen p-2 bg-background/70 border-b border-border backdrop-blur-xl'>
        <div className='container flex justify-between'>
          <div className='flex gap-6'>
            <Link href='/'>
              <h1 className='text-xl font-bold'>WEB3 start</h1>
            </Link>
          </div>
          <div className='flex gap-4'>
            <ProfileBadge />
            <LayoutDrawer />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
