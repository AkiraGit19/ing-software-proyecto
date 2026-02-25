
import { Card, CardContent } from '../../components/ui/Card';
import { AppLayout } from '../../layouts/AppLayout';
import { Star, TrendingUp, Package, Heart, Recycle } from 'lucide-react';
import './Profile.css';

export default function Profile() {
    const role = (localStorage.getItem('userRole') as 'farmer' | 'processor') || 'farmer';

    // Mock Data
    const user = role === 'processor'
        ? {
            name: 'AgroNorte Transformadora',
            role: 'Empresa Transformadora',
            rating: 4.9,
            reviewsCount: 89,
            joinDate: 'Marzo 2024',
        }
        : {
            name: 'Finca El Sol',
            role: 'Empresa Agricultora',
            rating: 4.8,
            reviewsCount: 124,
            joinDate: 'Enero 2024',
        };

    const impactMetrics = role === 'processor'
        ? {
            totalManaged: 8400,
            sold: 0,
            donated: 0,
            recycled: 8400,
        }
        : {
            totalManaged: 15400,
            sold: 8200,
            donated: 3100,
            recycled: 4100,
        };

    const renderStars = (rating: number) => {
        return (
            <div className="stars-container">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        size={20}
                        className={`star-icon ${star <= rating ? 'filled' : 'empty'}`}
                        fill={star <= rating ? 'currentColor' : 'none'}
                    />
                ))}
                <span className="rating-text">{rating.toFixed(1)} ({user.reviewsCount} reseñas)</span>
            </div>
        );
    };

    return (
        <AppLayout role={role}>
            <div className="profile-header animate-fade-in">
                <div className="profile-info">
                    <div className="profile-avatar">
                        <span className="avatar-initial">{user.name.charAt(0)}</span>
                    </div>
                    <div className="profile-details">
                        <h1 className="profile-name">{user.name}</h1>
                        <p className="profile-role">{user.role} • Miembro desde {user.joinDate}</p>
                        {renderStars(user.rating)}
                    </div>
                </div>
            </div>

            <div className="impact-section animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <h2 className="section-title">Mi Impacto Ambiental</h2>
                <p className="section-subtitle">Kilos de excedentes gestionados a través de AgroLink</p>

                <div className="metrics-grid">
                    <Card className="metric-card highlight">
                        <CardContent className="metric-content">
                            <div className="metric-icon-wrapper highlight-bg">
                                <TrendingUp size={24} className="metric-icon" />
                            </div>
                            <div className="metric-info">
                                <span className="metric-value">{impactMetrics.totalManaged.toLocaleString()} kg</span>
                                <span className="metric-label">Total Gestionado</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="metric-card">
                        <CardContent className="metric-content">
                            <div className="metric-icon-wrapper blue-bg">
                                <Package size={24} className="metric-icon" />
                            </div>
                            <div className="metric-info">
                                <span className="metric-value">{impactMetrics.sold.toLocaleString()} kg</span>
                                <span className="metric-label">Vendidos (2da selección)</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="metric-card">
                        <CardContent className="metric-content">
                            <div className="metric-icon-wrapper yellow-bg">
                                <Heart size={24} className="metric-icon" />
                            </div>
                            <div className="metric-info">
                                <span className="metric-value">{impactMetrics.donated.toLocaleString()} kg</span>
                                <span className="metric-label">Donados</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="metric-card">
                        <CardContent className="metric-content">
                            <div className="metric-icon-wrapper green-bg">
                                <Recycle size={24} className="metric-icon" />
                            </div>
                            <div className="metric-info">
                                <span className="metric-value">{impactMetrics.recycled.toLocaleString()} kg</span>
                                <span className="metric-label">Reciclados / Compost</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="recent-activity-section animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <h2 className="section-title">Actividad Reciente</h2>
                <Card>
                    <div className="activity-list">
                        <div className="activity-item">
                            <div className="activity-dot green"></div>
                            <div className="activity-text">
                                <p><strong>Lote L-045</strong> (Zanahoria) fue entregado exitosamente para compostaje.</p>
                                <span className="activity-time">Hace 2 horas</span>
                            </div>
                        </div>
                        <div className="activity-item">
                            <div className="activity-dot primary"></div>
                            <div className="activity-text">
                                <p>Publicaste un nuevo excedente: <strong>Lote L-046</strong> (Tomate).</p>
                                <span className="activity-time">Ayer</span>
                            </div>
                        </div>
                        <div className="activity-item">
                            <div className="activity-dot yellow"></div>
                            <div className="activity-text">
                                <p>AgroNorte solicitó aprovechamiento para <strong>Lote L-044</strong> (Papa).</p>
                                <span className="activity-time">Hace 3 días</span>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>

        </AppLayout>
    );
}
