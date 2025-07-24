import React from 'react';


const Home: React.FC = () => {
    return (
        <div style={{
            minHeight: '70vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
            borderRadius: 16,
            boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
            marginTop: 32,
            padding: 32
        }}>
            <img src="/soccer-ball.svg" alt="Logo" style={{ width: 80, marginBottom: 24 }} />
            <h1 style={{ color: '#1976d2', fontSize: 36, marginBottom: 12, textAlign: 'center' }}>
                Bienvenido al Sistema de Gestión de Canchas
            </h1>
            <p style={{ color: '#333', fontSize: 20, textAlign: 'center', maxWidth: 500 }}>
                Reserva, administra y consulta la disponibilidad de canchas deportivas de manera fácil y rápida.
            </p>
        </div>
    );
};

export default Home;