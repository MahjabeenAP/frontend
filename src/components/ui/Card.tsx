import React from 'react';
import { theme } from '../../styles/global';
import './Card.css';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  title?: string;
  footer?: React.ReactNode;
  hoverable?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const Card: React.FC<CardProps> = ({
  children,
  title,
  footer,
  hoverable = false,
  className = '',
  style = {},
  ...props
}) => {
  const cardStyles: React.CSSProperties = {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    boxShadow: theme.boxShadow.md,
    overflow: 'hidden',
    transition: hoverable ? 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out' : 'none',

    ...style,
  };

  const headerStyles: React.CSSProperties = {
    padding: theme.spacing.md,
    borderBottom: `1px solid ${theme.colors.lightGray}`,
  };

  const bodyStyles: React.CSSProperties = {
    padding: theme.spacing.md,
  };

  const footerStyles: React.CSSProperties = {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.light,
    borderTop: `1px solid ${theme.colors.lightGray}`,
  };

  return (
    <div
      className={`card${hoverable ? ' hoverable' : ''}${className ? ' ' + className : ''}`}
      style={cardStyles}
      {...props}
    >
      {title && (
        <div style={headerStyles}>
          <h3 style={{ margin: 0, fontSize: theme.fontSizes.xl }}>{title}</h3>
        </div>
      )}
      <div style={bodyStyles}>
        {children}
      </div>
      {footer && (
        <div style={footerStyles}>
          {footer}
        </div>
      )}
    </div>
  );
};
