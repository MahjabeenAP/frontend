import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface FormData {
  text_prompt: string;
  number_of_images: number;
  status: 'ready' | 'not_ready';
}

const CarouselPostPage: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    text_prompt: '',
    number_of_images: 5,
    status: 'not_ready'
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'number_of_images' ? parseInt(value, 10) : value
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
      const response = await fetch('http://localhost:8000/api/carousel/posts/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',  // Important for cookies
        body: JSON.stringify({
          text_prompt: formData.text_prompt,
          number_of_images: formData.number_of_images,
          status: formData.status === 'ready' ? 'Ready' : 'Not Ready'
        })
      });

      // Check if response is JSON before parsing
      const contentType = response.headers.get('content-type') || '';
      const responseText = await response.text();
      
      console.log('Request URL:', 'http://localhost:8000/api/carousel/posts/');
      console.log('Request body:', JSON.stringify({
        text_prompt: formData.text_prompt,
        number_of_images: formData.number_of_images,
        status: formData.status === 'ready' ? 'Ready' : 'Not Ready'
      }, null, 2));
      console.log('Response status:', response.status);
      console.log('Content-Type:', contentType);
      console.log('Response text:', responseText);
      
      if (!contentType.includes('application/json')) {
        console.error('Expected JSON, got:', {
          status: response.status,
          statusText: response.statusText,
          contentType,
          responseText
        });
        throw new Error(`Server returned non-JSON response (${response.status} ${response.statusText})`);
      }

      const data = JSON.parse(responseText);

      if (!response.ok) {
        throw new Error(data.error || data.detail || data.message || 'Failed to create carousel post');
      }
      
      // Show success message
      window.alert('Carousel post created successfully!');
      
      // Clear the form
      setFormData({
        text_prompt: '',
        number_of_images: 5,
        status: 'not_ready'
      });
      
      // Optionally redirect after successful submission
      // navigate('/dashboard');
      
    } catch (error: unknown) {
      console.error('Error creating carousel post:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to create carousel post. Please try again.';
      window.alert(errorMessage);
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
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            opacity: 0.5,
            pointerEvents: 'none',
            zIndex: 0
          }}></div>

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ textAlign: 'center', marginBottom: '30px', padding: '0 20px' }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '15px',
                background: 'linear-gradient(45deg, #fdf497, #fd5949, #d6249f, #285AEB)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 15px',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.5 12.5l-8 4.5V8l8 4.5z" fill="#fff"/>
                </svg>
              </div>
              <h1 style={{
                margin: '0 0 8px 0',
                fontSize: '24px',
                fontWeight: 600,
                color: '#333'
              }}>Create New Carousel Post</h1>
              <p style={{
                margin: '0 0 15px 0',
                color: '#666',
                fontSize: '14px',
                lineHeight: '1.5'
              }}>Create engaging carousel posts with multiple images</p>
              <div style={{
                height: '3px',
                width: '40px',
                background: 'linear-gradient(45deg, #fdf497, #fd5949)',
                margin: '0 auto 15px',
                borderRadius: '3px'
              }} />
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '20px' }}>
                <label htmlFor="text_prompt" style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#333'
                }}>Enter Your Text Prompt</label>
                <textarea
                  id="text_prompt"
                  name="text_prompt"
                  value={formData.text_prompt}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    backgroundColor: '#fff',
                    fontSize: '14px',
                    minHeight: '120px',
                    resize: 'vertical',
                    boxSizing: 'border-box'
                  }}
                  placeholder="Describe the carousel post you want to create..."
                  required
                />
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <label htmlFor="number_of_images" style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#333'
                }}>Number of Images</label>
                <select
                  id="number_of_images"
                  name="number_of_images"
                  value={formData.number_of_images}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    backgroundColor: '#fff',
                    fontSize: '14px',
                    cursor: 'pointer',
                    appearance: 'none',
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'12\' height=\'8\' viewBox=\'0 0 12 8\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M1 1.5L6 6.5L11 1.5\' stroke=\'%23333\' stroke-width=\'1.5\' stroke-linecap=\'round\' stroke-linejoin=\'round\'/%3E%3C/svg%3E")',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 12px center',
                    paddingRight: '36px',
                    boxSizing: 'border-box'
                  }}
                  required
                >
                  <option value={5}>5 Images</option>
                  <option value={6}>6 Images</option>
                  <option value={7}>7 Images</option>
                </select>
              </div>
              
              <div style={{ marginBottom: '24px' }}>
                <label htmlFor="status" style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#333'
                }}>Status</label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    backgroundColor: '#fff',
                    fontSize: '14px',
                    cursor: 'pointer',
                    appearance: 'none',
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'12\' height=\'8\' viewBox=\'0 0 12 8\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M1 1.5L6 6.5L11 1.5\' stroke=\'%23333\' stroke-width=\'1.5\' stroke-linecap=\'round\' stroke-linejoin=\'round\'/%3E%3C/svg%3E")',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 12px center',
                    paddingRight: '36px',
                    boxSizing: 'border-box'
                  }}
                  required
                >
                  <option value="not_ready">Not Ready</option>
                  <option value="ready">Ready</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                <button 
                  type="button" 
                  onClick={() => navigate('/')}
                  style={{
                    flex: '1 1 0%',
                    padding: '14px',
                    backgroundColor: '#eeeeee',
                    color: '#262626',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '15px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: '0.2s',
                    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
                  onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
                >
                  Back
                </button>
                
                <button 
                  type="submit" 
                  style={{
                    flex: '2 1 0%',
                    padding: '14px',
                    background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '15px',
                    fontWeight: 600,
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    opacity: isSubmitting ? 0.7 : 1,
                    transition: '0.3s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    boxShadow: '0 4px 15px rgba(188, 24, 136, 0.3)',
                    transform: 'translateY(1px)'
                  }}
                  disabled={isSubmitting}
                  onMouseOver={(e) => !isSubmitting && (e.currentTarget.style.opacity = '0.9')}
                  onMouseOut={(e) => !isSubmitting && (e.currentTarget.style.opacity = '1')}
                >
                  {isSubmitting ? 'Creating...' : 'Create Post'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselPostPage;
