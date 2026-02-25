import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Home, User, LogOut } from 'lucide-react';
import './AppLayout.css';

interface AppLayoutProps {
    children: React.ReactNode;
    role?: 'farmer' | 'processor'; // Mocking role context
}

export function AppLayout({ children, role = 'farmer' }: AppLayoutProps) {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/');
    };

    return (
        <div className="app-layout">
            {/* Sidebar for Desktop */}
            <aside className="app-sidebar glass">
                <div className="sidebar-brand">
                    <span className="brand-icon">🌱</span>
                    <h2>AgroLink</h2>
                </div>

                <nav className="sidebar-nav">
                    <NavLink
                        to={role === 'farmer' ? '/farmer' : '/catalogo'}
                        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                        end
                    >
                        <Home size={20} />
                        <span>Inicio</span>
                    </NavLink>

                    <NavLink
                        to="/profile"
                        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                    >
                        <User size={20} />
                        <span>Perfil</span>
                    </NavLink>
                </nav>

                <div className="sidebar-footer">
                    <button className="logout-btn" onClick={handleLogout}>
                        <LogOut size={20} />
                        <span>Salir</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="app-main">
                {/* Top Header for Mobile */}
                <header className="mobile-header glass">
                    <span className="brand-icon">🌱</span>
                    <h2>AgroLink</h2>
                </header>

                <div className="content-area animate-fade-in">
                    {children}
                </div>
            </main>

            {/* Bottom Navigation for Mobile */}
            <nav className="mobile-bottom-nav glass">
                <NavLink
                    to={role === 'farmer' ? '/farmer' : '/catalogo'}
                    className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}
                    end
                >
                    <Home size={24} />
                    <span>Inicio</span>
                </NavLink>

                <NavLink
                    to="/profile"
                    className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}
                >
                    <User size={24} />
                    <span>Perfil</span>
                </NavLink>
            </nav>
        </div>
    );
}
