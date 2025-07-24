import React from 'react';
import FieldCard from './FieldCard';
import { Field } from '../interfaces/Field';

interface Props {
  fields: Field[];
}


const FieldList: React.FC<Props> = ({ fields }) => {
  if (!fields || fields.length === 0) {
    return <div>No hay canchas para mostrar.</div>;
  }
  return (
    <div>
      {fields.map(field => (
        <FieldCard key={field.id} field={field} />
      ))}
    </div>
  );
};

export default FieldList;