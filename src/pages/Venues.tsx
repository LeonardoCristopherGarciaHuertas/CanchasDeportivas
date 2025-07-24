import React, { useEffect, useState } from 'react';
import { fetchVenues } from '../services/venuesApi';

const Venues: React.FC = () => {
  const [venues, setVenues] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchVenues()
      .then(data => setVenues(data))
      .catch(() => setError('No se pudieron cargar las sedes'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{
      maxWidth: 800,
      margin: '40px auto',
      background: '#fff',
      padding: 32,
      borderRadius: 16,
      boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start'
    }}>
      <h1 style={{ color: '#1976d2', fontSize: 32, marginBottom: 18, fontWeight: 700, letterSpacing: 1 }}>Sedes</h1>
      {loading && <p>Cargando sedes...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && venues.length === 0 && <p>No hay sedes registradas.</p>}
      {!loading && !error && venues.length > 0 && (
        <ul style={{ padding: 0, listStyle: 'none' }}>
          {venues.map((v: any) => (
            <li key={v.id} style={{ marginBottom: 18, borderBottom: '1px solid #eee', paddingBottom: 12 }}>
              <strong>ID:</strong> {v.id} <br />
              <strong>Datos:</strong> {JSON.stringify(v.attributes)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Venues;
