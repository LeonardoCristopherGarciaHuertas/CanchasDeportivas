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
    setHoraInicio(initialData?.hora_inicio || '');
    setHoraFin(initialData?.hora_fin || '');
    setCostoTotal(initialData?.costo_total || '');
    setEstadoReserva(initialData?.estado_reserva || 'pendiente');
    setObservaciones(initialData?.observaciones || '');
    setError('');
  }, [initialData]);

  if (!open) return null;

  const handleSave = () => {
    if (!fecha.trim() || !horaInicio.trim() || !horaFin.trim() || !costoTotal.trim() || !estadoReserva.trim()) {
      setError('Completa todos los campos obligatorios');
      return;
    }
    
    if (horaInicio >= horaFin) {
      setError('La hora de inicio debe ser anterior a la hora de fin');
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

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: 'var(--spacing-sm)'
  };

  const modalStyle: React.CSSProperties = {
    background: 'white',
    padding: 'var(--spacing-xl)',
    borderRadius: 'var(--border-radius-lg)',
    minWidth: '500px',
    maxWidth: '600px',
    width: '100%',
    boxShadow: 'var(--shadow-level-4)',
    animation: 'modalFadeIn 0.2s ease-out',
    maxHeight: '90vh',
    overflowY: 'auto'
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 'var(--spacing-md)'
  };

  const titleStyle: React.CSSProperties = {
    color: 'var(--color-primary)',
    fontFamily: 'var(--font-heading)',
    fontWeight: 700,
    fontSize: '1.5rem',
    margin: 0
  };

  const closeButtonStyle: React.CSSProperties = {
    background: 'transparent',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    color: 'var(--color-text)',
    padding: 'var(--spacing-xs)',
    borderRadius: 'var(--border-radius-sm)',
    transition: 'var(--transition-fast)'
  };

  const formGroupStyle: React.CSSProperties = {
    marginBottom: 'var(--spacing-sm)'
  };

  const formRowStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 'var(--spacing-sm)',
    marginBottom: 'var(--spacing-sm)'
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    marginBottom: 'var(--spacing-xs)',
    color: 'var(--color-text)',
    fontWeight: 600,
    fontFamily: 'var(--font-body)',
    fontSize: '0.875rem'
  };

  const requiredLabelStyle: React.CSSProperties = {
    ...labelStyle,
    color: 'var(--color-primary)'
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: 'var(--spacing-sm)',
    borderRadius: 'var(--border-radius-sm)',
    border: '2px solid var(--color-border)',
    fontSize: '0.875rem',
    fontFamily: 'var(--font-body)',
    transition: 'var(--transition-fast)',
    backgroundColor: 'white'
  };

  const selectStyle: React.CSSProperties = {
    ...inputStyle,
    cursor: 'pointer'
  };

  const textareaStyle: React.CSSProperties = {
    ...inputStyle,
    minHeight: '80px',
    resize: 'vertical'
  };

  const errorStyle: React.CSSProperties = {
    color: 'var(--color-error)',
    marginBottom: 'var(--spacing-sm)',
    fontSize: '0.875rem',
    fontWeight: 500,
    padding: 'var(--spacing-xs)',
    background: 'rgba(244, 67, 54, 0.1)',
    borderRadius: 'var(--border-radius-sm)',
    border: '1px solid rgba(244, 67, 54, 0.3)'
  };

  const actionsStyle: React.CSSProperties = {
    display: 'flex',
    gap: 'var(--spacing-sm)',
    justifyContent: 'flex-end',
    marginTop: 'var(--spacing-md)'
  };

  const buttonStyle: React.CSSProperties = {
    padding: 'var(--spacing-sm) var(--spacing-md)',
    border: 'none',
    borderRadius: 'var(--border-radius-sm)',
    fontFamily: 'var(--font-body)',
    fontWeight: 600,
    fontSize: '0.875rem',
    cursor: 'pointer',
    transition: 'var(--transition-fast)'
  };

  const primaryButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: 'var(--color-primary)',
    color: 'white'
  };

  const secondaryButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: 'transparent',
    color: 'var(--color-text)',
    border: '2px solid var(--color-border)'
  };

  const infoStyle: React.CSSProperties = {
    backgroundColor: 'rgba(25, 118, 210, 0.1)',
    color: 'var(--color-secondary)',
    padding: 'var(--spacing-xs)',
    borderRadius: 'var(--border-radius-sm)',
    fontSize: '0.75rem',
    marginBottom: 'var(--spacing-sm)',
    border: '1px solid rgba(25, 118, 210, 0.3)'
  };

  return (
    <div style={overlayStyle} onClick={handleBackdropClick}>
      <div style={modalStyle}>
        <div style={headerStyle}>
          <h2 style={titleStyle}>
            {initialData ? '📅 Editar Reserva' : '➕ Nueva Reserva'}
          </h2>
          <button 
            style={closeButtonStyle}
            onClick={onClose}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-border)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            ✕
          </button>
        </div>

        <div style={infoStyle}>
          💡 Los campos marcados con * son obligatorios
        </div>

        <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
          <div style={formGroupStyle}>
            <label style={requiredLabelStyle}>Fecha de la reserva *</label>
            <input
              type="date"
              value={fecha}
              onChange={e => setFecha(e.target.value)}
              style={inputStyle}
              min={new Date().toISOString().split('T')[0]}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--color-primary)';
                e.target.style.boxShadow = '0 0 0 3px rgba(46, 125, 50, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--color-border)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <div style={formRowStyle}>
            <div>
              <label style={requiredLabelStyle}>Hora de inicio *</label>
              <input
                type="time"
                value={horaInicio}
                onChange={e => setHoraInicio(e.target.value)}
                style={inputStyle}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--color-primary)';
                  e.target.style.boxShadow = '0 0 0 3px rgba(46, 125, 50, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'var(--color-border)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
            <div>
              <label style={requiredLabelStyle}>Hora de fin *</label>
              <input
                type="time"
                value={horaFin}
                onChange={e => setHoraFin(e.target.value)}
                style={inputStyle}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--color-primary)';
                  e.target.style.boxShadow = '0 0 0 3px rgba(46, 125, 50, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'var(--color-border)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
          </div>

          <div style={formRowStyle}>
            <div>
              <label style={requiredLabelStyle}>Costo total ($) *</label>
              <input
                type="number"
                value={costoTotal}
                onChange={e => setCostoTotal(e.target.value)}
                style={inputStyle}
                min="0"
                step="1"
                placeholder="0"
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--color-primary)';
                  e.target.style.boxShadow = '0 0 0 3px rgba(46, 125, 50, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'var(--color-border)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
            <div>
              <label style={requiredLabelStyle}>Estado de la reserva *</label>
              <select
                value={estadoReserva}
                onChange={e => setEstadoReserva(e.target.value)}
                style={selectStyle}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--color-primary)';
                  e.target.style.boxShadow = '0 0 0 3px rgba(46, 125, 50, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'var(--color-border)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <option value="">Seleccionar estado</option>
                <option value="pendiente">Pendiente</option>
                <option value="confirmada">Confirmada</option>
                <option value="cancelada">Cancelada</option>
              </select>
            </div>
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Observaciones</label>
            <textarea
              value={observaciones}
              onChange={e => setObservaciones(e.target.value)}
              style={textareaStyle}
              placeholder="Agregar notas adicionales sobre la reserva..."
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--color-primary)';
                e.target.style.boxShadow = '0 0 0 3px rgba(46, 125, 50, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--color-border)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          {error && (
            <div style={errorStyle}>
              ⚠️ {error}
            </div>
          )}

          <div style={actionsStyle}>
            <button
              type="button"
              onClick={onClose}
              style={secondaryButtonStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-border)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              style={primaryButtonStyle}
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
              {initialData ? 'Actualizar reserva' : 'Crear reserva'}
            </button>
          </div>
        </form>
      </div>
      
      <style>{`
        @keyframes modalFadeIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ReservationForm;
