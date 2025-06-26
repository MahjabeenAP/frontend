export type PostStatus = 'not_ready' | 'ready' | 'published' | 'failed';
export type PostType = 'photo' | 'reel';

export interface Post {
  id: number;
  text_prompt: string;
  post_type: PostType;
  status: PostStatus;
  ai_caption: string | null;
  image_url: string[] | null;
  video_url: string | null;
  instagram_url: string | null;
  created_at: string;
  scheduled_time: string | null;
  updated_at: string;
}

export interface CreatePostData {
  text_prompt: string;
  post_type: PostType;
  scheduled_time?: string | null;
}
