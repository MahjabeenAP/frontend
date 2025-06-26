import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { usePostForm } from '../hooks/usePostForm';
import type { Post } from '../types/post';
import { getPosts, createPost } from '../services/api';

import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Textarea } from './ui/Textarea';
import { Select } from './ui/Select';
import { PostCard } from './PostCard';


const postTypeOptions = [
  { value: 'photo', label: 'Photo' },
  { value: 'reel', label: 'Reel' },
];

const initialFormState = {
  text_prompt: '',
  post_type: 'photo' as const,
};

export const NewInstagramPostForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [scheduledTime, setScheduledTime] = useState('');
  
  const {
    formData,
    errors,
    handleChange,
    validate,
    resetForm,
  } = usePostForm(initialFormState);

  const fetchPosts = useCallback(async () => {
    try {
      const posts = await getPosts();
      setPosts(posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to load posts');
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    setIsLoading(true);
    
    try {
      const postData = {
        ...formData,
        scheduled_time: scheduledTime || null,
      };
      
      await createPost(postData);
      toast.success('Post created successfully!');
      resetForm();
      setScheduledTime('');
      await fetchPosts();
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to create post');
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem' }}>
      <Card title="Create New Post" style={{ marginBottom: '2rem' }}>
        <form onSubmit={handleSubmit}>
          <Textarea
            label="Text Prompt"
            name="text_prompt"
            value={formData.text_prompt}
            onChange={handleChange}
            error={errors.text_prompt}
            placeholder="Describe your post..."
            rows={4}
          />
          
          <Select
            label="Post Type"
            name="post_type"
            value={formData.post_type}
            onChange={handleChange}
            options={postTypeOptions}
            error={errors.post_type}
          />
          
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
              Scheduled Time (optional)
            </label>
            <input
              type="datetime-local"
              value={scheduledTime}
              onChange={(e) => setScheduledTime(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #E5E7EB',
                borderRadius: '0.375rem',
                fontSize: '1rem',
              }}
            />
          </div>
          
          <Button 
            type="submit" 
            variant="primary"
            isLoading={isLoading}
            style={{ width: '100%' }}
          >
            Create Post
          </Button>
        </form>
      </Card>
      
      <div>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Your Posts</h2>
        {posts.length === 0 ? (
          <Card>
            <p style={{ margin: 0, color: '#6B7280' }}>No posts yet. Create your first post above!</p>
          </Card>
        ) : (
          <div>
            {posts.map((post) => (
              <PostCard 
                key={post.id} 
                post={post} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewInstagramPostForm;
