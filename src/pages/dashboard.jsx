import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [usuario, setUsuario] = useState({ nombre: '', correo: '', tipoCreador: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const datosGuardados = localStorage.getItem('registraInUsuario');
    if (datosGuardados) {
      setUsuario(JSON.parse(datosGuardados));
    }
  }, []);

  const handleCerrarSesion = () => {
    localStorage.removeItem('registraInUsuario');
    navigate('/');
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem', background: '#fff', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
      <h2>Panel Principal (Dashboard)</h2>
      
      <div style={{ margin: '1.5rem 0', padding: '1rem', background: '#F9F5FC', borderRadius: '6px', borderLeft: '4px solid var(--primary)' }}>
        <p style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: '0 0 0.5rem 0' }}>
          ¡Bienvenido de nuevo, {usuario.nombre || 'Creador'}! 🎉
        </p>
        <p style={{ margin: '0.2rem 0' }}><strong>Correo:</strong> {usuario.correo}</p>
        <p style={{ margin: '0.2rem 0' }}><strong>Tipo de Creador:</strong> {usuario.tipoCreador}</p>
      </div>

      <button
        onClick={handleCerrarSesion}
        style={{
          backgroundColor: '#e53e3e',
          color: '#fff',
          padding: '0.6rem 1.2rem',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        Cerrar Sesión
      </button>
    </div>
  );
}