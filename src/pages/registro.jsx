import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Registro() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [tipoCreador, setTipoCreador] = useState('Diseñador');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombre.trim() || !correo.trim()) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
      setError('Por favor, ingresa un formato de correo válido.');
      return;
    }

    setError('');

    const usuarioData = { nombre, correo, tipoCreador };
    localStorage.setItem('registraInUsuario', JSON.stringify(usuarioData));

    navigate('/dashboard');
  };

  return (
    <div style={{ maxWidth: '450px', margin: '0 auto', padding: '2rem', background: '#fff', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
      <h2>Registro de Creador</h2>

      <div aria-live="polite" style={{ minHeight: '1.5rem', marginBottom: '1rem' }}>
        {error && <p style={{ color: '#e53e3e', fontWeight: '500', margin: 0 }}>{error}</p>}
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 'bold' }}>Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            style={{ width: '100%', padding: '0.6rem', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
            placeholder="Ingresa tu nombre completo"
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 'bold' }}>Correo Electrónico:</label>
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            style={{ width: '100%', padding: '0.6rem', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
            placeholder="correo@ejemplo.com"
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 'bold' }}>Tipo de Creador:</label>
          <select
            value={tipoCreador}
            onChange={(e) => setTipoCreador(e.target.value)}
            style={{ width: '100%', padding: '0.6rem', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
          >
            <option value="Diseñador">Diseñador</option>
            <option value="Fotógrafo">Fotógrafo</option>
            <option value="Escritor">Escritor</option>
            <option value="Cineasta">Cineasta</option>
          </select>
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: 'var(--primary)',
            color: 'var(--text-contrast)',
            padding: '0.75rem',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold',
            marginTop: '1rem'
          }}
        >
          Registrarse
        </button>
      </form>
    </div>
  );
}