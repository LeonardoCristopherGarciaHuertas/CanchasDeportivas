import React, { useState } from 'react';
import axios from 'axios';

interface LoginProps {
  onLogin?: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username === '' || password === '') {
      setError('Completa todos los campos');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('http://localhost:1337/api/auth/local', {
        identifier: username,
        password: password
      });
      // Guardar el JWT/token en localStorage o context
      localStorage.setItem('token', res.data.jwt);
      if (onLogin) onLogin();
      window.location.href = '/fields';
    } catch (err: any) {
      // Siempre mostrar el mensaje personalizado
      setError('Usuario o contraseña inválido');
    } finally {
      setLoading(false);
    }
  };

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '70vh',
    padding: 'var(--spacing-sm)'
  };

  const cardStyle: React.CSSProperties = {
    maxWidth: '400px',
    width: '100%',
    background: 'white',
    padding: 'var(--spacing-xl)',
    borderRadius: 'var(--border-radius-lg)',
    boxShadow: 'var(--shadow-level-4)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  };

  const logoStyle: React.CSSProperties = {
    width: 80,
    height: 80,
    marginBottom: 'var(--spacing-md)',
    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
  };

  const titleStyle: React.CSSProperties = {
    color: 'var(--color-primary)',
    fontSize: '2rem',
    marginBottom: 'var(--spacing-md)',
    fontFamily: 'var(--font-heading)',
    fontWeight: 700,
    textAlign: 'center'
  };

  const formStyle: React.CSSProperties = {
    width: '100%'
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

  const inputFocusStyle: React.CSSProperties = {
    borderColor: 'var(--color-primary)',
    boxShadow: '0 0 0 3px rgba(46, 125, 50, 0.1)'
  };

  const errorStyle: React.CSSProperties = {
    color: 'var(--color-error)',
    marginBottom: 'var(--spacing-sm)',
    textAlign: 'center',
    fontWeight: 500,
    fontSize: '0.875rem',
    padding: 'var(--spacing-xs)',
    background: 'rgba(244, 67, 54, 0.1)',
    borderRadius: 'var(--border-radius-sm)',
    border: '1px solid rgba(244, 67, 54, 0.3)'
  };

  const buttonStyle: React.CSSProperties = {
    width: '100%',
    padding: 'var(--spacing-sm)',
    background: 'var(--color-primary)',
    color: 'white',
    border: 'none',
    borderRadius: 'var(--border-radius-sm)',
    fontSize: '1rem',
    fontWeight: 600,
    fontFamily: 'var(--font-body)',
    cursor: 'pointer',
    transition: 'var(--transition-fast)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--spacing-xs)'
  };

  const buttonHoverStyle: React.CSSProperties = {
    backgroundColor: '#1B5E20',
    transform: 'translateY(-1px)',
    boxShadow: 'var(--shadow-level-2)'
  };

  const buttonDisabledStyle: React.CSSProperties = {
    opacity: 0.6,
    cursor: 'not-allowed',
    transform: 'none'
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <img 
          src="/soccer-ball.svg" 
          alt="Logo SGCD" 
          style={logoStyle} 
        />
        <h1 style={titleStyle}>Iniciar sesión</h1>
        
        <form onSubmit={handleSubmit} style={formStyle}>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Usuario</label>
            <input 
              type="text" 
              value={username} 
              onChange={e => setUsername(e.target.value)} 
              style={inputStyle}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--color-primary)';
                e.target.style.boxShadow = '0 0 0 3px rgba(46, 125, 50, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--color-border)';
                e.target.style.boxShadow = 'none';
              }}
              placeholder="Ingresa tu usuario"
            />
          </div>
          
          <div style={formGroupStyle}>
            <label style={labelStyle}>Contraseña</label>
            <input 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              style={inputStyle}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--color-primary)';
                e.target.style.boxShadow = '0 0 0 3px rgba(46, 125, 50, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--color-border)';
                e.target.style.boxShadow = 'none';
              }}
              placeholder="Ingresa tu contraseña"
            />
          </div>
          
          {error && (
            <div style={errorStyle}>
              ⚠️ {error}
            </div>
          )}
          
          <button 
            type="submit" 
            style={{
              ...buttonStyle,
              ...(loading ? buttonDisabledStyle : {})
            }}
            disabled={loading}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.backgroundColor = '#1B5E20';
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-level-2)';
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.currentTarget.style.backgroundColor = 'var(--color-primary)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }
            }}
          >
            {loading && <div className="spinner" style={{ width: 16, height: 16 }}></div>}
            {loading ? 'Ingresando...' : 'Iniciar sesión'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
