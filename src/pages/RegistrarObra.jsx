import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegistrarObra = () => {
  const navigate = useNavigate();
  const [paso, setPaso] = useState(1);

  // Estado global del wizard
  const [formData, setFormData] = useState({
    archivo: null,
    nombreArchivo: '',
    titulo: '',
    categoria: 'Pintura',
    descripcion: ''
  });

  const [error, setError] = useState('');
  const [resultadoExito, setResultadoExito] = useState(null);
  const [cargando, setCargando] = useState(false);

  // Manejar cambios en inputs de texto
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  // Manejar selección de archivo
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, archivo: file, nombreArchivo: file.name });
      setError('');
    }
  };

  // Validaciones por paso
  const validarPaso = () => {
    if (paso === 1) {
      if (!formData.archivo) {
        setError('Debes seleccionar un archivo para continuar.');
        return false;
      }
    }
    if (paso === 2) {
      if (!formData.titulo || formData.titulo.trim().length < 5) {
        setError('El título es obligatorio y debe tener al menos 5 caracteres.');
        return false;
      }
      if (!formData.categoria) {
        setError('Debes seleccionar una categoría.');
        return false;
      }
    }
    setError('');
    return true;
  };

  const handleSiguiente = () => {
    if (validarPaso()) {
      setPaso((prev) => Math.min(prev + 1, 4));
    }
  };

  const handleAtras = () => {
    setError('');
    setPaso((prev) => Math.max(prev - 1, 1));
  };

  // Envío final con fetch y FormData hacia el backend (Puerto 4000)
  const handleSubmitFinal = async () => {
    setCargando(true);
    setError('');

    const dataToSend = new FormData();
    dataToSend.append('archivo', formData.archivo);
    dataToSend.append('titulo', formData.titulo);
    dataToSend.append('categoria', formData.categoria);
    dataToSend.append('descripcion', formData.descripcion);

    try {
      const response = await fetch('http://localhost:4000/obras', {
        method: 'POST',
        body: dataToSend
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al registrar la obra');
      }

      setResultadoExito(data.obra);
      setPaso(4); // Pantalla de confirmación con el folio
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', background: '#fff', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
      <h2>Práctica 3: Wizard de Registro de Obra</h2>

      {/* Barra de progreso visual clara */}
      <div style={{ display: 'flex', justifyContent: 'space-between', margin: '20px 0', background: '#F2D9FC', padding: '10px', borderRadius: '6px' }}>
        <span style={{ fontWeight: paso === 1 ? 'bold' : 'normal' }}>1. Archivo</span>
        <span style={{ fontWeight: paso === 2 ? 'bold' : 'normal' }}>2. Metadatos</span>
        <span style={{ fontWeight: paso === 3 ? 'bold' : 'normal' }}>3. Vista Previa</span>
        <span style={{ fontWeight: paso === 4 ? 'bold' : 'normal' }}>4. Confirmación</span>
      </div>

      {error && <div style={{ background: '#ffebee', color: '#c62828', padding: '10px', marginBottom: '15px', borderRadius: '4px' }}>{error}</div>}

      {/* PASO 1: Subir Archivo */}
      {paso === 1 && (
        <div>
          <h3>Paso 1: Seleccionar Archivo de Obra</h3>
          <input type="file" onChange={handleFileChange} style={{ margin: '15px 0' }} />
          {formData.nombreArchivo && <p>Archivo seleccionado: <strong>{formData.nombreArchivo}</strong></p>}
        </div>
      )}

      {/* PASO 2: Metadatos */}
      {paso === 2 && (
        <div>
          <h3>Paso 2: Metadatos de la Obra</h3>
          <div style={{ marginBottom: '15px' }}>
            <label>Título (mínimo 5 caracteres):</label><br />
            <input 
              type="text" 
              name="titulo" 
              value={formData.titulo} 
              onChange={handleChange} 
              style={{ width: '100%', padding: '8px', marginTop: '5px' }} 
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label>Categoría:</label><br />
            <select name="categoria" value={formData.categoria} onChange={handleChange} style={{ width: '100%', padding: '8px', marginTop: '5px' }}>
              <option value="Pintura">Pintura</option>
              <option value="Escultura">Escultura</option>
              <option value="Fotografia">Fotografía</option>
              <option value="Digital">Arte Digital</option>
            </select>
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label>Descripción:</label><br />
            <textarea 
              name="descripcion" 
              value={formData.descripcion} 
              onChange={handleChange} 
              rows="3" 
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </div>
        </div>
      )}

      {/* PASO 3: Vista Previa */}
      {paso === 3 && (
        <div>
          <h3>Paso 3: Vista Previa de la Información</h3>
          <ul style={{ lineHeight: '1.8' }}>
            <li><strong>Archivo:</strong> {formData.nombreArchivo}</li>
            <li><strong>Título:</strong> {formData.titulo}</li>
            <li><strong>Categoría:</strong> {formData.categoria}</li>
            <li><strong>Descripción:</strong> {formData.descripcion || 'Sin descripción'}</li>
          </ul>
          <p>¿Estás seguro de registrar esta obra con estos datos?</p>
        </div>
      )}

      {/* PASO 4: Confirmación y Folio Generado */}
      {paso === 4 && resultadoExito && (
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ color: '#4A066A' }}>¡Registro Exitoso!</h3>
          <p>Tu obra ha sido guardada correctamente en el servidor.</p>
          <div style={{ background: '#F2D9FC', padding: '15px', borderRadius: '6px', margin: '20px 0', fontSize: '1.2rem', fontWeight: 'bold' }}>
            Folio Asignado: {resultadoExito.folio}
          </div>
          <button 
            onClick={() => { setPaso(1); setFormData({ archivo: null, nombreArchivo: '', titulo: '', categoria: 'Pintura', descripcion: '' }); setResultadoExito(null); }}
            style={{ padding: '10px 20px', background: '#4A066A', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Registrar otra obra
          </button>
        </div>
      )}

      {/* Botones de Navegación del Wizard */}
      {paso < 4 && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '25px' }}>
          {paso > 1 ? (
            <button onClick={handleAtras} style={{ padding: '8px 16px', background: '#ccc', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Atrás
            </button>
          ) : <div />}

          {paso < 3 ? (
            <button onClick={handleSiguiente} style={{ padding: '8px 16px', background: '#4A066A', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Siguiente
            </button>
          ) : (
            <button 
              onClick={handleSubmitFinal} 
              disabled={cargando}
              style={{ padding: '8px 16px', background: '#2e7d32', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              {cargando ? 'Guardando...' : 'Confirmar y Registrar'}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default RegistrarObra;