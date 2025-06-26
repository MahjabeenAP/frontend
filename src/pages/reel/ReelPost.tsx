import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

interface FormData {
  text_prompt: string;
  post_type: string;
  status: string;
}

const ReelPost: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    text_prompt: '',
    post_type: 'reel',
    status: 'not_ready'
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.text_prompt.trim()) {
      window.alert('Please enter a text prompt');
      return;
    }
    
    setIsSubmitting(true);

    try {
      const postData = {
        text_prompt: formData.text_prompt,
        post_type: formData.post_type,
        status: formData.status
      };
      
      console.log('Submitting post data:', postData);
      
      const response = await api.post('/posts/create/', postData);
      
      console.log('Server response:', response.data);
      
      if (response.data && response.data.status === 'success') {
        window.alert('Reel post created successfully!');
        setFormData({
          text_prompt: '',
          post_type: 'reel',
          status: 'not_ready'
        });
      } else {
        throw new Error('Failed to create post');
      }
    } catch (error: any) {
      console.error('Error creating post:', error);
      let errorMessage = 'Failed to create post. Please try again.';
      
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        
        if (error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        } else if (error.response.status === 400) {
          errorMessage = 'Invalid data. Please check your input and try again.';
        } else if (error.response.status === 500) {
          errorMessage = 'Server error. Please try again later.';
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
        errorMessage = 'No response from server. Please check your connection.';
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Request setup error:', error.message);
      }
      
      window.alert(errorMessage);
      console.error('Error creating reel post:', error);
      window.alert('Failed to create reel post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fafafa',
      fontFamily: '"Segoe UI", Roboto, sans-serif',
      padding: '20px'
    }}>
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '500px',
        padding: '1px',
        borderRadius: '20px',
        background: 'linear-gradient(to bottom right, #fdf497, #fd5949, #d6249f, #285AEB)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          position: 'relative',
          width: '100%',
          padding: '40px',
          borderRadius: '20px',
          backgroundColor: 'rgba(255, 255, 255, 0.98)',
          boxSizing: 'border-box',
          overflow: 'hidden'
        }}>
          {/* Instagram Reel Icon */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            opacity: 0.07,
            zIndex: 0,
            width: '200px',
            height: '200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.5 12.5l-8 4.5V8l8 4.5z" fill="#000"/>
            </svg>
          </div>

          {/* Header */}
          <div style={{
            textAlign: 'center',
            marginBottom: '30px',
            position: 'relative',
            zIndex: 1
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '15px',
              background: 'linear-gradient(45deg, #fdf497, #fd5949, #d6249f, #285AEB)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 15px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.5 12.5l-8 4.5V8l8 4.5z" fill="#fff"/>
              </svg>
            </div>
            <h1 style={{
              margin: '10px 0 5px',
              fontSize: '24px',
              fontWeight: 600,
              color: '#262626',
              letterSpacing: '0.3px'
            }}>
              Create New Instagram Reel Post
            </h1>
            <div style={{
              height: '3px',
              width: '40px',
              background: 'linear-gradient(45deg, #fdf497, #fd5949)',
              margin: '12px auto 0',
              borderRadius: '3px'
            }} />
          </div>
          
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '25px', position: 'relative', zIndex: 1 }}>
              <label htmlFor="text_prompt" style={{
                display: 'block',
                marginBottom: '10px',
                fontSize: '14px',
                fontWeight: 500,
                color: '#262626'
              }}>
                Enter your text prompt
              </label>
              <div style={{ position: 'relative' }}>
                <textarea
                  id="text_prompt"
                  name="text_prompt"
                  value={formData.text_prompt}
                  onChange={handleChange}
                  required
                  rows={5}
                  style={{
                    width: '100%',
                    padding: '14px 15px',
                    border: '1px solid #ddd',
                    borderRadius: '12px',
                    fontSize: '14px',
                    resize: 'vertical',
                    minHeight: '120px',
                    fontFamily: 'inherit',
                    backgroundColor: '#fff',
                    transition: 'all 0.2s ease',
                    outline: 'none',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                    boxSizing: 'border-box'
                  }}
                  placeholder="What's your reel about?"
                  onFocus={(e) => e.currentTarget.style.borderColor = '#999'}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#ddd'}
                />
              </div>
            </div>
            
            <div style={{ marginBottom: '25px', position: 'relative', zIndex: 1 }}>
              <label htmlFor="post_type" style={{
                display: 'block',
                marginBottom: '10px',
                fontSize: '14px',
                fontWeight: 500,
                color: '#262626'
              }}>
                Post Type
              </label>
              <div style={{ position: 'relative' }}>
                <div style={{
                  width: '100%',
                  padding: '14px 15px',
                  border: '1px solid #ddd',
                  borderRadius: '12px',
                  fontSize: '14px',
                  backgroundColor: '#fff',
                  color: '#262626',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  height: '48px',
                  boxSizing: 'border-box'
                }}>
                  Reel
                </div>
                <input type="hidden" name="post_type" value="reel" />
              </div>
            </div>

            <div style={{ marginBottom: '30px', position: 'relative', zIndex: 1 }}>
              <label htmlFor="status" style={{
                display: 'block',
                marginBottom: '10px',
                fontSize: '14px',
                fontWeight: 500,
                color: '#262626'
              }}>
                Status
              </label>
              <div style={{ position: 'relative' }}>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '14px 40px 14px 15px',
                    border: '1px solid #ddd',
                    borderRadius: '12px',
                    fontSize: '14px',
                    backgroundColor: '#fff',
                    color: '#262626',
                    cursor: 'pointer',
                    appearance: 'none',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                    outline: 'none',
                    transition: 'all 0.2s ease',
                    WebkitAppearance: 'none',
                    MozAppearance: 'none'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#999'}
                  onBlur={(e) => e.target.style.borderColor = '#ddd'}
                >
                  <option value="not_ready">Not Ready</option>
                  <option value="ready">Ready</option>
                </select>
                <div style={{
                  position: 'absolute',
                  right: '15px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  pointerEvents: 'none',
                  color: '#666',
                  fontSize: '12px'
                }}>
                  ▼
                </div>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
              <button
                type="button"
                onClick={() => navigate(-1)}
                style={{
                  flex: 1,
                  padding: '14px',
                  backgroundColor: '#f5f5f5',
                  color: '#262626',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '15px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#eee'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  flex: 2,
                  padding: '14px',
                  background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '15px',
                  fontWeight: 600,
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  opacity: isSubmitting ? 0.7 : 1,
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  boxShadow: '0 4px 15px rgba(188, 24, 136, 0.3)'
                }}
                onMouseOver={(e) => !isSubmitting && (e.currentTarget.style.transform = 'translateY(-1px)')}
                onMouseOut={(e) => !isSubmitting && (e.currentTarget.style.transform = 'translateY(0)')}
                onMouseDown={(e) => !isSubmitting && (e.currentTarget.style.transform = 'translateY(1px)')}
              >
                {isSubmitting ? (
                  <>
                    <span style={{
                      display: 'inline-block',
                      width: '16px',
                      height: '16px',
                      border: '2px solid rgba(255,255,255,0.3)',
                      borderTopColor: 'white',
                      borderRadius: '50%',
                      animation: 'spin 0.8s linear infinite'
                    }}></span>
                    Creating...
                  </>
                ) : 'Create Post'}
              </button>
            </div>
            <style>{
              `@keyframes spin {
                to { transform: rotate(360deg); }
              }`
            }</style>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReelPost;
