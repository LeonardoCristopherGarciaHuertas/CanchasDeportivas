import React, { useEffect, useState } from 'react';
import { fetchFields, createField, updateField, deleteField } from '../services/api';
import FieldForm from '../components/FieldForm';

const Fields: React.FC = () => {
  const [fields, setFields] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const [token] = useState(localStorage.getItem('token') || '');
  const [loading, setLoading] = useState(true);

  const loadFields = async () => {
    setLoading(true);
    try {
      const data = await fetchFields(token);
      setFields(data.map((item: any) => ({ id: item.id, ...item })));
    } catch (error) {
      console.error('Error loading fields:', error);
    } finally {
      setLoading(false);
    }
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
    if (window.confirm('¿Estás seguro de que deseas eliminar esta cancha?')) {
      await deleteField(id, token);
      loadFields();
    }
  };

  const containerStyle: React.CSSProperties = {
    background: 'white',
    borderRadius: 'var(--border-radius-lg)',
    boxShadow: 'var(--shadow-level-3)',
    padding: 'var(--spacing-xl)',
    minHeight: '60vh'
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 'var(--spacing-lg)',
    flexWrap: 'wrap',
    gap: 'var(--spacing-sm)'
  };

  const titleStyle: React.CSSProperties = {
    color: 'var(--color-primary)',
    fontFamily: 'var(--font-heading)',
    fontWeight: 700,
    fontSize: '2.25rem',
    margin: 0
  };

  const addButtonStyle: React.CSSProperties = {
    background: 'var(--color-primary)',
    color: 'white',
    border: 'none',
    borderRadius: 'var(--border-radius-sm)',
    padding: 'var(--spacing-sm) var(--spacing-md)',
    fontWeight: 600,
    fontSize: '0.875rem',
    cursor: 'pointer',
    transition: 'var(--transition-fast)',
    fontFamily: 'var(--font-body)',
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-xs)'
  };

  const tableContainerStyle: React.CSSProperties = {
    overflowX: 'auto',
    borderRadius: 'var(--border-radius-md)',
    border: '1px solid var(--color-border)',
    boxShadow: 'var(--shadow-level-1)'
  };

  const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    background: 'white'
  };

  const headerCellStyle: React.CSSProperties = {
    padding: 'var(--spacing-sm)',
    fontSize: '0.875rem',
    color: 'var(--color-text)',
    fontWeight: 600,
    fontFamily: 'var(--font-heading)',
    borderBottom: '2px solid var(--color-border)',
    textAlign: 'left',
    background: 'var(--color-background)'
  };

  const cellStyle: React.CSSProperties = {
    padding: 'var(--spacing-sm)',
    fontSize: '0.875rem',
    borderBottom: '1px solid var(--color-border)',
    color: 'var(--color-text)'
  };

  const actionButtonStyle: React.CSSProperties = {
    border: 'none',
    borderRadius: 'var(--border-radius-sm)',
    padding: 'var(--spacing-xs) var(--spacing-sm)',
    fontWeight: 600,
    fontSize: '0.75rem',
    cursor: 'pointer',
    transition: 'var(--transition-fast)',
    fontFamily: 'var(--font-body)',
    marginRight: 'var(--spacing-xs)'
  };

  const editButtonStyle: React.CSSProperties = {
    ...actionButtonStyle,
    background: 'transparent',
    color: 'var(--color-secondary)',
    border: '1px solid var(--color-secondary)'
  };

  const deleteButtonStyle: React.CSSProperties = {
    ...actionButtonStyle,
    background: 'transparent',
    color: 'var(--color-error)',
    border: '1px solid var(--color-error)'
  };

  const loadingStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 'var(--spacing-xl)',
    color: 'var(--color-text)',
    fontSize: '1rem'
  };

  const emptyStateStyle: React.CSSProperties = {
    textAlign: 'center',
    padding: 'var(--spacing-xl)',
    color: 'var(--color-text)'
  };

  if (loading) {
    return (
      <div style={containerStyle}>
        <div style={loadingStyle}>
          <div className="spinner" style={{ marginRight: 'var(--spacing-sm)' }}></div>
          Cargando canchas...
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>⚽ Gestión de Canchas</h1>
        <button
          onClick={() => { setEditing(null); setModalOpen(true); }}
          style={addButtonStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#1B5E20';
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.boxShadow = 'var(--shadow-level-2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--color-primary)';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          ➕ Agregar Cancha
        </button>
      </div>

      {fields.length === 0 ? (
        <div style={emptyStateStyle}>
          <h3>No hay canchas registradas</h3>
          <p>Haz clic en "Agregar Cancha" para comenzar.</p>
        </div>
      ) : (
        <div style={tableContainerStyle}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={headerCellStyle}>Nombre</th>
                <th style={headerCellStyle}>Descripción</th>
                <th style={headerCellStyle}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {fields.map((f, index) => (
                <tr 
                  key={f.id}
                  style={{
                    backgroundColor: index % 2 === 0 ? 'white' : 'var(--color-background)'
                  }}
                >
                  <td style={cellStyle}>
                    <strong>{f.nombre || 'Sin nombre'}</strong>
                  </td>
                  <td style={cellStyle}>
                    {f.descripcion || 'Sin descripción'}
                  </td>
                  <td style={cellStyle}>
                    <button
                      onClick={() => { 
                        setEditing({ 
                          id: f.documentId, 
                          nombre: f.nombre || '', 
                          descripcion: f.descripcion || '' 
                        }); 
                        setModalOpen(true); 
                      }}
                      style={editButtonStyle}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--color-secondary)';
                        e.currentTarget.style.color = 'white';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = 'var(--color-secondary)';
                      }}
                    >
                      ✏️ Editar
                    </button>
                    <button
                      onClick={() => handleDelete(f.documentId)}
                      style={deleteButtonStyle}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--color-error)';
                        e.currentTarget.style.color = 'white';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = 'var(--color-error)';
                      }}
                    >
                      🗑️ Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

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
