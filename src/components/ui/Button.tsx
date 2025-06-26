import React from 'react';
import { theme } from '../../styles/global';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

const buttonStyles = {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.borderRadius.md,
    fontWeight: 500,
    transition: 'all 0.2s ease-in-out',
    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
    },
  },
  variants: {
    primary: {
      backgroundColor: theme.colors.primary,
      color: theme.colors.white,
      '&:hover:not(:disabled)': {
        backgroundColor: theme.colors.primaryDark,
      },
    },
    secondary: {
      backgroundColor: theme.colors.gray,
      color: theme.colors.white,
      '&:hover:not(:disabled)': {
        backgroundColor: theme.colors.dark,
      },
    },
    danger: {
      backgroundColor: theme.colors.danger,
      color: theme.colors.white,
      '&:hover:not(:disabled)': {
        backgroundColor: '#DC2626',
      },
    },
    outline: {
      backgroundColor: 'transparent',
      border: `1px solid ${theme.colors.primary}`,
      color: theme.colors.primary,
      '&:hover:not(:disabled)': {
        backgroundColor: 'rgba(79, 70, 229, 0.1)',
      },
    },
  },
  sizes: {
    sm: {
      padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
      fontSize: theme.fontSizes.sm,
    },
    md: {
      padding: `${theme.spacing.sm} ${theme.spacing.md}`,
      fontSize: theme.fontSizes.base,
    },
    lg: {
      padding: `${theme.spacing.md} ${theme.spacing.lg}`,
      fontSize: theme.fontSizes.lg,
    },
  },
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    children,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    disabled = false,
    className = '',
    style = {},
    ...props
  }, ref) => {
    const isDisabled = disabled || isLoading;
    
    return (
      <button
        ref={ref}
        disabled={isDisabled}
        style={{
          ...buttonStyles.base,
          ...buttonStyles.variants[variant],
          ...buttonStyles.sizes[size],
          ...style,
        }}
        className={className}
        {...props}
      >
        {isLoading ? 'Loading...' : children}
      </button>
    );
  }
);

Button.displayName = 'Button';
