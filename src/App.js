// App.js - Componente principal de la aplicación
import React, { useState } from 'react';
import './App.css';
import { FarmIcon, SeedlingIcon, ContractIcon, WalletIcon } from './Icons';

function App() {
  const [activeTab, setActiveTab] = useState('contracts');
  const [connected, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  
  const connectWallet = () => {
    // Aquí iría la lógica real de conexión con MetaMask u otro wallet
    setConnected(true);
    setWalletAddress('0x71C7656EC7ab88b098defB751B7401B5f6d8976F');
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="logo">
          <FarmIcon />
          <h1>AgroCadena</h1>
        </div>
        <div className="wallet-section">
          {!connected ? (
            <button className="connect-wallet" onClick={connectWallet}>
              <WalletIcon /> Conectar Wallet
            </button>
          ) : (
            <div className="wallet-info">
              <WalletIcon />
              <span>{walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</span>
            </div>
          )}
        </div>
      </header>
      
      <nav className="app-nav">
        <button 
          className={activeTab === 'contracts' ? 'active' : ''}
          onClick={() => setActiveTab('contracts')}
        >
          <ContractIcon /> Contratos
        </button>
        <button 
          className={activeTab === 'farms' ? 'active' : ''}
          onClick={() => setActiveTab('farms')}
        >
          <FarmIcon /> Mis Cultivos
        </button>
        <button 
          className={activeTab === 'marketplace' ? 'active' : ''}
          onClick={() => setActiveTab('marketplace')}
        >
          <SeedlingIcon /> Mercado
        </button>
      </nav>
      
      <main className="app-main">
        {activeTab === 'contracts' && <ContractsTab connected={connected} />}
        {activeTab === 'farms' && <FarmsTab connected={connected} />}
        {activeTab === 'marketplace' && <MarketplaceTab connected={connected} />}
      </main>
      
      <footer className="app-footer">
        <p>© 2025 AgroCadena - Soluciones Blockchain para Agricultura</p>
      </footer>
    </div>
  );
}

// Componente para la pestaña de Contratos
function ContractsTab({ connected }) {
  const [contracts, setContracts] = useState([
    { id: 1, name: 'Contrato de Maíz', area: '5 hectáreas', duration: '6 meses', status: 'Activo' },
    { id: 2, name: 'Contrato de Trigo', area: '3 hectáreas', duration: '4 meses', status: 'Pendiente' }
  ]);
  
  const [showForm, setShowForm] = useState(false);
  const [newContract, setNewContract] = useState({
    name: '',
    crop: '',
    area: '',
    duration: '',
    terms: ''
  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewContract(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para crear un nuevo contrato en la blockchain
    const id = contracts.length + 1;
    setContracts([...contracts, { 
      id, 
      name: newContract.name, 
      area: newContract.area, 
      duration: newContract.duration, 
      status: 'Pendiente' 
    }]);
    setNewContract({ name: '', crop: '', area: '', duration: '', terms: '' });
    setShowForm(false);
  };
  
  if (!connected) {
    return (
      <div className="not-connected">
        <h2>Conecta tu wallet para gestionar contratos</h2>
        <p>Necesitas conectar tu wallet para acceder a esta funcionalidad.</p>
      </div>
    );
  }
  
  return (
    <div className="contracts-tab">
      <div className="section-header">
        <h2>Mis Contratos Inteligentes</h2>
        <button className="primary-button" onClick={() => setShowForm(true)}>
          + Nuevo Contrato
        </button>
      </div>
      
      {showForm ? (
        <div className="contract-form-container">
          <h3>Crear Nuevo Contrato</h3>
          <form onSubmit={handleSubmit} className="contract-form">
            <div className="form-group">
              <label>Nombre del Contrato</label>
              <input 
                type="text" 
                name="name" 
                value={newContract.name} 
                onChange={handleInputChange} 
                required 
              />
            </div>
            
            <div className="form-group">
              <label>Tipo de Cultivo</label>
              <select 
                name="crop" 
                value={newContract.crop} 
                onChange={handleInputChange} 
                required
              >
                <option value="">Seleccionar cultivo</option>
                <option value="maiz">Maíz</option>
                <option value="trigo">Trigo</option>
                <option value="soja">Soja</option>
                <option value="arroz">Arroz</option>
              </select>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Área de Cultivo</label>
                <input 
                  type="text" 
                  name="area" 
                  value={newContract.area} 
                  onChange={handleInputChange} 
                  placeholder="Ej: 5 hectáreas" 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label>Duración</label>
                <input 
                  type="text" 
                  name="duration" 
                  value={newContract.duration} 
                  onChange={handleInputChange} 
                  placeholder="Ej: 6 meses" 
                  required 
                />
              </div>
            </div>
            
            <div className="form-group">
              <label>Términos del Contrato</label>
              <textarea 
                name="terms" 
                value={newContract.terms} 
                onChange={handleInputChange} 
                placeholder="Describe los términos y condiciones..."
                required
              />
            </div>
            
            <div className="form-actions">
              <button type="button" className="secondary-button" onClick={() => setShowForm(false)}>
                Cancelar
              </button>
              <button type="submit" className="primary-button">
                Crear Contrato
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="contracts-list">
          {contracts.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Área</th>
                  <th>Duración</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {contracts.map(contract => (
                  <tr key={contract.id}>
                    <td>#{contract.id}</td>
                    <td>{contract.name}</td>
                    <td>{contract.area}</td>
                    <td>{contract.duration}</td>
                    <td>
                      <span className={`status ${contract.status.toLowerCase()}`}>
                        {contract.status}
                      </span>
                    </td>
                    <td>
                      <button className="action-button">Ver</button>
                      <button className="action-button">Editar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="empty-state">
              <p>No tienes contratos activos. Crea tu primer contrato.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Componente para la pestaña de Mis Cultivos
function FarmsTab({ connected }) {
  // Eliminamos setFarms del desestructurado para evitar el warning
  const [farms] = useState([
    { id: 1, name: 'Parcela Norte', crop: 'Maíz', area: '5 hectáreas', plantDate: '15/01/2025', harvestDate: '15/07/2025' },
    { id: 2, name: 'Parcela Este', crop: 'Trigo', area: '3 hectáreas', plantDate: '01/02/2025', harvestDate: '01/06/2025' }
  ]);
  
  // Agregamos la función para añadir un nuevo cultivo (para futura implementación)
  const addNewFarm = () => {
    // Esta función se implementaría más adelante
    console.log("Función para añadir nuevo cultivo");
  };
  
  if (!connected) {
    return (
      <div className="not-connected">
        <h2>Conecta tu wallet para ver tus cultivos</h2>
        <p>Necesitas conectar tu wallet para acceder a esta funcionalidad.</p>
      </div>
    );
  }
  
  return (
    <div className="farms-tab">
      <div className="section-header">
        <h2>Mis Cultivos Registrados</h2>
        <button className="primary-button" onClick={addNewFarm}>+ Nuevo Cultivo</button>
      </div>
      
      <div className="farms-grid">
        {farms.map(farm => (
          <div key={farm.id} className="farm-card">
            <div className="farm-header">
              <h3>{farm.name}</h3>
              <span className="farm-id">#{farm.id}</span>
            </div>
            <div className="farm-details">
              <div className="detail-item">
                <strong>Cultivo:</strong> {farm.crop}
              </div>
              <div className="detail-item">
                <strong>Área:</strong> {farm.area}
              </div>
              <div className="detail-item">
                <strong>Fecha de siembra:</strong> {farm.plantDate}
              </div>
              <div className="detail-item">
                <strong>Fecha de cosecha:</strong> {farm.harvestDate}
              </div>
            </div>
            <div className="farm-actions">
              <button className="secondary-button">Ver Detalles</button>
              <button className="primary-button">Actualizar Estado</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Componente para la pestaña de Mercado
function MarketplaceTab({ connected }) {
  // Eliminamos setOffers del desestructurado para evitar el warning
  const [offers] = useState([
    { id: 1, crop: 'Maíz', quantity: '500 kg', price: '0.05 ETH/kg', seller: '0x71C7...976F' },
    { id: 2, crop: 'Trigo', quantity: '300 kg', price: '0.08 ETH/kg', seller: '0x3B4C...23E8' },
    { id: 3, crop: 'Soja', quantity: '750 kg', price: '0.07 ETH/kg', seller: '0x842F...A1D9' }
  ]);
  
  // Agregamos la función para crear una nueva oferta (para futura implementación)
  const createNewOffer = () => {
    // Esta función se implementaría más adelante
    console.log("Función para crear nueva oferta");
  };
  
  if (!connected) {
    return (
      <div className="not-connected">
        <h2>Conecta tu wallet para acceder al mercado</h2>
        <p>Necesitas conectar tu wallet para acceder a esta funcionalidad.</p>
      </div>
    );
  }
  
  return (
    <div className="marketplace-tab">
      <div className="section-header">
        <h2>Mercado de Cultivos</h2>
        <button className="primary-button" onClick={createNewOffer}>+ Nueva Oferta</button>
      </div>
      
      <div className="filter-bar">
        <input type="text" placeholder="Buscar cultivo..." />
        <select>
          <option value="">Todos los cultivos</option>
          <option value="maiz">Maíz</option>
          <option value="trigo">Trigo</option>
          <option value="soja">Soja</option>
        </select>
        <select>
          <option value="recent">Más recientes</option>
          <option value="price-asc">Precio: Menor a Mayor</option>
          <option value="price-desc">Precio: Mayor a Menor</option>
        </select>
      </div>
      
      <div className="offers-list">
        {offers.map(offer => (
          <div key={offer.id} className="offer-card">
            <div className="offer-header">
              <h3>{offer.crop}</h3>
              <span className="offer-id">#{offer.id}</span>
            </div>
            <div className="offer-details">
              <div className="detail-item">
                <strong>Cantidad:</strong> {offer.quantity}
              </div>
              <div className="detail-item">
                <strong>Precio:</strong> {offer.price}
              </div>
              <div className="detail-item">
                <strong>Vendedor:</strong> {offer.seller}
              </div>
            </div>
            <div className="offer-actions">
              <button className="secondary-button">Ver Detalles</button>
              <button className="primary-button">Comprar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;