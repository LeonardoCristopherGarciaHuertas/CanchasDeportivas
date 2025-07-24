
import axios from 'axios';
import { Field } from '../interfaces/Field';

const API_URL = 'http://localhost:1337/api/canchas';

// Obtener el detalle de una cancha por ID
export async function fetchFieldById(id: number, token: string) {
  try {
    const res = await axios.get(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return res.data.data; // Strapi v4: la cancha está en data
  } catch (error) {
    throw error;
  }
}

// CRUD para Canchas
export const fetchFields = async (token: string): Promise<any[]> => {
  const res = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data.data;
};
export const createField = async (field: any, token: string) => {
  const res = await axios.post(API_URL, { data: field }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data.data;
};
export const updateField = async (id: number, field: any, token: string) => {
  const res = await axios.put(`${API_URL}/${id}`, { data: field }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data.data;
};
export const deleteField = async (id: number, token: string) => {
  await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

// CRUD para Reservas
const RESERVAS_URL = 'http://localhost:1337/api/reservas';
export const fetchReservations = async (token: string): Promise<any[]> => {
  const res = await axios.get(RESERVAS_URL, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data.data;
};
export const createReservation = async (reservation: any, token: string) => {
  console.log("here, data send", reservation)
  const res = await axios.post(RESERVAS_URL, { data: reservation }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data.data;
};
export const updateReservation = async (id: number, reservation: any, token: string) => {
  const res = await axios.put(`${RESERVAS_URL}/${id}`, { data: reservation }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data.data;
};
export const deleteReservation = async (id: number, token: string) => {
  await axios.delete(`${RESERVAS_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

// CRUD para Sedes
const SEDES_URL = 'http://localhost:1337/api/sedes';
export const fetchSedes = async (token: string): Promise<any[]> => {
  const res = await axios.get(SEDES_URL, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data.data;
};
export const createSede = async (sede: any, token: string) => {
  const res = await axios.post(SEDES_URL, { data: sede }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data.data;
};
export const updateSede = async (id: number, sede: any, token: string) => {
  const res = await axios.put(`${SEDES_URL}/${id}`, { data: sede }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data.data;
};
export const deleteSede = async (id: number, token: string) => {
  console.log("Deleting Sede with ID:", id);
  await axios.delete(`${SEDES_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};