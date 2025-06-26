import React, { useState } from 'react';
import { theme } from '../../styles/global';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  rows?: number;
  disabled?: boolean;
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({
    label,
    error,
    fullWidth = true,
    rows = 4,
    className = '',
    style = {},
    disabled = false,
    onFocus,
    onBlur,
    ...props
  }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    const baseStyles: React.CSSProperties = {
      width: fullWidth ? '100%' : 'auto',
      padding: theme.spacing.sm,
      border: `1px solid ${error ? theme.colors.danger : theme.colors.lightGray}`,
      borderRadius: theme.borderRadius.md,
      fontSize: theme.fontSizes.base,
      minHeight: `${rows * 1.5}em`,
      resize: 'vertical' as const,
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

    const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(true);
      if (onFocus) onFocus(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
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
        <textarea
          ref={ref}
          rows={rows}
          style={baseStyles}
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

Textarea.displayName = 'Textarea';
