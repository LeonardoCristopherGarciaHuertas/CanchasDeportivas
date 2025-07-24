import React, { useEffect, useState } from 'react';
import { fetchFields, createField, updateField, deleteField } from '../services/api';
import FieldForm from '../components/FieldForm';

const Fields: React.FC = () => {
  const [fields, setFields] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const [token] = useState(localStorage.getItem('token') || '');

  const loadFields = async () => {
    const data = await fetchFields(token);
    console.log('DATA RAW', data);
    setFields(data.map((item: any) => ({ id: item.id, attributes: item.attributes })));
  };

  useEffect(() => { loadFields(); }, []);

  const handleSave = async (data: any) => {
    if (editing && editing.id) {
      await updateField(editing.id, { ...data }, token);
    } else {
      await createField({ ...data }, token);
    }
    setModalOpen(false);
    setEditing(null);
    await loadFields();
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Eliminar cancha?')) {
      await deleteField(id, token);
      loadFields();
    }
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
      <h1 style={{ color: '#1976d2', fontWeight: 800, fontSize: 36, marginBottom: 24, letterSpacing: 1, textAlign: 'center' }}>Listado de Canchas</h1>
      <button
        onClick={() => { setEditing(null); setModalOpen(true); }}
        style={{
          background: '#1976d2', color: '#fff', border: 'none', borderRadius: 7, padding: '10px 28px', fontWeight: 700, fontSize: 18, cursor: 'pointer', letterSpacing: 1, marginBottom: 24, boxShadow: '0 2px 8px rgba(25,118,210,0.08)'
        }}
      >Agregar Cancha</button>
      <div style={{ width: '100%', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fafbfc' }}>
          <thead>
            <tr style={{ background: '#e3f2fd' }}>
            <th style={{ padding: '12px 8px', fontSize: 17, color: '#1976d2', fontWeight: 700, borderBottom: '2px solid #bbdefb', textAlign: 'left' }}>Nombre</th>
              <th style={{ padding: '12px 8px', fontSize: 17, color: '#1976d2', fontWeight: 700, borderBottom: '2px solid #bbdefb', textAlign: 'left' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {fields.map(f => (
              <tr key={f.id} style={{ borderBottom: '1px solid #e3e3e3' }}>
                <td style={{ padding: '10px 8px', fontSize: 16 }}>{f.attributes?.nombre || ''}</td>
                <td style={{ padding: '10px 8px' }}>
                  <button
                    onClick={() => { setEditing({ id: f.id, nombre: f.attributes?.nombre || '', descripcion: f.attributes?.descripcion || '' }); setModalOpen(true); }}
                    style={{ background: '#fff', color: '#1976d2', border: '1.5px solid #1976d2', borderRadius: 7, padding: '7px 18px', fontWeight: 700, fontSize: 15, cursor: 'pointer', marginRight: 8 }}
                  >Editar</button>
                  <button
                    onClick={() => handleDelete(f.id)}
                    style={{ background: '#fff', color: '#d32f2f', border: '1.5px solid #d32f2f', borderRadius: 7, padding: '7px 18px', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}
                  >Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <FieldForm
        open={modalOpen}
        initialData={editing}
        onSave={handleSave}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default Fields;
