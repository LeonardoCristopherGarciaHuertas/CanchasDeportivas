import React from 'react';
import { Field } from '../interfaces/Field';

interface FieldCardProps {
    field: Field;
}

const FieldCard: React.FC<FieldCardProps> = ({ field }) => {
    return (
        <div className="field-card">
            <h2>{field.name}</h2>
            <p>Location: {field.location}</p>
            <p>Availability: {field.availability ? 'Available' : 'Not Available'}</p>
        </div>
    );
};

export default FieldCard;