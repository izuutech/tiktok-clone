export interface IVideo {
  id: string;
  username: string;
  type: 'video';
  caption: string;
  likes: number;
  comments: number;
  shares: number;
  timestamp: Date;
  media: {
    type: 'video' | 'image';
    videoUrl: string;
    imageUrl: string;
    previewUrl: string;
  };
  profilePhotoUrl: string;
}
