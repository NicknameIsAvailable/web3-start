import TransferCard from '@/components/ui/transfer/transfer-card';

export default function Home() {
  return (
    <section className='container mx-auto flex flex-col gap-4 h-full'>
      <h1 className='text-4xl font-bold text-center'>Перевод</h1>
      <TransferCard />
    </section>
  );
}
