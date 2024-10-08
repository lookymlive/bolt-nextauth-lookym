"use client"

import { useSession } from 'next-auth/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function DashboardPage() {
  const { data: session } = useSession();

  if (!session) {
    return <div>Acceso denegado. Por favor, inicia sesión.</div>;
  }

  const isBusinessAccount = session.user?.userType === 'business';

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Bienvenido, {session.user?.name}</CardTitle>
            <CardDescription>
              {isBusinessAccount ? 'Panel de control para tu negocio' : 'Tu espacio personal en Lookym'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {isBusinessAccount
                ? 'Gestiona tus videos y analiza el rendimiento de tu contenido.'
                : 'Explora videos, guarda tus favoritos y sigue a tus tiendas preferidas.'}
            </p>
          </CardContent>
        </Card>
        
        {isBusinessAccount && (
          <Card>
            <CardHeader>
              <CardTitle>Subir nuevo video</CardTitle>
              <CardDescription>Comparte tu último escaparate</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/upload">
                <Button>Subir video</Button>
              </Link>
            </CardContent>
          </Card>
        )}
        
        <Card>
          <CardHeader>
            <CardTitle>Actividad reciente</CardTitle>
            <CardDescription>Tus últimas interacciones</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Aquí se mostrarán tus últimas actividades, como videos vistos o comentarios realizados.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}