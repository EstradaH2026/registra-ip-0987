import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RegistrarObra from './pages/RegistrarObra';

function App() {
  return (
    <Router>
      <div style={{ fontFamily: 'Arial, sans-serif', minHeight: '100vh', background: '#f8f9fa' }}>
        {/* Barra de navegación superior opcional */}
        <nav style={{ background: '#4A066A', padding: '15px', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0, fontSize: '1.2rem' }}>Sistema de Registro IP</h2>
          <Link to="/registrar-obra" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>
            Registrar Obra (Práctica 3)
          </Link>
        </nav>

        {/* Contenedor de vistas */}
        <div style={{ padding: '20px' }}>
          <Routes>
            {/* Ruta para el Wizard de la Práctica 3 */}
            <Route path="/registrar-obra" element={<RegistrarObra />} />
            {/* Si quieres que sea la página principal, puedes usar path="/" */}
            <Route path="/" element={<RegistrarObra />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;