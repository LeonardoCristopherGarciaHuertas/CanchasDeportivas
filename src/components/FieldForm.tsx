import React, { useState, useEffect } from 'react';

interface FieldFormProps {
  open: boolean;
  initialData?: any;
  onSave: (data: any) => void;
  onClose: () => void;
}

const FieldForm: React.FC<FieldFormProps> = ({ open, initialData, onSave, onClose }) => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setNombre(initialData?.nombre || initialData?.name || '');
    setDescripcion(initialData?.descripcion || initialData?.description || '');
    setError('');
  }, [initialData]);

  if (!open) return null;

  const handleSave = () => {
    if (!nombre.trim() || !descripcion.trim()) {
      setError('Completa todos los campos');
      return;
    }
    setError('');
    onSave({ nombre, descripcion });
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
    minWidth: '400px',
    maxWidth: '500px',
    width: '100%',
    boxShadow: 'var(--shadow-level-4)',
    animation: 'modalFadeIn 0.2s ease-out'
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

  const labelStyle: React.CSSProperties = {
    display: 'block',
    marginBottom: 'var(--spacing-xs)',
    color: 'var(--color-text)',
    fontWeight: 600,
    fontFamily: 'var(--font-body)',
    fontSize: '0.875rem'
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

  return (
    <div style={overlayStyle} onClick={handleBackdropClick}>
      <div style={modalStyle}>
        <div style={headerStyle}>
          <h2 style={titleStyle}>
            {initialData ? '✏️ Editar Cancha' : '➕ Agregar Cancha'}
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

        <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Nombre de la cancha</label>
            <input
              type="text"
              placeholder="Ej: Cancha de Fútbol 1"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
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

          <div style={formGroupStyle}>
            <label style={labelStyle}>Descripción</label>
            <textarea
              placeholder="Describe las características de la cancha..."
              value={descripcion}
              onChange={e => setDescripcion(e.target.value)}
              style={textareaStyle}
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
              {initialData ? 'Actualizar' : 'Guardar'}
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

export default FieldForm;
