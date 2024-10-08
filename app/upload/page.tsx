"use client"

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { db } from '@/lib/db';

export default function UploadPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const { data: session } = useSession();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.id) {
      alert('Debes iniciar sesión para subir un video.');
      return;
    }

    const video = db.video.create({
      title,
      description,
      url: videoUrl,
      userId: session.user.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    if (video) {
      router.push('/dashboard');
    }
  };

  if (session?.user?.userType !== 'business') {
    return <div className="text-center mt-10">Solo los comercios pueden subir videos.</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-80px)]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Subir nuevo video</CardTitle>
          <CardDescription>Comparte tu escaparate con la comunidad</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título del video</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="videoUrl">URL del video</Label>
              <Input
                id="videoUrl"
                type="url"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                required
                placeholder="https://ejemplo.com/tu-video.mp4"
              />
            </div>
            <Button type="submit" className="w-full">Subir video</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}