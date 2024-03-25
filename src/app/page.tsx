import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <section className='container mx-auto bg-background'>
      <div className='flex min-h-full flex-col justify-center items-center gap-4'>
        <h1 className='text-9xl font-bold'>Awesome Chat</h1>
        <h2 className='text-4xl'>Анонимный децентрализованный глобальный чат</h2>
        <Link href='/chats'>
          <Button>Начать общение</Button>
        </Link>
      </div>
    </section>
  );
}
