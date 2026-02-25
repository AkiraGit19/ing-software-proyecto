
import './AuthLayout.css';

export function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="auth-layout">
            <div className="auth-background">
                <div className="auth-overlay"></div>
            </div>
            <div className="auth-content-wrapper">
                <div className="auth-header">
                    <span className="brand-icon">🌱</span>
                    <h2>AgroLink</h2>
                </div>
                <main className="auth-main animate-fade-in">
                    {children}
                </main>
            </div>
        </div>
    );
}
