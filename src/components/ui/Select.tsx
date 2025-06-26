import React from 'react';
import { theme } from '../../styles/global';
import './Select.css';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
  fullWidth?: boolean;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({
    label,
    error,
    options,
    fullWidth = true,
    className = '',
    style = {},
    ...props
  }, ref) => {
    const selectStyles: React.CSSProperties = {
      width: fullWidth ? '100%' : 'auto',
      padding: theme.spacing.sm,
      border: `1px solid ${error ? theme.colors.danger : theme.colors.lightGray}`,
      borderRadius: theme.borderRadius.md,
      fontSize: theme.fontSizes.base,
      backgroundColor: theme.colors.white,
      transition: 'border-color 0.2s ease-in-out',
      // focus and disabled styles are moved to CSS
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
        <select
          ref={ref}
          style={selectStyles}
          className={`custom-select${className ? ' ' + className : ''}`}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
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

Select.displayName = 'Select';
