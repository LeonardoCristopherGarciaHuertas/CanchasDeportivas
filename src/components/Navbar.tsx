
import React from 'react';
import { Link, useLocation } from 'react-router-dom';


interface NavbarProps {
  isAuthenticated: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated }) => {
  const location = useLocation();
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };
  const linkStyle = {
    color: '#fff',
    textDecoration: 'none',
    marginRight: 12,
    padding: '4px 14px',
    borderRadius: 6,
    fontWeight: 500,
    fontSize: 18,
    transition: 'background 0.2s, color 0.2s'
  };
  const activeStyle = {
    background: '#fff',
    color: '#1976d2',
    fontWeight: 700
  };
  return (
    <nav style={{ background: '#1976d2', color: '#fff', padding: 16, display: 'flex', alignItems: 'center', gap: 24 }}>
      <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold', fontSize: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
        <img src="/soccer-ball.svg" alt="Logo" style={{ width: 32, height: 32, verticalAlign: 'middle' }} /> SGCD
      </Link>
      <div style={{ display: 'flex', gap: 8 }}>
        {isAuthenticated ? (
          <>
            <Link to="/fields" style={location.pathname.startsWith('/fields') ? { ...linkStyle, ...activeStyle } : linkStyle}>Canchas</Link>
            <Link to="/reservations" style={location.pathname.startsWith('/reservations') ? { ...linkStyle, ...activeStyle } : linkStyle}>Reservas</Link>
            <Link to="/venues" style={location.pathname.startsWith('/venues') ? { ...linkStyle, ...activeStyle } : linkStyle}>Sedes</Link>
            <button onClick={handleLogout} style={{ background: 'transparent', border: '1px solid #fff', color: '#fff', borderRadius: 6, padding: '4px 14px', cursor: 'pointer', fontSize: 16, marginLeft: 12 }}>
              Cerrar sesión
            </button>
          </>
        ) : (
          <Link to="/login" style={location.pathname === '/login' ? { ...linkStyle, ...activeStyle } : linkStyle}>Iniciar sesión</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;