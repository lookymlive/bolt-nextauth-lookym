// This is a mock database implementation
import { User, Video, Comment, Like } from './types';

let users: User[] = [];
let videos: Video[] = [];
let comments: Comment[] = [];
let likes: Like[] = [];

export const db = {
  user: {
    create: (data: Omit<User, 'id'>) => {
      const user = { id: String(users.length + 1), ...data };
      users.push(user);
      return user;
    },
    findUnique: (where: { id: string } | { email: string }) => {
      if ('id' in where) {
        return users.find(u => u.id === where.id);
      } else {
        return users.find(u => u.email === where.email);
      }
    },
  },
  video: {
    create: (data: Omit<Video, 'id'>) => {
      const video = { id: String(videos.length + 1), ...data };
      videos.push(video);
      return video;
    },
    findMany: () => videos,
  },
  comment: {
    create: (data: Omit<Comment, 'id'>) => {
      const comment = { id: String(comments.length + 1), ...data };
      comments.push(comment);
      return comment;
    },
    findMany: (where: { videoId: string }) => {
      return comments.filter(c => c.videoId === where.videoId);
    },
  },
  like: {
    create: (data: Omit<Like, 'id'>) => {
      const like = { id: String(likes.length + 1), ...data };
      likes.push(like);
      return like;
    },
    delete: (where: { userId: string, videoId: string }) => {
      const index = likes.findIndex(l => l.userId === where.userId && l.videoId === where.videoId);
      if (index !== -1) {
        likes.splice(index, 1);
      }
    },
    findUnique: (where: { userId: string, videoId: string }) => {
      return likes.find(l => l.userId === where.userId && l.videoId === where.videoId);
    },
  },
};