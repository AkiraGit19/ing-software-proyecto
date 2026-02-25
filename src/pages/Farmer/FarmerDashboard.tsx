import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Badge, StatusIndicator } from '../../components/ui/Badge';
import { AppLayout } from '../../layouts/AppLayout';
import './FarmerDashboard.css';

interface SurplusLot {
    id: string;
    crop: string;
    quantity: number;
    harvestDate: string;
    reason: string;
    destination: string;
    status: 'red' | 'yellow' | 'green';
    state: 'Apto' | 'En proceso' | 'Entregado';
}

const mockLots: SurplusLot[] = [
    { id: 'L-001', crop: 'Tomate', quantity: 500, harvestDate: '2024-05-10', reason: 'Estética', destination: 'Venta', status: 'yellow', state: 'Apto' },
    { id: 'L-002', crop: 'Zanahoria', quantity: 1200, harvestDate: '2024-05-01', reason: 'Sobreproducción', destination: 'Donación', status: 'red', state: 'En proceso' },
    { id: 'L-003', crop: 'Papa', quantity: 3000, harvestDate: '2024-05-15', reason: 'Tamaño', destination: 'Procesamiento', status: 'green', state: 'Apto' },
];

export default function FarmerDashboard() {
    const [lots, setLots] = useState<SurplusLot[]>(mockLots);
    const [showForm, setShowForm] = useState(false);

    // Form states
    const [crop, setCrop] = useState('');
    const [quantity, setQuantity] = useState('');
    const [harvestDate, setHarvestDate] = useState('');
    const [reason, setReason] = useState('');
    const [destination, setDestination] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newLot: SurplusLot = {
            id: `L-00${lots.length + 1}`,
            crop,
            quantity: Number(quantity),
            harvestDate,
            reason,
            destination,
            status: 'green', // Default new to green
            state: 'Apto',
        };
        setLots([newLot, ...lots]);
        setShowForm(false);
        // Reset form
        setCrop(''); setQuantity(''); setHarvestDate(''); setReason(''); setDestination('');
    };

    return (
        <AppLayout role="farmer">
            <div className="dashboard-header">
                <div>
                    <h1 className="page-title">Hola, Finca El Sol</h1>
                    <p className="page-subtitle">Gestiona tus excedentes agrícolas</p>
                </div>
                <Button onClick={() => setShowForm(!showForm)}>
                    {showForm ? 'Cancelar' : '+ Registrar Excedente'}
                </Button>
            </div>

            <div className="stats-grid">
                <Card>
                    <CardContent className="stat-card">
                        <span className="stat-value">{lots.length}</span>
                        <span className="stat-label">Lotes Activos</span>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="stat-card">
                        <span className="stat-value">
                            {lots.reduce((acc, lot) => acc + lot.quantity, 0)} kg
                        </span>
                        <span className="stat-label">Total Excedentes</span>
                    </CardContent>
                </Card>
            </div>

            {showForm && (
                <Card className="registration-form animate-fade-in">
                    <CardHeader>
                        <CardTitle>Registrar Nuevo Excedente</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="form-grid">
                            <Input
                                label="Tipo de Cultivo"
                                placeholder="Ej. Tomate, Papa"
                                value={crop} onChange={e => setCrop(e.target.value)} required
                            />
                            <Input
                                label="Cantidad (kg)"
                                type="number"
                                placeholder="0"
                                value={quantity} onChange={e => setQuantity(e.target.value)} required
                            />
                            <Input
                                label="Fecha de Cosecha"
                                type="date"
                                value={harvestDate} onChange={e => setHarvestDate(e.target.value)} required
                            />
                            <Select
                                label="Motivo de Descarte"
                                value={reason} onChange={e => setReason(e.target.value)} required
                                options={[
                                    { value: '', label: 'Seleccionar motivo' },
                                    { value: 'Estética', label: 'Estética / Calibre' },
                                    { value: 'Sobreproducción', label: 'Sobreproducción' },
                                    { value: 'Maduración', label: 'Maduración avanzada' }
                                ]}
                            />
                            <Select
                                label="Destino Sugerido"
                                value={destination} onChange={e => setDestination(e.target.value)} required
                                options={[
                                    { value: '', label: 'Seleccionar destino' },
                                    { value: 'Venta', label: 'Venta 2da selección' },
                                    { value: 'Donación', label: 'Donación' },
                                    { value: 'Reciclaje', label: 'Compostaje / Procesamiento' }
                                ]}
                            />
                            <div className="form-actions">
                                <Button type="submit" fullWidth>Publicar Lote</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}

            <h2 className="section-title">Mis Lotes</h2>
            <div className="lots-list">
                {lots.map(lot => (
                    <Card key={lot.id} className="lot-card animate-fade-in">
                        <CardContent className="lot-content">
                            <div className="lot-info">
                                <div className="lot-header">
                                    <h3>{lot.crop}</h3>
                                    <Badge variant={lot.state === 'Apto' ? 'default' : lot.state === 'En proceso' ? 'yellow' : 'green'}>
                                        {lot.state}
                                    </Badge>
                                </div>
                                <p className="lot-details">
                                    {lot.quantity} kg • Cosecha: {lot.harvestDate}
                                </p>
                                <p className="lot-meta">
                                    <span>Destino: {lot.destination}</span>
                                </p>
                            </div>
                            <div className="lot-status">
                                <StatusIndicator status={lot.status} />
                                <span className="status-text">
                                    {lot.status === 'red' ? 'Punto de vencer' : lot.status === 'yellow' ? 'En riesgo' : 'Buen estado'}
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </AppLayout>
    );
}
