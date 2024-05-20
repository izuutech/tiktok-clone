export interface IVideo {
  id: string;
  username: string;
  type: 'video';
  caption: string;
  videoUrl: string;
  imageUrl: string;
  thumbnailUrl: string;
  likes: number;
  comments: number;
  shares: number;
  timestamp: Date;
}
