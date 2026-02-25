
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { AuthLayout } from '../../layouts/AuthLayout';
import './Landing.css';

export default function Landing() {
    const navigate = useNavigate();

    return (
        <AuthLayout>
            <div className="landing-content text-center">
                <h1 className="landing-title">La nueva era de la Agricultura</h1>
                <p className="landing-subtitle">
                    Plataforma de economía circular agrícola. Conectamos empresas agricultoras con transformadoras para dar valor a los excedentes.
                </p>

                <div className="landing-actions">
                    <Button
                        size="lg"
                        fullWidth
                        onClick={() => navigate('/login')}
                    >
                        Comenzar
                    </Button>
                    <Button
                        variant="ghost"
                        fullWidth
                        onClick={() => navigate('/login')}
                    >
                        Ya tengo una cuenta
                    </Button>
                </div>
            </div>
        </AuthLayout>
    );
}
