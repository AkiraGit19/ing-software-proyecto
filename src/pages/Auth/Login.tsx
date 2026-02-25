import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Button } from '../../components/ui/Button';
import { AuthLayout } from '../../layouts/AuthLayout';
import './Login.css';

export default function Login() {
    const navigate = useNavigate();
    const [isRegister, setIsRegister] = useState(false);

    // Form State
    const [role, setRole] = useState('agricultora');
    const [ruc, setRuc] = useState('');
    const [rucError, setRucError] = useState('');

    const validateRuc = (value: string) => {
        // Basic mock validation for RUC (11 to 13 digits)
        const regex = /^\d{11,13}$/;
        if (!regex.test(value)) {
            setRucError('El RUC debe tener entre 11 y 13 dígitos numéricos');
            return false;
        }
        setRucError('');
        return true;
    };

    const handleRucChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.replace(/\D/g, '');
        setRuc(val);
        if (val.length > 0) {
            validateRuc(val);
        } else {
            setRucError('');
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isRegister) {
            // Validate RUC for specific roles
            if (['agricultora', 'transformadora'].includes(role) && !validateRuc(ruc)) {
                return;
            }
        }

        // Extract email and password from the form
        const form = e.currentTarget as HTMLFormElement;
        const emailInput = (form.elements.namedItem('email') as HTMLInputElement)?.value.trim().toLowerCase();
        const passwordInput = (form.elements.namedItem('password') as HTMLInputElement)?.value.trim();

        // Login Logic with explicit accounts
        if (emailInput === 'agricultor@test.com' && passwordInput === '1234') {
            localStorage.setItem('userRole', 'farmer');
            navigate('/farmer');
        } else if (emailInput === 'comprador@test.com' && passwordInput === '1234') {
            localStorage.setItem('userRole', 'processor');
            navigate('/catalogo');
        } else {
            // Simplified register logic for the prototype if they just clicked register with the dropdown
            if (isRegister) {
                const userRole = role === 'transformadora' ? 'processor' : 'farmer';
                localStorage.setItem('userRole', userRole);
                navigate(userRole === 'processor' ? '/catalogo' : '/farmer');
                return;
            }
            alert('Credenciales incorrectas. Usa las cuentas de prueba.');
        }
    };

    return (
        <AuthLayout>
            <Card className="login-card">
                <CardHeader>
                    <CardTitle className="login-title">
                        {isRegister ? 'Crear una cuenta' : 'Iniciar Sesión'}
                    </CardTitle>
                    <p className="login-subtitle">
                        {isRegister
                            ? 'Únete a la plataforma de economía circular agrícola'
                            : 'Ingresa tus credenciales para continuar'}
                    </p>
                </CardHeader>
                <CardContent>
                    {!isRegister && (
                        <div style={{ background: 'var(--primary-light)', padding: '10px', borderRadius: '8px', marginBottom: '15px', fontSize: '0.85rem' }}>
                            <strong>Cuentas de Prueba:</strong>
                            <ul style={{ margin: '5px 0 0 15px', color: 'var(--text-secondary)' }}>
                                <li>Agricultor: <b>agricultor@test.com</b> (pass: 1234)</li>
                                <li>Comprador: <b>comprador@test.com</b> (pass: 1234)</li>
                            </ul>
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="login-form">

                        {isRegister && (
                            <Select
                                label="Selecciona tu Rol"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                options={[
                                    { value: 'agricultora', label: 'Empresa Agricultora' },
                                    { value: 'transformadora', label: 'Empresa Transformadora' },
                                    { value: 'alianza', label: 'Alianza / ONG' },
                                    { value: 'admin', label: 'Administrador' }
                                ]}
                            />
                        )}

                        {isRegister && ['agricultora', 'transformadora'].includes(role) && (
                            <Input
                                label="RUC"
                                placeholder="Ingresa tu número de RUC"
                                value={ruc}
                                onChange={handleRucChange}
                                error={rucError}
                                required
                                maxLength={13}
                            />
                        )}

                        {isRegister && (
                            <Input
                                label="Nombre de la Empresa"
                                placeholder="Ej. AgroLink Bio"
                                required
                            />
                        )}

                        <Input
                            label="Correo Electrónico"
                            name="email"
                            type="email"
                            placeholder="tu@correo.com"
                            required
                        />

                        <Input
                            label="Contraseña"
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            required
                        />

                        <Button type="submit" size="lg" fullWidth className="submit-btn">
                            {isRegister ? 'Registrarse' : 'Ingresar'}
                        </Button>
                    </form>

                    <div className="login-footer">
                        <p>
                            {isRegister ? '¿Ya tienes una cuenta?' : '¿No tienes una cuenta?'}
                        </p>
                        <button
                            type="button"
                            className="toggle-auth-btn"
                            onClick={() => setIsRegister(!isRegister)}
                        >
                            {isRegister ? 'Iniciar Sesión' : 'Regístrate aquí'}
                        </button>
                    </div>
                </CardContent>
            </Card>
        </AuthLayout>
    );
}
