import React, { useState } from 'react';
import { theme } from '../../styles/global';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({
    label,
    error,
    fullWidth = true,
    className = '',
    style = {},
    disabled = false,
    onFocus,
    onBlur,
    ...props
  }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    const inputStyles: React.CSSProperties = {
      width: fullWidth ? '100%' : 'auto',
      padding: theme.spacing.sm,
      border: `1px solid ${error ? theme.colors.danger : theme.colors.lightGray}`,
      borderRadius: theme.borderRadius.md,
      fontSize: theme.fontSizes.base,
      transition: 'border-color 0.2s ease-in-out',
      ...(isFocused && {
        outline: 'none',
        borderColor: theme.colors.primary,
        boxShadow: `0 0 0 2px ${theme.colors.primaryLight}`,
      }),
      ...(disabled && {
        backgroundColor: theme.colors.lightGray,
        cursor: 'not-allowed',
      }),
      ...style,
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      if (onFocus) onFocus(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      if (onBlur) onBlur(e);
    };

    return (
      <div style={{ marginBottom: theme.spacing.md, width: fullWidth ? '100%' : 'auto' }}>
        {label && (
          <label 
            style={{
              display: 'block',
              marginBottom: theme.spacing.xs,
              fontWeight: 500,
              color: theme.colors.dark,
            }}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          style={inputStyles}
          className={className}
          disabled={disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
        {error && (
          <p 
            style={{
              color: theme.colors.danger,
              fontSize: theme.fontSizes.sm,
              marginTop: theme.spacing.xs,
              marginBottom: 0,
            }}
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
