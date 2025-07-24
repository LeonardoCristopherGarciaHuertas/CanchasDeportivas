
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

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} />
      <div style={{ padding: 32 }}>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/fields">
            {isAuthenticated ? <Fields /> : <h2 style={{color:'red'}}>Acceso denegado. Inicia sesión para continuar.</h2>}
          </Route>
          <Route path="/reservations">
            {isAuthenticated ? <Reservations /> : <h2 style={{color:'red'}}>Acceso denegado. Inicia sesión para continuar.</h2>}
          </Route>
          <Route path="/venues">
            {isAuthenticated ? <Sedes /> : <h2 style={{color:'red'}}>Acceso denegado. Inicia sesión para continuar.</h2>}
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