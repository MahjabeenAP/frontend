import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import Home from './pages/home/Home';
import ReelPost from './pages/reel/ReelPost';
import CarouselPostPage from './pages/carousel/CarouselPostPage';
import LoginPage from './pages/LoginPage';
import OauthCallbackPage from './pages/OauthCallbackPage';
import PrivacyPage from './pages/PrivacyPage';
import { AuthProvider } from './auth';
import ProtectedRoute from './ProtectedRoute';

// Create an Axios instance with default config
const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

interface FormData {
  text_prompt: string;
  post_type: 'photo' | 'reel';
  status: 'not_ready' | 'ready';
}

const PhotoPostPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    text_prompt: '',
    post_type: 'photo',
    status: 'not_ready'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value as any
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const postData = {
        text_prompt: formData.text_prompt,
        post_type: formData.post_type,
        status: formData.status
      };

      console.log('Submitting postData:', postData);
      const response = await api.post('/posts/create/', postData);
      
      if (response.data.status === 'success') {
        window.alert('Post created successfully!');
        setFormData({
          text_prompt: '',
          post_type: 'photo',
          status: 'not_ready'
        });
      }
    } catch (error) {
      console.error('Error creating post:', error);
      window.alert('Failed to create post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fafafa',
      padding: '20px',
      fontFamily: 'Segoe UI, Roboto, sans-serif'
    }}>

      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '500px',
        padding: '1px',
        borderRadius: '16px',
        background: 'linear-gradient(45deg, #fdf497, #fd5949, #d6249f, #285AEB)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
      }}>
        <div style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          padding: '40px',
          borderRadius: '16px',
          backgroundColor: 'rgba(255, 255, 255, 0.94)',
          boxSizing: 'border-box',
          overflow: 'hidden'
        }}>
        {/* Instagram Logo Watermark */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '200px',
          height: '200px',
          backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23e0e0e0\' stroke-width=\'1.5\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Crect x=\'2\' y=\'2\' width=\'20\' height=\'20\' rx=\'5\' ry=\'5\'%3E%3C/rect%3E%3Cpath d=\'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z\'%3E%3C/path%3E%3Cline x1=\'17.5\' y1=\'6.5\' x2=\'17.51\' y2=\'6.5\'%3E%3C/line%3E%3C/svg%3E")',
          backgroundSize: '100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.5,
          pointerEvents: 'none',
          zIndex: 0
        }} />
        
        {/* Content Wrapper */}
        <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '30px',
          padding: '0 20px'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '64px',
            height: '64px',
            borderRadius: '20px',
            background: 'white',
            marginBottom: '20px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
            border: '1px solid rgba(0,0,0,0.04)'
          }}>
            <svg 
              width="28" 
              height="28" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              style={{
                display: 'block'
              }}
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="url(#instagram-gradient)" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="white" fillOpacity="0.9" />
              <circle cx="17.5" cy="6.5" r="1.5" fill="white" fillOpacity="0.9" />
              <defs>
                <linearGradient id="instagram-gradient" x1="4" y1="4" x2="20" y2="20" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#fdf497" />
                  <stop offset="0.5" stopColor="#fd5949" />
                  <stop offset="1" stopColor="#d6249f" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h1 style={{
            margin: '0 0 5px',
            fontSize: '26px',
            fontWeight: 600,
            color: '#262626',
            letterSpacing: '0.3px',
            textShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            Create New Instagram Post
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
          <div style={{ marginBottom: '25px' }}>
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
                  border: '1px solid rgba(255,255,255,0.3)',
                  borderRadius: '12px',
                  fontSize: '14px',
                  resize: 'vertical',
                  minHeight: '120px',
                  fontFamily: 'inherit',
                  backgroundColor: 'rgba(255,255,255,0.9)',
                  transition: 'all 0.2s ease',
                  outline: 'none',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                  boxSizing: 'border-box'
                }}
                placeholder="What's on your mind?"
                onFocus={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)'}
                onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'}
              />
            </div>
          </div>
          
          <div style={{ marginBottom: '30px' }}>
            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="post_type" style={{
              display: 'block',
              marginBottom: '10px',
              fontSize: '14px',
              fontWeight: 500,
              color: '#262626'
            }}>
                Post Type
              </label>
              <select
                id="post_type"
                name="post_type"
                value={formData.post_type}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '14px 15px',
                  border: '1px solid rgba(255,255,255,0.3)',
                  borderRadius: '12px',
                  fontSize: '14px',
                  backgroundColor: 'rgba(255,255,255,0.9)',
                  color: '#262626',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                  height: '48px',
                  boxSizing: 'border-box',
                  marginBottom: '16px',
                }}
              >
                <option value="photo">Photo</option>
                <option value="reel">Reel</option>
              </select>
            </div>
            <div style={{ marginBottom: '20px' }}>
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
                    border: '1px solid rgba(255,255,255,0.3)',
                    borderRadius: '12px',
                    fontSize: '14px',
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    color: '#262626',
                    cursor: 'pointer',
                    appearance: 'none',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                    outline: 'none',
                    transition: 'all 0.2s ease',
                    WebkitAppearance: 'none',
                    MozAppearance: 'none'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.6)'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.3)'}
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
            </div>
          
          <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
            <Link to="/" style={{
              flex: 1,
              padding: '14px',
              backgroundColor: '#f5f5f5',
              color: '#262626',
              textDecoration: 'none',
              border: 'none',
              borderRadius: '12px',
              fontSize: '15px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              textAlign: 'center'
            }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#eee'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}>
Back
            </Link>
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
            ) : (
              'Create Post'
            )}
            </button>
          </div>
          <style>{
            `@keyframes spin {
              to { transform: rotate(360deg); }
            }`
          }</style>
        </form>
        </div> {/* End Content Wrapper */}
        </div> {/* End Inner White Background */}
      </div> {/* End Gradient Border Wrapper */}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/oauth-callback" element={<OauthCallbackPage />} />
          <Route path="/privacy-policy" element={<PrivacyPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Home />} />
          </Route>
          <Route path="/post-photo" element={<PhotoPostPage />} />
          <Route path="/create-reel" element={<ReelPost />} />
          <Route path="/create-carousel" element={<CarouselPostPage />} />
          <Route path="*" element={<LoginPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
