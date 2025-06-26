import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';

interface ApiErrorResponse {
  message?: string;
  error?: string;
  [key: string]: any;
}

interface FormData {
  text_prompt: string;
  post_type: 'photo' | 'reel';
  status: 'not_ready' | 'ready' | 'published' | 'failed';
}

interface Post {
  id: number;
  text_prompt: string;
  post_type: 'photo' | 'reel';
  status: 'not_ready' | 'ready' | 'published' | 'failed';
  ai_caption: string | null;
  image_url: string[] | null;
  created_at: string;
  scheduled_time: string | null;
  updated_at: string;
}

const InstagramPostForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    text_prompt: '',
    post_type: 'photo',
    status: 'not_ready',
  });
  const [scheduledTime, setScheduledTime] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);

  const formStyles = {
    container: { 
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif' 
    },
    form: { 
      backgroundColor: '#fff', 
      padding: '20px', 
      borderRadius: '8px', 
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)', 
      marginBottom: '30px' 
    },
    formGroup: { 
      marginBottom: '15px' 
    },
    label: { 
      display: 'block', 
      marginBottom: '5px', 
      fontWeight: 'bold' 
    },
    input: { 
      width: '100%', 
      padding: '8px', 
      border: '1px solid #ddd', 
      borderRadius: '4px', 
      boxSizing: 'border-box' as const 
    },
    textarea: { 
      width: '100%', 
      padding: '8px', 
      border: '1px solid #ddd', 
      borderRadius: '4px', 
      minHeight: '100px', 
      resize: 'vertical' as const 
    },
    button: { 
      backgroundColor: '#4CAF50', 
      color: 'white', 
      padding: '10px 15px', 
      border: 'none', 
      borderRadius: '4px', 
      cursor: 'pointer', 
      fontSize: '16px' 
    },
    buttonDisabled: { 
      opacity: '0.6', 
      cursor: 'not-allowed' 
    },
    postsContainer: { 
      marginTop: '30px' 
    },
    postCard: { 
      backgroundColor: '#fff', 
      padding: '15px', 
      marginBottom: '15px', 
      borderRadius: '8px', 
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)' 
    },
    postTitle: { 
      margin: '0 0 10px 0', 
      color: '#333' 
    },
    postMeta: { 
      color: '#666', 
      fontSize: '0.9em', 
      marginBottom: '5px' 
    },
    status: { 
      display: 'inline-block', 
      padding: '2px 8px', 
      borderRadius: '12px', 
      fontSize: '0.8em', 
      fontWeight: 'bold' 
    },
    statusNotReady: { 
      backgroundColor: '#fff3cd', 
      color: '#856404' 
    },
    statusReady: { 
      backgroundColor: '#cce5ff', 
      color: '#004085' 
    },
    statusPublished: { 
      backgroundColor: '#d4edda', 
      color: '#155724' 
    },
    statusFailed: { 
      backgroundColor: '#f8d7da', 
      color: '#721c24' 
    }
  };

  const API_BASE_URL = 'http://127.0.0.1:8000';

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/posts/`);
      console.log('Posts response:', response);
      setPosts(response.data.posts || []);
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      const errorData = axiosError.response?.data || {};
      
      console.error('Error fetching posts:', {
        message: axiosError.message,
        response: errorData,
        status: axiosError.response?.status,
      });
      
      const errorMessage = errorData.message || 
                         errorData.error || 
                         axiosError.message || 
                         'Failed to load posts';
      toast.error(String(errorMessage));
    }
  };

  useEffect(() => { 
    fetchPosts(); 
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.text_prompt.trim()) return;
    
    setIsLoading(true);
    try {
      const postData = { 
        ...formData, 
        scheduled_time: scheduledTime || null 
      };
      
      await axios.post(`${API_BASE_URL}/posts/create/`, postData);
      toast.success('Post created successfully!');
      setFormData(prev => ({ ...prev, text_prompt: '' }));
      setScheduledTime('');
      await fetchPosts();
    } catch (error) {
      handleAxiosError(error as AxiosError, 'Failed to create post');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAxiosError = (error: AxiosError, defaultMessage: string) => {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    const errorData = axiosError.response?.data || {};
    
    console.error('Error:', {
      message: axiosError.message,
      response: errorData,
      status: axiosError.response?.status,
    });
    
    const errorMessage = errorData.message || 
                         errorData.error || 
                         axiosError.message || 
                         defaultMessage;
    toast.error(String(errorMessage));
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'ready': 
        return { ...formStyles.status, ...formStyles.statusReady };
      case 'published': 
        return { ...formStyles.status, ...formStyles.statusPublished };
      case 'failed': 
        return { ...formStyles.status, ...formStyles.statusFailed };
      default: 
        return { ...formStyles.status, ...formStyles.statusNotReady };
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div style={formStyles.container}>
      <form onSubmit={handleSubmit} style={formStyles.form}>
        <div style={formStyles.formGroup}>
          <label style={formStyles.label} htmlFor="text_prompt">
            Post Content
          </label>
          <textarea
            id="text_prompt"
            name="text_prompt"
            value={formData.text_prompt}
            onChange={handleInputChange}
            style={formStyles.textarea}
            placeholder="What's on your mind?"
            required
            disabled={isLoading}
          />
        </div>
        
        <div style={formStyles.formGroup}>
          <label style={formStyles.label} htmlFor="post_type">
            Post Type
          </label>
          <select
            id="post_type"
            name="post_type"
            value={formData.post_type}
            onChange={handleInputChange}
            style={formStyles.input}
            disabled={isLoading}
          >
            <option value="photo">Photo</option>
            <option value="reel">Reel</option>
          </select>
        </div>
        
        <div style={formStyles.formGroup}>
          <label style={formStyles.label} htmlFor="scheduledTime">
            Schedule Post (optional)
          </label>
          <input
            type="datetime-local"
            id="scheduledTime"
            value={scheduledTime}
            onChange={(e) => setScheduledTime(e.target.value)}
            style={formStyles.input}
            disabled={isLoading}
          />
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          style={isLoading ? 
            { ...formStyles.button, ...formStyles.buttonDisabled } : 
            formStyles.button
          }
        >
          {isLoading ? 'Creating...' : 'Create Post'}
        </button>
      </form>
      
      <div style={formStyles.postsContainer}>
        <h2>Your Posts</h2>
        {posts.length === 0 ? (
          <p>No posts yet. Create your first post above!</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} style={formStyles.postCard}>
              <h3 style={formStyles.postTitle}>{post.text_prompt}</h3>
              <div style={formStyles.postMeta}>
                Type: {post.post_type} • Status: {' '}
                <span style={getStatusStyle(post.status)}>
                  {post.status}
                </span>
                {post.scheduled_time && (
                  <div>Scheduled: {new Date(post.scheduled_time).toLocaleString()}</div>
                )}
                {!post.scheduled_time && (
                  <div>Created: {new Date(post.created_at).toLocaleString()}</div>
                )}
              </div>
              {post.ai_caption && (
                <div style={formStyles.postMeta}>
                  Caption: {post.ai_caption}
                </div>
              )}
              {post.image_url?.map((url, index) => (
                <img 
                  key={index} 
                  src={url} 
                  alt={`Post ${post.id} image ${index + 1}`} 
                  style={{ 
                    maxWidth: '100%', 
                    maxHeight: '300px',
                    objectFit: 'contain',
                    marginTop: '10px',
                    borderRadius: '4px'
                  }}
                />
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default InstagramPostForm;
