"use client"

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { db } from '@/lib/db';
import { Video } from '@/lib/types';

export default function VideoPage() {
  const { id } = useParams();
  const [video, setVideo] = useState<Video | null>(null);

  useEffect(() => {
    const fetchVideo = async () => {
      const fetchedVideos = db.video.findMany();
      const foundVideo = fetchedVideos.find(v => v.id === id);
      setVideo(foundVideo || null);
    };

    fetchVideo();
  }, [id]);

  if (!video) {
    return <div className="text-center mt-10">Video no encontrado</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>{video.title}</CardTitle>
          <CardDescription>Subido el {new Date(video.createdAt).toLocaleDateString()}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="aspect-w-16 aspect-h-9 mb-4">
            <iframe
              src={video.url}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
          <p className="text-sm text-muted-foreground">{video.description}</p>
        </CardContent>
      </Card>
    </div>
  );
}