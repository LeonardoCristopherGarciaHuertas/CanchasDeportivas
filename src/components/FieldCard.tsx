import React from 'react';
import { Field } from '../interfaces/Field';

interface FieldCardProps {
    field: Field;
}

const FieldCard: React.FC<FieldCardProps> = ({ field }) => {
    const cardStyle: React.CSSProperties = {
        background: 'white',
        borderRadius: 'var(--border-radius-md)',
        boxShadow: 'var(--shadow-level-2)',
        padding: 'var(--spacing-md)',
        transition: 'var(--transition-normal)',
        border: '1px solid var(--color-border)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    };

    const headerStyle: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 'var(--spacing-sm)'
    };

    const titleStyle: React.CSSProperties = {
        fontFamily: 'var(--font-heading)',
        fontWeight: 600,
        fontSize: '1.25rem',
        color: 'var(--color-primary)',
        margin: 0
    };

    const statusBadgeStyle: React.CSSProperties = {
        padding: 'var(--spacing-xs)',
        borderRadius: 'var(--border-radius-sm)',
        fontSize: '0.75rem',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
    };

    const availableBadgeStyle: React.CSSProperties = {
        ...statusBadgeStyle,
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        color: 'var(--color-success)',
        border: '1px solid rgba(76, 175, 80, 0.3)'
    };

    const unavailableBadgeStyle: React.CSSProperties = {
        ...statusBadgeStyle,
        backgroundColor: 'rgba(244, 67, 54, 0.1)',
        color: 'var(--color-error)',
        border: '1px solid rgba(244, 67, 54, 0.3)'
    };

    const infoRowStyle: React.CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--spacing-xs)',
        marginBottom: 'var(--spacing-xs)',
        fontSize: '0.875rem',
        color: 'var(--color-text)'
    };

    const iconStyle: React.CSSProperties = {
        fontSize: '1rem',
        color: 'var(--color-secondary)',
        minWidth: '16px'
    };

    const actionsStyle: React.CSSProperties = {
        marginTop: 'auto',
        paddingTop: 'var(--spacing-sm)',
        display: 'flex',
        gap: 'var(--spacing-xs)'
    };

    const buttonStyle: React.CSSProperties = {
        padding: 'var(--spacing-xs) var(--spacing-sm)',
        border: 'none',
        borderRadius: 'var(--border-radius-sm)',
        fontFamily: 'var(--font-body)',
        fontWeight: 600,
        fontSize: '0.75rem',
        cursor: 'pointer',
        transition: 'var(--transition-fast)',
        textDecoration: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    };

    const primaryButtonStyle: React.CSSProperties = {
        ...buttonStyle,
        backgroundColor: 'var(--color-primary)',
        color: 'white'
    };

    const secondaryButtonStyle: React.CSSProperties = {
        ...buttonStyle,
        backgroundColor: 'transparent',
        color: 'var(--color-secondary)',
        border: '1px solid var(--color-secondary)'
    };

    return (
        <div 
            style={cardStyle}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-level-3)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-level-2)';
            }}
        >
            <div style={headerStyle}>
                <h3 style={titleStyle}>{field.name}</h3>
                <span style={field.availability ? availableBadgeStyle : unavailableBadgeStyle}>
                    {field.availability ? '✓ Disponible' : '✗ No disponible'}
                </span>
            </div>

            <div style={infoRowStyle}>
                <span style={iconStyle}>📍</span>
                <span>{field.location}</span>
            </div>

            <div style={infoRowStyle}>
                <span style={iconStyle}>🏟️</span>
                <span>Cancha deportiva</span>
            </div>

            <div style={infoRowStyle}>
                <span style={iconStyle}>⏰</span>
                <span>Horario disponible</span>
            </div>

            <div style={actionsStyle}>
                <button 
                    style={primaryButtonStyle}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#1B5E20';
                        e.currentTarget.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--color-primary)';
                        e.currentTarget.style.transform = 'translateY(0)';
                    }}
                    disabled={!field.availability}
                >
                    Reservar
                </button>
                <button 
                    style={secondaryButtonStyle}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--color-secondary)';
                        e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = 'var(--color-secondary)';
                    }}
                >
                    Ver detalles
                </button>
            </div>
        </div>
    );
};

export default FieldCard;