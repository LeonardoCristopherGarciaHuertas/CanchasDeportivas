import React, { useState, useEffect } from 'react';

interface ReservationFormProps {
  open: boolean;
  initialData?: any;
  onSave: (data: any) => void;
  onClose: () => void;
}

const ReservationForm: React.FC<ReservationFormProps> = ({ open, initialData, onSave, onClose }) => {
  const [fecha, setFecha] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFin, setHoraFin] = useState('');
  const [costoTotal, setCostoTotal] = useState('');
  const [estadoReserva, setEstadoReserva] = useState('');
  const [observaciones, setObservaciones] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setFecha(initialData?.fecha ? new Date(initialData.fecha).toISOString().split('T')[0] : '');
    setHoraInicio(initialData?.hora_inicio);
    setHoraFin(initialData?.hora_fin || '');
    setCostoTotal(initialData?.costo_total || '');
    setEstadoReserva(initialData?.estado_reserva || '');
    setObservaciones(initialData?.observaciones || '');
    setError('');
  }, [initialData]);

  if (!open) return null;

  const handleSave = () => {
    if (!fecha.trim() || !horaInicio.trim() || !horaFin.trim() || !costoTotal.trim() || !estadoReserva.trim()) {
      setError('Completa todos los campos obligatorios');
      return;
    }
    setError('');
    onSave({
      fecha,
      hora_inicio: new Date(`${fecha}T${horaInicio}`).toISOString(),
      hora_fin: new Date(`${fecha}T${horaFin}`).toISOString(),
      costo_total: parseInt(costoTotal, 10),
      estado_reserva: estadoReserva,
      observaciones
    });
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
        <h2 style={{ color: '#1976d2', fontWeight: 700, fontSize: 26, marginBottom: 24, letterSpacing: 1 }}>{initialData ? 'Editar Reserva' : 'Agregar Reserva'}</h2>
        <label style={{ width: '100%', fontWeight: 600, marginBottom: 4 }}>Fecha*</label>
        <input
          type="date"
          value={fecha}
          onChange={e => setFecha(e.target.value)}
          style={{ marginBottom: 16, width: '100%', padding: 10, borderRadius: 7, border: '1px solid #b0bec5', fontSize: 16, background: '#f7fafd', outline: 'none' }}
        />
        <label style={{ width: '100%', fontWeight: 600, marginBottom: 4 }}>Hora inicio*</label>
        <input
          type="time"
          value={horaInicio}
          onChange={e => setHoraInicio(e.target.value)}
          style={{ marginBottom: 16, width: '100%', padding: 10, borderRadius: 7, border: '1px solid #b0bec5', fontSize: 16, background: '#f7fafd', outline: 'none' }}
        />
        <label style={{ width: '100%', fontWeight: 600, marginBottom: 4 }}>Hora fin*</label>
        <input
          type="time"
          value={horaFin}
          onChange={e => setHoraFin(e.target.value)}
          style={{ marginBottom: 16, width: '100%', padding: 10, borderRadius: 7, border: '1px solid #b0bec5', fontSize: 16, background: '#f7fafd', outline: 'none' }}
        />
        <label style={{ width: '100%', fontWeight: 600, marginBottom: 4 }}>Costo total*</label>
        <input
          type="number"
          value={costoTotal}
          onChange={e => setCostoTotal(e.target.value)}
          style={{ marginBottom: 16, width: '100%', padding: 10, borderRadius: 7, border: '1px solid #b0bec5', fontSize: 16, background: '#f7fafd', outline: 'none' }}
        />
        <label style={{ width: '100%', fontWeight: 600, marginBottom: 4 }}>Estado reserva*</label>
        <input
          type="text"
          value={estadoReserva}
          onChange={e => setEstadoReserva(e.target.value)}
          style={{ marginBottom: 16, width: '100%', padding: 10, borderRadius: 7, border: '1px solid #b0bec5', fontSize: 16, background: '#f7fafd', outline: 'none' }}
        />
        <label style={{ width: '100%', fontWeight: 600, marginBottom: 4 }}>Observaciones</label>
        <textarea
          value={observaciones}
          onChange={e => setObservaciones(e.target.value)}
          style={{ marginBottom: 16, width: '100%', padding: 10, borderRadius: 7, border: '1px solid #b0bec5', fontSize: 16, background: '#f7fafd', outline: 'none', resize: 'vertical', minHeight: 60 }}
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

export default ReservationForm;
