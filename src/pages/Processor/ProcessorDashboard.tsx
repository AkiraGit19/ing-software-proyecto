import { useState, useMemo } from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Badge, StatusIndicator } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { AppLayout } from '../../layouts/AppLayout';
import { Search, Filter } from 'lucide-react';
import './ProcessorDashboard.css';

interface CatalogItem {
    id: string;
    farm: string;
    crop: string;
    quantity: number;
    harvestDate: string;
    reason: string;
    destination: string;
    status: 'red' | 'yellow' | 'green';
}

const mockCatalog: CatalogItem[] = [
    { id: 'L-001', farm: 'Finca El Sol', crop: 'Tomate', quantity: 500, harvestDate: '2024-05-10', reason: 'Estética', destination: 'Venta', status: 'yellow' },
    { id: 'L-002', farm: 'AgroNorte', crop: 'Zanahoria', quantity: 1200, harvestDate: '2024-05-01', reason: 'Sobreproducción', destination: 'Procesamiento', status: 'red' },
    { id: 'L-003', farm: 'Valle Verde', crop: 'Papa', quantity: 3000, harvestDate: '2024-05-15', reason: 'Tamaño', destination: 'Compostaje', status: 'green' },
    { id: 'L-004', farm: 'Finca El Sol', crop: 'Manzana', quantity: 800, harvestDate: '2024-05-12', reason: 'Estética', destination: 'Procesamiento', status: 'yellow' },
];

export default function ProcessorDashboard() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('');
    const [filterDestination, setFilterDestination] = useState('');

    // Transaction State
    const [selectedItem, setSelectedItem] = useState<CatalogItem | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [finalUse, setFinalUse] = useState('');

    const [successMessage, setSuccessMessage] = useState('');

    const filteredCatalog = useMemo(() => {
        return mockCatalog.filter(item => {
            const matchSearch = item.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.farm.toLowerCase().includes(searchTerm.toLowerCase());
            const matchType = filterType ? item.crop === filterType : true;
            const matchDest = filterDestination ? item.destination === filterDestination : true;
            return matchSearch && matchType && matchDest;
        });
    }, [searchTerm, filterType, filterDestination]);

    const handleRequest = (item: CatalogItem) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    const confirmRequest = () => {
        if (!finalUse) return;
        setIsModalOpen(false);
        setSuccessMessage(`Solicitud enviada para el lote ${selectedItem?.id}. Tienes una reserva temporal válida por 2 días.`);
        setFinalUse('');

        // Auto-hide success message
        setTimeout(() => {
            setSuccessMessage('');
        }, 5000);
    };

    return (
        <AppLayout role="processor">
            <div className="dashboard-header">
                <div>
                    <h1 className="page-title">Catálogo de Excedentes</h1>
                    <p className="page-subtitle">Encuentra materia prima para tu proceso</p>
                </div>
            </div>

            {successMessage && (
                <div className="success-banner animate-fade-in">
                    <span>✅</span> {successMessage}
                </div>
            )}

            {/* Search and Filters */}
            <Card className="filters-card">
                <CardContent className="filters-content">
                    <div className="search-bar">
                        <Search className="search-icon" size={20} />
                        <Input
                            placeholder="Buscar por cultivo o finca..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                    </div>
                    <div className="filters-row">
                        <Filter className="filter-icon" size={20} />
                        <Select
                            value={filterType}
                            onChange={e => setFilterType(e.target.value)}
                            options={[
                                { value: '', label: 'Todos los cultivos' },
                                { value: 'Tomate', label: 'Tomate' },
                                { value: 'Zanahoria', label: 'Zanahoria' },
                                { value: 'Papa', label: 'Papa' },
                                { value: 'Manzana', label: 'Manzana' },
                            ]}
                        />
                        <Select
                            value={filterDestination}
                            onChange={e => setFilterDestination(e.target.value)}
                            options={[
                                { value: '', label: 'Todos los destinos' },
                                { value: 'Venta', label: 'Venta 2da selección' },
                                { value: 'Procesamiento', label: 'Procesamiento' },
                                { value: 'Compostaje', label: 'Compostaje' },
                            ]}
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Gallery View */}
            <div className="gallery-grid">
                {filteredCatalog.map(item => (
                    <Card key={item.id} className="catalog-card animate-fade-in">
                        <CardContent className="catalog-content">
                            <div className="catalog-header">
                                <div>
                                    <h3 className="catalog-title">{item.crop}</h3>
                                    <p className="catalog-farm">{item.farm}</p>
                                </div>
                                <div className="catalog-status">
                                    <StatusIndicator status={item.status} />
                                </div>
                            </div>

                            <div className="catalog-details">
                                <div className="detail-row">
                                    <span className="detail-label">Cantidad:</span>
                                    <span className="detail-value">{item.quantity} kg</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">Cosecha:</span>
                                    <span className="detail-value">{item.harvestDate}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">Motivo:</span>
                                    <span className="detail-value">{item.reason}</span>
                                </div>
                            </div>

                            <div className="catalog-tags">
                                <Badge variant="default">{item.destination}</Badge>
                            </div>

                            <Button fullWidth onClick={() => handleRequest(item)}>
                                Solicitar Aprovechamiento
                            </Button>
                        </CardContent>
                    </Card>
                ))}
                {filteredCatalog.length === 0 && (
                    <div className="empty-state">
                        <p>No se encontraron excedentes con los filtros aplicados.</p>
                    </div>
                )}
            </div>

            {/* Transaction Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Solicitar Aprovechamiento"
            >
                {selectedItem && (
                    <div className="transaction-flow">
                        <div className="transaction-summary">
                            <h4>Lote {selectedItem.id} - {selectedItem.crop}</h4>
                            <p>Origen: {selectedItem.farm}</p>
                            <p>Cantidad: {selectedItem.quantity} kg</p>
                        </div>

                        <div className="reservation-notice">
                            <span className="notice-icon">⏱️</span>
                            <p><strong>Reserva Temporal:</strong> Al confirmar, este lote será reservado para ti por <strong>2 días</strong> para formalizar la transacción.</p>
                        </div>

                        <Select
                            label="Indicar Uso Final"
                            value={finalUse}
                            onChange={e => setFinalUse(e.target.value)}
                            options={[
                                { value: '', label: 'Seleccionar uso final...' },
                                { value: 'Abono', label: 'Abono / Compostaje' },
                                { value: 'Subproductos', label: 'Elaboración de Subproductos (Jugos, mermeladas)' },
                                { value: 'Biocombustible', label: 'Biocombustibles' },
                                { value: 'AlimentacionAnimal', label: 'Alimentación Animal' }
                            ]}
                            required
                        />

                        <div className="modal-actions">
                            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
                            <Button onClick={confirmRequest} disabled={!finalUse}>
                                Confirmar Solicitud
                            </Button>
                        </div>
                    </div>
                )}
            </Modal>
        </AppLayout>
    );
}
