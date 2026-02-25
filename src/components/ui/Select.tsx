import React, { SelectHTMLAttributes } from 'react';
import './Input.css'; // Reusing input styles

interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    options: SelectOption[];
    error?: string;
    fullWidth?: boolean;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
    ({ label, options, error, fullWidth = true, className = '', ...props }, ref) => {
        return (
            <div className={`input-wrapper ${fullWidth ? 'input-full' : ''} ${className}`.trim()}>
                {label && <label className="input-label">{label}</label>}
                <select
                    ref={ref}
                    className={`input-field ${error ? 'input-error' : ''}`}
                    {...props}
                >
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
                {error && <span className="input-error-text">{error}</span>}
            </div>
        );
    }
);

Select.displayName = 'Select';
