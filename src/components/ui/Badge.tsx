import React from 'react';
import { theme } from '../../styles/global';

type BadgeVariant = 'primary' | 'success' | 'danger' | 'warning' | 'info' | 'neutral';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  style?: React.CSSProperties;
}

const variantStyles: Record<BadgeVariant, React.CSSProperties> = {
  primary: {
    backgroundColor: theme.colors.primaryLight,
    color: theme.colors.primary,
  },
  success: {
    backgroundColor: '#D1FAE5',
    color: '#065F46',
  },
  danger: {
    backgroundColor: '#FEE2E2',
    color: '#B91C1C',
  },
  warning: {
    backgroundColor: '#FEF3C7',
    color: '#92400E',
  },
  info: {
    backgroundColor: '#DBEAFE',
    color: '#1E40AF',
  },
  neutral: {
    backgroundColor: theme.colors.lightGray,
    color: theme.colors.dark,
  },
};

const sizeStyles = {
  sm: {
    fontSize: theme.fontSizes.xs,
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
  },
  md: {
    fontSize: theme.fontSizes.sm,
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
  },
  lg: {
    fontSize: theme.fontSizes.base,
    padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
  },
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  style = {},
}) => {
  const badgeStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    borderRadius: theme.borderRadius.full,
    fontWeight: 500,
    ...variantStyles[variant],
    ...sizeStyles[size],
    ...style,
  };

  return (
    <span style={badgeStyles} className={className}>
      {children}
    </span>
  );
};
