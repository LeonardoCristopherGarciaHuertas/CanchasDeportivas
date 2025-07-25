
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

  const navbarStyle: React.CSSProperties = {
    background: 'var(--color-primary)',
    color: 'white',
    padding: 'var(--spacing-sm) var(--spacing-md)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: 'var(--shadow-level-2)',
    position: 'sticky',
    top: 0,
    zIndex: 1000
  };

  const brandStyle: React.CSSProperties = {
    color: 'white',
    textDecoration: 'none',
    fontFamily: 'var(--font-heading)',
    fontWeight: 700,
    fontSize: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-xs)'
  };

  const navLinksStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-xs)'
  };

  const linkStyle: React.CSSProperties = {
    color: 'white',
    textDecoration: 'none',
    padding: 'var(--spacing-xs) var(--spacing-sm)',
    borderRadius: 'var(--border-radius-sm)',
    fontWeight: 500,
    fontSize: '0.875rem',
    transition: 'var(--transition-fast)',
    fontFamily: 'var(--font-body)'
  };

  const activeLinkStyle: React.CSSProperties = {
    ...linkStyle,
    background: 'rgba(255, 255, 255, 0.2)',
    fontWeight: 600
  };

  const logoutButtonStyle: React.CSSProperties = {
    background: 'transparent',
    border: '2px solid white',
    color: 'white',
    borderRadius: 'var(--border-radius-sm)',
    padding: 'var(--spacing-xs) var(--spacing-sm)',
    cursor: 'pointer',
    fontSize: '0.875rem',
    fontWeight: 600,
    fontFamily: 'var(--font-body)',
    marginLeft: 'var(--spacing-sm)',
    transition: 'var(--transition-fast)'
  };

  return (
    <nav style={navbarStyle}>
      <Link to="/" style={brandStyle}>
        <img 
          src="/soccer-ball.svg" 
          alt="Logo" 
          style={{ width: 32, height: 32 }} 
        />
        SGCD
      </Link>
      
      <div style={navLinksStyle}>
        {isAuthenticated ? (
          <>
            <Link 
              to="/fields" 
              style={location.pathname.startsWith('/fields') ? activeLinkStyle : linkStyle}
            >
              Canchas
            </Link>
            <Link 
              to="/reservations" 
              style={location.pathname.startsWith('/reservations') ? activeLinkStyle : linkStyle}
            >
              Reservas
            </Link>
            <Link 
              to="/venues" 
              style={location.pathname.startsWith('/venues') ? activeLinkStyle : linkStyle}
            >
              Sedes
            </Link>
            <button 
              onClick={handleLogout} 
              style={logoutButtonStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'white';
                e.currentTarget.style.color = 'var(--color-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = 'white';
              }}
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          <Link 
            to="/login" 
            style={location.pathname === '/login' ? activeLinkStyle : linkStyle}
          >
            Iniciar sesión
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;