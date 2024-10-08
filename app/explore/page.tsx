"use client"

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { db } from '@/lib/db';
import { Video } from '@/lib/types';
import Link from 'next/link';

export default function ExplorePage() {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const fetchedVideos = db.video.findMany();
      setVideos(fetchedVideos);
    };

    fetchVideos();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Explorar videos</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {videos.map((video) => (
          <Card key={video.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{video.title}</CardTitle>
              <CardDescription>{new Date(video.createdAt).toLocaleDateString()}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground">{video.description}</p>
            </CardContent>
            <CardFooter>
              <Link href={`/video/${video.id}`} passHref>
                <Button className="w-full">Ver video</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}