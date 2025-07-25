import React from 'react';


const Home: React.FC = () => {
    const heroSectionStyle: React.CSSProperties = {
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, rgba(46, 125, 50, 0.1) 0%, rgba(25, 118, 210, 0.1) 100%)',
        borderRadius: 'var(--border-radius-lg)',
        boxShadow: 'var(--shadow-level-3)',
        padding: 'var(--spacing-xl)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
    };

    const logoStyle: React.CSSProperties = {
        width: 120,
        height: 120,
        marginBottom: 'var(--spacing-md)',
        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
    };

    const titleStyle: React.CSSProperties = {
        color: 'var(--color-primary)',
        fontFamily: 'var(--font-heading)',
        fontSize: '3rem',
        fontWeight: 700,
        marginBottom: 'var(--spacing-sm)',
        textAlign: 'center',
        lineHeight: 1.2
    };

    const subtitleStyle: React.CSSProperties = {
        color: 'var(--color-text)',
        fontFamily: 'var(--font-body)',
        fontSize: '1.25rem',
        textAlign: 'center',
        maxWidth: '600px',
        lineHeight: 1.6,
        marginBottom: 'var(--spacing-lg)'
    };

    const featuresContainerStyle: React.CSSProperties = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 'var(--spacing-md)',
        marginTop: 'var(--spacing-xl)',
        width: '100%'
    };

    const featureCardStyle: React.CSSProperties = {
        background: 'white',
        padding: 'var(--spacing-md)',
        borderRadius: 'var(--border-radius-md)',
        boxShadow: 'var(--shadow-level-2)',
        textAlign: 'center',
        transition: 'var(--transition-normal)',
        border: '1px solid var(--color-border)'
    };

    const featureIconStyle: React.CSSProperties = {
        fontSize: '3rem',
        marginBottom: 'var(--spacing-sm)',
        display: 'block'
    };

    const featureTitleStyle: React.CSSProperties = {
        fontFamily: 'var(--font-heading)',
        fontWeight: 600,
        fontSize: '1.25rem',
        color: 'var(--color-primary)',
        marginBottom: 'var(--spacing-xs)'
    };

    const featureDescriptionStyle: React.CSSProperties = {
        color: 'var(--color-text)',
        fontSize: '0.875rem',
        lineHeight: 1.5
    };

    return (
        <div>
            <div style={heroSectionStyle}>
                <img 
                    src="/soccer-ball.svg" 
                    alt="Logo SGCD" 
                    style={logoStyle} 
                />
                <h1 style={titleStyle}>
                    Sistema de Gestión de Canchas Deportivas
                </h1>
                <p style={subtitleStyle}>
                    Reserva, administra y consulta la disponibilidad de canchas deportivas 
                    de manera fácil, rápida y eficiente. Tu plataforma integral para la 
                    gestión deportiva.
                </p>
                
                <div style={featuresContainerStyle}>
                    <div 
                        style={featureCardStyle}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-4px)';
                            e.currentTarget.style.boxShadow = 'var(--shadow-level-3)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'var(--shadow-level-2)';
                        }}
                    >
                        <span style={{...featureIconStyle, color: 'var(--color-primary)'}}>⚽</span>
                        <h3 style={featureTitleStyle}>Gestión de Canchas</h3>
                        <p style={featureDescriptionStyle}>
                            Administra todas tus canchas deportivas desde un solo lugar. 
                            Configura horarios, precios y disponibilidad.
                        </p>
                    </div>
                    
                    <div 
                        style={featureCardStyle}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-4px)';
                            e.currentTarget.style.boxShadow = 'var(--shadow-level-3)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'var(--shadow-level-2)';
                        }}
                    >
                        <span style={{...featureIconStyle, color: 'var(--color-secondary)'}}>📅</span>
                        <h3 style={featureTitleStyle}>Reservas Inteligentes</h3>
                        <p style={featureDescriptionStyle}>
                            Sistema de reservas en tiempo real con calendario interactivo 
                            y confirmación automática.
                        </p>
                    </div>
                    
                    <div 
                        style={featureCardStyle}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-4px)';
                            e.currentTarget.style.boxShadow = 'var(--shadow-level-3)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'var(--shadow-level-2)';
                        }}
                    >
                        <span style={{...featureIconStyle, color: 'var(--color-accent)'}}>🏢</span>
                        <h3 style={featureTitleStyle}>Multi-sedes</h3>
                        <p style={featureDescriptionStyle}>
                            Gestiona múltiples sedes deportivas con control centralizado 
                            y reportes unificados.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;