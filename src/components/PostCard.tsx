import React from 'react';
import type { Post } from '../types/post';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';


interface PostCardProps {
  post: Post;
  onStatusUpdate?: (postId: number, newStatus: Post['status']) => void;
}

const statusVariantMap: Record<Post['status'], 'primary' | 'success' | 'danger' | 'warning' | 'info' | 'neutral'> = {
  'not_ready': 'neutral',
  'ready': 'primary',
  'published': 'success',
  'failed': 'danger',
};

const statusLabelMap: Record<Post['status'], string> = {
  'not_ready': 'Draft',
  'ready': 'Ready',
  'published': 'Published',
  'failed': 'Failed',
};

export const PostCard: React.FC<PostCardProps> = ({ post, onStatusUpdate }) => {
  const { id, text_prompt, post_type, status, ai_caption, image_url, created_at, scheduled_time } = post;

  return (
    <Card style={{ marginBottom: '1rem' }} hoverable>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
            <Badge variant={statusVariantMap[status]} size="sm">
              {statusLabelMap[status]}
            </Badge>
            <span style={{ marginLeft: '0.5rem', color: '#6B7280', fontSize: '0.875rem' }}>
              {post_type === 'photo' ? 'Photo' : 'Reel'}
            </span>
          </div>
          
          <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.125rem' }}>
            {text_prompt || 'Untitled Post'}
          </h3>
          
          {ai_caption && (
            <p style={{ margin: '0.5rem 0', color: '#4B5563' }}>
              {ai_caption}
            </p>
          )}
          
          <div style={{ marginTop: '0.75rem', fontSize: '0.875rem', color: '#6B7280' }}>
            <div>Created: {new Date(created_at).toLocaleString()}</div>
            {scheduled_time && (
              <div>Scheduled: {new Date(scheduled_time).toLocaleString()}</div>
            )}
          </div>
        </div>
        
        {image_url && image_url.length > 0 && (
          <div style={{ marginLeft: '1rem', flexShrink: 0 }}>
            <img 
              src={image_url[0]} 
              alt="Post preview" 
              style={{
                width: '100px',
                height: '100px',
                objectFit: 'cover',
                borderRadius: '0.5rem',
              }}
            />
          </div>
        )}
      </div>
      
      {onStatusUpdate && status === 'ready' && (
        <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
          <button 
            onClick={() => onStatusUpdate(id, 'published')}
            style={{
              padding: '0.25rem 0.5rem',
              backgroundColor: '#10B981',
              color: 'white',
              border: 'none',
              borderRadius: '0.25rem',
              cursor: 'pointer',
              fontSize: '0.875rem',
            }}
          >
            Mark as Published
          </button>
        </div>
      )}
    </Card>
  );
};
