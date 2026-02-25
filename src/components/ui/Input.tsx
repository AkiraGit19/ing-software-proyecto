import React, { InputHTMLAttributes } from 'react';
import './Input.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    fullWidth?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, fullWidth = true, className = '', ...props }, ref) => {
        return (
            <div className={`input-wrapper ${fullWidth ? 'input-full' : ''} ${className}`.trim()}>
                {label && <label className="input-label">{label}</label>}
                <input
                    ref={ref}
                    className={`input-field ${error ? 'input-error' : ''}`}
                    {...props}
                />
                {error && <span className="input-error-text">{error}</span>}
            </div>
        );
    }
);

Input.displayName = 'Input';
