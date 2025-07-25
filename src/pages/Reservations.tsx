
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
    } finally {
      setLoading(false);
    }
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
    if (window.confirm('¿Estás seguro de que deseas eliminar esta reserva?')) {
      await deleteReservation(id, token);
      loadReservations();
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'No especificada';
    try {
      return new Date(dateString).toLocaleDateString('es-ES');
    } catch {
      return dateString;
    }
  };

  const formatTime = (timeString: string) => {
    if (!timeString) return 'No especificada';
    try {
      return new Date(timeString).toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return timeString;
    }
  };

  const getStatusBadge = (status: string) => {
    const baseStyle: React.CSSProperties = {
      padding: 'var(--spacing-xs)',
      borderRadius: 'var(--border-radius-sm)',
      fontSize: '0.75rem',
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    };

    switch (status?.toLowerCase()) {
      case 'confirmada':
      case 'confirmed':
        return {
          ...baseStyle,
          backgroundColor: 'rgba(76, 175, 80, 0.1)',
          color: 'var(--color-success)',
          border: '1px solid rgba(76, 175, 80, 0.3)'
        };
      case 'pendiente':
      case 'pending':
        return {
          ...baseStyle,
          backgroundColor: 'rgba(255, 152, 0, 0.1)',
          color: 'var(--color-warning)',
          border: '1px solid rgba(255, 152, 0, 0.3)'
        };
      case 'cancelada':
      case 'cancelled':
        return {
          ...baseStyle,
          backgroundColor: 'rgba(244, 67, 54, 0.1)',
          color: 'var(--color-error)',
          border: '1px solid rgba(244, 67, 54, 0.3)'
        };
      default:
        return {
          ...baseStyle,
          backgroundColor: 'rgba(158, 158, 158, 0.1)',
          color: 'var(--color-text)',
          border: '1px solid rgba(158, 158, 158, 0.3)'
        };
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

  const errorStyle: React.CSSProperties = {
    color: 'var(--color-error)',
    textAlign: 'center',
    padding: 'var(--spacing-lg)',
    background: 'rgba(244, 67, 54, 0.1)',
    borderRadius: 'var(--border-radius-sm)',
    border: '1px solid rgba(244, 67, 54, 0.3)',
    margin: 'var(--spacing-sm) 0'
  };

  if (loading) {
    return (
      <div style={containerStyle}>
        <div style={loadingStyle}>
          <div className="spinner" style={{ marginRight: 'var(--spacing-sm)' }}></div>
          Cargando reservas...
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>📅 Gestión de Reservas</h1>
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
          ➕ Nueva Reserva
        </button>
      </div>

      {error && (
        <div style={errorStyle}>
          ⚠️ {error}
        </div>
      )}

      {!error && reservations.length === 0 ? (
        <div style={emptyStateStyle}>
          <h3>No hay reservas registradas</h3>
          <p>Haz clic en "Nueva Reserva" para comenzar.</p>
        </div>
      ) : !error && (
        <div style={tableContainerStyle}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={headerCellStyle}>Fecha</th>
                <th style={headerCellStyle}>Horario</th>
                <th style={headerCellStyle}>Usuario</th>
                <th style={headerCellStyle}>Cancha</th>
                <th style={headerCellStyle}>Estado</th>
                <th style={headerCellStyle}>Costo</th>
                <th style={headerCellStyle}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((r, index) => (
                <tr 
                  key={r.id}
                  style={{
                    backgroundColor: index % 2 === 0 ? 'white' : 'var(--color-background)'
                  }}
                >
                  <td style={cellStyle}>
                    <strong>{formatDate(r.fecha)}</strong>
                  </td>
                  <td style={cellStyle}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                      {formatTime(r.hora_inicio)} - {formatTime(r.hora_fin)}
                    </span>
                  </td>
                  <td style={cellStyle}>
                    {r.usuario || 'No especificado'}
                  </td>
                  <td style={cellStyle}>
                    {r.cancha || 'No especificada'}
                  </td>
                  <td style={cellStyle}>
                    <span style={getStatusBadge(r.estado_reserva)}>
                      {r.estado_reserva || 'Sin estado'}
                    </span>
                  </td>
                  <td style={cellStyle}>
                    <strong style={{ color: 'var(--color-primary)' }}>
                      ${r.costo_total || '0'}
                    </strong>
                  </td>
                  <td style={cellStyle}>
                    <button
                      onClick={() => { setEditing(r); setModalOpen(true); }}
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
                      onClick={() => handleDelete(r.documentId)}
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
