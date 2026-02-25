import { ReactNode } from 'react';
import './Card.css';

interface CardProps {
    children: ReactNode;
    className?: string;
    glass?: boolean;
}

export function Card({ children, className = '', glass = false }: CardProps) {
    return (
        <div className={`card ${glass ? 'glass' : ''} ${className}`.trim()}>
            {children}
        </div>
    );
}

export function CardHeader({ children, className = '' }: { children: ReactNode; className?: string }) {
    return <div className={`card-header ${className}`.trim()}>{children}</div>;
}

export function CardTitle({ children, className = '' }: { children: ReactNode; className?: string }) {
    return <h3 className={`card-title ${className}`.trim()}>{children}</h3>;
}

export function CardContent({ children, className = '' }: { children: ReactNode; className?: string }) {
    return <div className={`card-content ${className}`.trim()}>{children}</div>;
}
