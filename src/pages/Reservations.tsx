
import React, { useState, useEffect } from 'react';
import { fetchReservations, createReservation, updateReservation, deleteReservation } from '../services/api';
import ReservationForm from '../components/ReservationForm';

const Reservations: React.FC = () => {
  const [reservations, setReservations] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const [token] = useState(localStorage.getItem('token') || '');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadReservations = async () => {
    setLoading(true);
    try {
      const data = await fetchReservations(token);
      setReservations(data.map((item: any) => ({ id: item.id, ...item })));
      setError('');
    } catch (e) {
      setError('No se pudieron cargar las reservas');
    }
    setLoading(false);
  };

  useEffect(() => { loadReservations(); }, []);

  const handleSave = async (data: any) => {
    if (editing) await updateReservation(editing.id, data, token);
    else await createReservation(data, token);
    setModalOpen(false);
    setEditing(null);
    loadReservations();
  };

  const handleDelete = async (id: number) => {
    await deleteReservation(id, token);
    loadReservations();
  };

  return (
    <div style={{
      maxWidth: 700,
      margin: '48px auto',
      background: '#fff',
      padding: 36,
      borderRadius: 18,
      boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
      minHeight: 400,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <h1 style={{ color: '#1976d2', fontWeight: 800, fontSize: 36, marginBottom: 24, letterSpacing: 1, textAlign: 'center' }}>Listado de Reservas</h1>
      <button
        onClick={() => { setEditing(null); setModalOpen(true); }}
        style={{
          background: '#1976d2', color: '#fff', border: 'none', borderRadius: 7, padding: '10px 28px', fontWeight: 700, fontSize: 18, cursor: 'pointer', letterSpacing: 1, marginBottom: 24, boxShadow: '0 2px 8px rgba(25,118,210,0.08)'
        }}
      >Agregar Reserva</button>
      {loading && <p>Cargando reservas...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && reservations.length === 0 && <p>No hay reservas registradas.</p>}
      {!loading && !error && reservations.length > 0 && (
        <div style={{ width: '100%', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fafbfc' }}>
            <thead>
              <tr style={{ background: '#e3f2fd' }}>
                <th style={{ padding: '12px 8px', fontSize: 17, color: '#1976d2', fontWeight: 700, borderBottom: '2px solid #bbdefb', textAlign: 'left' }}>Usuario</th>
                <th style={{ padding: '12px 8px', fontSize: 17, color: '#1976d2', fontWeight: 700, borderBottom: '2px solid #bbdefb', textAlign: 'left' }}>Fecha</th>
                <th style={{ padding: '12px 8px', fontSize: 17, color: '#1976d2', fontWeight: 700, borderBottom: '2px solid #bbdefb', textAlign: 'left' }}>Cancha</th>
                <th style={{ padding: '12px 8px', fontSize: 17, color: '#1976d2', fontWeight: 700, borderBottom: '2px solid #bbdefb', textAlign: 'left' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map(r => (
                <tr key={r.id} style={{ borderBottom: '1px solid #e3e3e3' }}>
                  <td style={{ padding: '10px 8px', fontSize: 16 }}>{r.usuario}</td>
                  <td style={{ padding: '10px 8px', fontSize: 16 }}>{r.fecha}</td>
                  <td style={{ padding: '10px 8px', fontSize: 16 }}>{r.cancha}</td>
                  <td style={{ padding: '10px 8px' }}>
                    <button
                      onClick={() => { setEditing(r); setModalOpen(true); }}
                      style={{ background: '#fff', color: '#1976d2', border: '1.5px solid #1976d2', borderRadius: 7, padding: '7px 18px', fontWeight: 700, fontSize: 15, cursor: 'pointer', marginRight: 8 }}
                    >Editar</button>
                    <button
                      onClick={() => handleDelete(r.documentId)}
                      style={{ background: '#fff', color: '#d32f2f', border: '1.5px solid #d32f2f', borderRadius: 7, padding: '7px 18px', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}
                    >Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <ReservationForm
        open={modalOpen}
        initialData={editing}
        onSave={handleSave}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default Reservations;
