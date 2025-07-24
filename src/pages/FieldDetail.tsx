import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchFieldById } from '../services/api';
import { Field } from '../interfaces/Field';

const FieldDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [field, setField] = useState<Field | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getFieldDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError('No autenticado');
                    setLoading(false);
                    return;
                }
                const data = await fetchFieldById(Number(id), token);
                setField(data);
            } catch (err) {
                setError('Error fetching field details');
            } finally {
                setLoading(false);
            }
        };

        getFieldDetails();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!field) {
        return <div>Field not found</div>;
    }

    return (
        <div>
            <h1>{field.name}</h1>
            <p>Location: {field.location}</p>
            <p>Availability: {field.availability ? 'Available' : 'Not Available'}</p>
            <p>Description: {field.description}</p>
            {field.images && field.images.length > 0 && (
                <div>
                    <h2>Images</h2>
                    {field.images.map((image, index) => (
                        <img key={index} src={image} alt={`Field ${field.name} image ${index + 1}`} />
                    ))}
                </div>
            )}
            <button>Book Now</button>
        </div>
    );
};

export default FieldDetail;