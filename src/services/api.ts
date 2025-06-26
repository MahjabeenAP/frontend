import axios, { AxiosError } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export interface ApiErrorResponse {
  message?: string;
  error?: string;
  [key: string]: any;
}

export interface Post {
  id: number;
  text_prompt: string;
  post_type: 'photo' | 'reel';
  status: 'not_ready' | 'ready' | 'published' | 'failed';
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
  post_type: 'photo' | 'reel';
  scheduled_time?: string | null;
}

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getPosts = async (filters?: { status?: string; post_type?: string }) => {
  try {
    const response = await api.get<{ posts: Post[] }>('/posts/', { params: filters });
    return response.data.posts;
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    throw new Error(
      axiosError.response?.data?.message || 
      axiosError.response?.data?.error ||
      'Failed to fetch posts'
    );
  }
};

export const createPost = async (postData: CreatePostData) => {
  try {
    const response = await api.post<{ post: Post }>('/posts/create/', postData);
    return response.data.post;
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    throw new Error(
      axiosError.response?.data?.message || 
      axiosError.response?.data?.error ||
      'Failed to create post'
    );
  }
};

export default api;
