// Diagnóstico para Fields.tsx
// Este archivo ayuda a depurar el contenido real de los datos recibidos desde el backend
import React, { useEffect, useState } from 'react';
import { fetchFields } from '../services/api';

const DebugFields: React.FC = () => {
  const [fields, setFields] = useState<any[]>([]);
  const [token] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    fetchFields(token).then(data => {
      setFields(data);
      // eslint-disable-next-line no-console
      console.log('DATA RAW', data);
    });
  }, [token]);

  return (
    <div style={{ padding: 32 }}>
      <h2>Debug: Datos crudos de canchas</h2>
      <pre style={{ background: '#eee', padding: 16, borderRadius: 8, fontSize: 14 }}>
        {JSON.stringify(fields, null, 2)}
      </pre>
    </div>
  );
};

export default DebugFields;
