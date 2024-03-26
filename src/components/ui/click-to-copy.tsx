'use client';

import React, { ReactNode, useState } from 'react';
import { Button } from './button';
import { ClipboardCheck, ClipboardCopy } from 'lucide-react';
import { toast } from 'sonner';
import { useToast } from './use-toast';

interface Props {
  value: any;
  children: ReactNode;
}

const ClickToCopy: React.FC<Props> = ({ value, children }) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState<boolean>(false);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(value)
      .then(() => {
        toast({ title: 'Текст скопирован в буфер обмена' });
        console.log('copied');
        setCopied(true);
      })
      .catch((error) => {
        toast({ title: 'Ошибка при копировании текста' });
        console.log(error);
      });
  };

  return (
    <>
      {children}
      <Button variant={!copied ? 'outline' : 'default'} size='icon' onClick={copyToClipboard}>
        {copied ? <ClipboardCheck /> : <ClipboardCopy />}
      </Button>
    </>
  );
};

export default ClickToCopy;
