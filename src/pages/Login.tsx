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

  return (
    <div style={{
      maxWidth: 400,
      margin: '40px auto',
      background: '#fff',
      padding: 32,
      borderRadius: 16,
      boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: '60vh',
      justifyContent: 'center'
    }}>
      <img src="/soccer-ball.svg" alt="Logo" style={{ width: 60, marginBottom: 18 }} />
      <h1 style={{ color: '#1976d2', fontSize: 32, marginBottom: 18, fontWeight: 700, letterSpacing: 1 }}>Iniciar sesión</h1>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <div style={{ marginBottom: 18 }}>
          <label style={{ display: 'block', marginBottom: 6, color: '#333', fontWeight: 500 }}>Usuario</label>
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #bbb', fontSize: 16, background: '#f7fafd' }} />
        </div>
        <div style={{ marginBottom: 18 }}>
          <label style={{ display: 'block', marginBottom: 6, color: '#333', fontWeight: 500 }}>Contraseña</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #bbb', fontSize: 16, background: '#f7fafd' }} />
        </div>
        {error && <div style={{ color: 'red', marginBottom: 12, textAlign: 'center', fontWeight: 500 }}>{error}</div>}
        <button type="submit" style={{ width: '100%', padding: 12, background: '#1976d2', color: '#fff', border: 'none', borderRadius: 6, fontSize: 18, fontWeight: 700, cursor: 'pointer', letterSpacing: 1 }} disabled={loading}>
          {loading ? 'Ingresando...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
};

export default Login;
