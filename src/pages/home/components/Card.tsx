import React from 'react';
import { Link } from 'react-router-dom';

interface CardProps {
  title: string;
  description: string;
  icon: string;
  isActive: boolean;
  to?: string;
  isComingSoon?: boolean;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  icon,
  isActive,
  to = '#',
  isComingSoon = false,
}) => {
  const cardStyle: React.CSSProperties = {
    padding: '20px',
    borderRadius: '12px',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    cursor: isActive ? 'pointer' : 'not-allowed',
    opacity: isActive ? 1 : 0.7,
    textDecoration: 'none',
    color: '#262626',
    border: '1px solid #e0e0e0',
    position: 'relative',
    overflow: 'hidden',
    minHeight: '160px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  };

  const content = (
    <div style={cardStyle}>
      <div>
        <div style={{
          fontSize: '24px',
          marginBottom: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          <span>{icon}</span>
          <h3 style={{
            margin: 0,
            fontSize: '18px',
            fontWeight: 600,
            fontFamily: '"Segoe UI", Roboto, sans-serif',
          }}>
            {title}
          </h3>
        </div>
        <p style={{
          margin: '8px 0 0',
          color: '#666',
          fontSize: '14px',
          lineHeight: '1.5',
        }}>
          {description}
        </p>
      </div>
      {isComingSoon && (
        <div style={{
          position: 'absolute',
          top: '10px',
          right: '-30px',
          backgroundColor: '#ff4d4f',
          color: 'white',
          padding: '2px 30px',
          transform: 'rotate(45deg)',
          fontSize: '12px',
          fontWeight: 600,
        }}>
          Coming Soon
        </div>
      )}
    </div>
  );

  if (isActive) {
    return (
      <Link to={to} style={{ textDecoration: 'none' }}>
        {content}
      </Link>
    );
  }

  return content;
};

export default Card;
