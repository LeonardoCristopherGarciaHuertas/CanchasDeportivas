import React, { useState, useEffect } from 'react';

interface SedeFormProps {
  open: boolean;
  initialData?: any;
  onSave: (data: any) => void;
  onClose: () => void;
}

const SedeForm: React.FC<SedeFormProps> = ({ open, initialData, onSave, onClose }) => {
  const [nombre, setNombre] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setNombre(initialData?.nombre || '');
    setUbicacion(initialData?.ubicacion || initialData?.direccion || '');
    setError('');
  }, [initialData]);

  if (!open) return null;

  const handleSave = () => {
    if (!nombre.trim() || !ubicacion.trim()) {
      setError('Completa todos los campos');
      return;
    }
    setError('');
    onSave({ nombre, ubicacion });
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      background: 'rgba(0,0,0,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
    }}>
      <div style={{
        background: '#fff', padding: '2.5rem 2rem', borderRadius: 18, minWidth: 340, boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '90vw'
      }}>
        <h2 style={{ color: '#1976d2', fontWeight: 700, fontSize: 26, marginBottom: 24, letterSpacing: 1 }}>{initialData ? 'Editar Sede' : 'Agregar Sede'}</h2>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          style={{ marginBottom: 16, width: '100%', padding: 10, borderRadius: 7, border: '1px solid #b0bec5', fontSize: 17, background: '#f7fafd', outline: 'none', transition: 'border 0.2s' }}
        />
        <input
          type="text"
          placeholder="Ubicación"
          value={ubicacion}
          onChange={e => setUbicacion(e.target.value)}
          style={{ marginBottom: 10, width: '100%', padding: 10, borderRadius: 7, border: '1px solid #b0bec5', fontSize: 17, background: '#f7fafd', outline: 'none', transition: 'border 0.2s' }}
        />
        {error && <div style={{ color: 'red', marginBottom: 12, fontWeight: 500 }}>{error}</div>}
        <div style={{ display: 'flex', gap: 12, width: '100%', justifyContent: 'flex-end' }}>
          <button
            onClick={handleSave}
            style={{
              background: '#1976d2', color: '#fff', border: 'none', borderRadius: 7, padding: '10px 22px', fontWeight: 700, fontSize: 16, cursor: 'pointer', letterSpacing: 1, boxShadow: '0 2px 8px rgba(25,118,210,0.08)'
            }}
          >Guardar</button>
          <button
            onClick={onClose}
            style={{
              background: '#fff', color: '#1976d2', border: '1.5px solid #1976d2', borderRadius: 7, padding: '10px 22px', fontWeight: 700, fontSize: 16, cursor: 'pointer', letterSpacing: 1
            }}
          >Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default SedeForm;
