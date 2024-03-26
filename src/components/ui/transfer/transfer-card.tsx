'use client';

import React, { useState } from 'react';
import { Card } from '../card';
import { Input } from '../input';
import { useAccount, useSendTransaction } from 'wagmi';
import { Label } from '../label';
import { Button } from '../button';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useToast } from '../use-toast';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { parseEther, parseGwei, parseUnits } from 'viem';

interface Inputs {
  from: string;
  to: `0x${string}`;
  amount: bigint;
}

const TransferCard = () => {
  const [value, setValue] = useState<'ETH' | 'Gwei'>('Gwei');
  const { toast } = useToast();
  const { address } = useAccount();
  const transaction = useSendTransaction();
  const form = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const values = {
      ETH: parseEther(String(data.amount)),
      Gwei: parseGwei(String(data.amount))
    };

    transaction.sendTransaction({
      to: data.to,
      value: values[value]
    });

    if (transaction.isPending) {
      toast({
        title: 'Транзакция в процессе...'
      });
    }

    if (transaction.isSuccess) {
      toast({
        title: 'Транзакция выполнена!'
      });
    }

    if (transaction.isError) {
      toast({
        variant: 'destructive',
        title: 'Ошибка при выполнении транзакции'
      });
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Card className='w-96 p-4 border-box flex flex-col gap-4 mx-auto'>
        <div className='grid w-full max-w-sm items-center gap-1.5'>
          <Label htmlFor='from'>Откуда</Label>
          <Input
            {...form.register('from', { required: true })}
            type='text'
            id='from'
            placeholder='address'
            value={address}
          />
        </div>
        <div className='grid w-full max-w-sm items-center gap-1.5'>
          <Label htmlFor='to'>Куда</Label>
          <Input
            {...form.register('to', { required: true })}
            type='text'
            id='to'
            placeholder={address}
          />
        </div>
        <div className='grid w-full max-w-sm items-center gap-1.5'>
          <Label htmlFor='amount'>Сколько</Label>
          <Input
            {...form.register('amount', { required: true })}
            type='number'
            id='amount'
            defaultValue={0}
            placeholder='0.0'
          />
          <Select defaultValue='Gwei'>
            <SelectTrigger>
              <SelectValue placeholder='Выбери валюту' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem onClick={() => setValue('ETH')} value='ETH'>
                  ETH
                </SelectItem>
                <SelectItem onClick={() => setValue('Gwei')} value='Gwei'>
                  Gwei
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Button type='submit'>Перевести</Button>
      </Card>
    </form>
  );
};

export default TransferCard;
