
import './Badge.css';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'red' | 'yellow' | 'green' | 'default';
    className?: string;
}

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
    return (
        <span className={`badge badge-${variant} ${className}`.trim()}>
            {children}
        </span>
    );
}

export function StatusIndicator({ status }: { status: 'red' | 'yellow' | 'green' }) {
    return (
        <div className={`status-indicator status-${status}`} title={`Estado: ${status}`} />
    );
}
