import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
      <h1 className="text-5xl font-bold mb-6 text-center">
        Bienvenido a <span className="text-primary">Lookym</span>
      </h1>
      <p className="text-xl mb-8 text-center max-w-2xl">
        Descubre y comparte videos de escaparates y vidrieras. Conecta con comercios y explora las últimas tendencias en diseño de tiendas.
      </p>
      <div className="flex space-x-4">
        <Link href="/explore">
          <Button size="lg">Explorar videos</Button>
        </Link>
        <Link href="/auth/register">
          <Button size="lg" variant="outline">Unirse ahora</Button>
        </Link>
      </div>
    </div>
  );
}