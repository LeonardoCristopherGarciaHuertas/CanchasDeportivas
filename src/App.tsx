
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Reservations from './pages/Reservations';
import Venues from './pages/Venues';
import Fields from './pages/Fields';
import Sedes from './pages/Sedes';


function getIsAuthenticated() {
  return Boolean(localStorage.getItem('token'));
}

const App: React.FC = () => {
  // Eliminado: estado y carga de canchas, ahora gestionado en Fields.tsx

  const [isAuthenticated, setIsAuthenticated] = useState(getIsAuthenticated());

  // Escuchar cambios de login/logout
  useEffect(() => {
    const onStorage = () => setIsAuthenticated(getIsAuthenticated());
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const mainContentStyle: React.CSSProperties = {
    padding: 'var(--spacing-lg)',
    minHeight: 'calc(100vh - 80px)' // Ajustar según altura del navbar
  };

  const accessDeniedStyle: React.CSSProperties = {
    color: 'var(--color-error)',
    textAlign: 'center',
    fontFamily: 'var(--font-heading)',
    fontWeight: 500,
    padding: 'var(--spacing-lg)',
    background: 'white',
    borderRadius: 'var(--border-radius-md)',
    boxShadow: 'var(--shadow-level-2)',
    margin: 'var(--spacing-lg) 0'
  };

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} />
      <div className="container" style={mainContentStyle}>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/fields">
            {isAuthenticated ? (
              <Fields />
            ) : (
              <div style={accessDeniedStyle}>
                <h2>🔒 Acceso denegado</h2>
                <p>Inicia sesión para continuar.</p>
              </div>
            )}
          </Route>
          <Route path="/reservations">
            {isAuthenticated ? (
              <Reservations />
            ) : (
              <div style={accessDeniedStyle}>
                <h2>🔒 Acceso denegado</h2>
                <p>Inicia sesión para continuar.</p>
              </div>
            )}
          </Route>
          <Route path="/venues">
            {isAuthenticated ? (
              <Sedes />
            ) : (
              <div style={accessDeniedStyle}>
                <h2>🔒 Acceso denegado</h2>
                <p>Inicia sesión para continuar.</p>
              </div>
            )}
          </Route>
          <Route path="/login">
            <Login onLogin={() => setIsAuthenticated(true)} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;