import React, { useEffect, useState } from 'react';
import { fetchSedes, createSede, updateSede, deleteSede } from '../services/api';
import SedeForm from '../components/SedeForm';

const Sedes: React.FC = () => {
  const [sedes, setSedes] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const [token] = useState(localStorage.getItem('token') || '');

  const loadSedes = async () => {
    const data = await fetchSedes(token);
    setSedes(data.map((item: any) => ({...item })));
  };

  useEffect(() => { loadSedes(); }, []);

  const handleSave = async (data: any) => {
    if (editing) await updateSede(editing.documentId, data, token);
    else await createSede(data, token);
    setModalOpen(false);
    setEditing(null);
    loadSedes();
  };

  const handleDelete = async (id: number) => {
    await deleteSede(id, token);
    loadSedes();
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
      <h1 style={{ color: '#1976d2', fontWeight: 800, fontSize: 36, marginBottom: 24, letterSpacing: 1, textAlign: 'center' }}>Listado de Sedes</h1>
      <button
        onClick={() => { setEditing(null); setModalOpen(true); }}
        style={{
          background: '#1976d2', color: '#fff', border: 'none', borderRadius: 7, padding: '10px 28px', fontWeight: 700, fontSize: 18, cursor: 'pointer', letterSpacing: 1, marginBottom: 24, boxShadow: '0 2px 8px rgba(25,118,210,0.08)'
        }}
      >Agregar Sede</button>
      <div style={{ width: '100%', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fafbfc' }}>
          <thead>
            <tr style={{ background: '#e3f2fd' }}>
              <th style={{ padding: '12px 8px', fontSize: 17, color: '#1976d2', fontWeight: 700, borderBottom: '2px solid #bbdefb', textAlign: 'left' }}>Nombre</th>
              <th style={{ padding: '12px 8px', fontSize: 17, color: '#1976d2', fontWeight: 700, borderBottom: '2px solid #bbdefb', textAlign: 'left' }}>Dirección</th>
              <th style={{ padding: '12px 8px', fontSize: 17, color: '#1976d2', fontWeight: 700, borderBottom: '2px solid #bbdefb', textAlign: 'left' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {sedes.map(s => (
              <tr key={s.id} style={{ borderBottom: '1px solid #e3e3e3' }}>
                <td style={{ padding: '10px 8px', fontSize: 16 }}>{s.nombre}</td>
                <td style={{ padding: '10px 8px', fontSize: 16 }}>{s.ubicacion}</td>
                <td style={{ padding: '10px 8px' }}>
                  <button
                    onClick={() => { setEditing(s); setModalOpen(true); }}
                    style={{ background: '#fff', color: '#1976d2', border: '1.5px solid #1976d2', borderRadius: 7, padding: '7px 18px', fontWeight: 700, fontSize: 15, cursor: 'pointer', marginRight: 8 }}
                  >Editar</button>
                  <button
                    onClick={() => handleDelete(s.documentId)}
                    style={{ background: '#fff', color: '#d32f2f', border: '1.5px solid #d32f2f', borderRadius: 7, padding: '7px 18px', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}
                  >Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <SedeForm
        open={modalOpen}
        initialData={editing}
        onSave={handleSave}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default Sedes;
